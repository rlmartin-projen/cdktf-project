import * as path from 'path';
import { CloudwatchLogGroup } from '@cdktf/provider-aws/lib/cloudwatch-log-group';
import { DataAwsIamPolicyDocument, DataAwsIamPolicyDocumentStatement } from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';
import { DataAwsSecretsmanagerSecret } from '@cdktf/provider-aws/lib/data-aws-secretsmanager-secret';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { IamRolePolicy } from '@cdktf/provider-aws/lib/iam-role-policy';
import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import { SecretsmanagerSecret } from '@cdktf/provider-aws/lib/secretsmanager-secret';
import { SecretsmanagerSecretVersion } from '@cdktf/provider-aws/lib/secretsmanager-secret-version';
import { ITerraformDependable } from 'cdktf';
import { Construct } from 'constructs';
import { LambdaRuntime } from 'projen/lib/awscdk';
import { S3LambdaTrigger } from './s3LambdaTrigger';
import { TaggedConstruct, TaggedConstructConfig } from './taggedConstruct';
import { WorkspaceDist } from './workspaceDist';

const IAM_ROLE_MAX_LENGTH = 64;

export interface EventTriggers {
  /**
   * List of S3 buckets that will trigger invoking the function
   */
  readonly s3Buckets?: string[];
}

interface ExternalSecret {
  /**
   * Set this to use a secret that is managed by other infra.
   */
  readonly arn: string;
}

export interface WorkspaceFunctionConfig extends TaggedConstructConfig {
  /**
   * Non-standard IAM policy statements to inject into the function's role.
   * Optional
   */
  readonly additionalPermissions?: DataAwsIamPolicyDocumentStatement[];
  /**
   * Set this to the a dead-letter queue ARN that should be used when event
   * triggers result in failures in the function.
   *
   * @default - undefined
   */
  readonly dlqArn?: string;
  /**
   * Environment variables to inject into the function.
   * Optional, defaults to {}
   */
  readonly envVars?: { [key: string]: string };
  /**
   * Ephemeral storage (in MB) allocated for the function.
   * @default - Lambda default (512)
   */
  readonly ephemeralStorage?: number;
  /**
   * The name of the handler to use in the Lambda function.
   * Optional, defaults to index.handler
   */
  readonly handler?: string;
  /**
   * Number of days to retain logs in CloudWatch Logs.
   * Optional, defaults to 7
   */
  readonly logRetentionDays?: number;
  /**
   * Amount of memory (in MB) allocated for the Lambda function.
   * @default - Lambda default (128)
   */
  readonly memory?: number;
  /**
   * Used to namespace this function to avoid naming collisions
   */
  readonly namespace: string;
  /**
   * Used to set the networking configuration of the function.
   * @default - no vpc_config for the function
   */
  readonly networking?: {
    readonly securityGroupIds: string[];
    readonly subnetIds: string[];
  };
  /**
   * The function name will automatically be generated. If you need to
   * override that default name, use this property instead. Setting this
   * will result in ignoring nameSuffix.
   *
   * @default - undefined
   */
  readonly nameOverride?: string;
  /**
   * Append this suffix to the lambda function name.
   *
   * @default - undefined
   */
  readonly nameSuffix?: string;
  /**
   * The runtime to use for the Lambda function.
   * Optional, defaults to NODEJS_18_X
   */
  readonly runtime?: LambdaRuntime;
  /**
   * Set this to create a secret for the function.
   * @default - no secret is created.
   */
  readonly secret?: {
    /**
     * The value to set for the secret.
     */
    readonly value?: string;
    /**
     * Set to true if the secret value will change outside of this infra.
     */
    readonly ignoreChanges?: boolean;
  } | ExternalSecret;
  /**
   * The maximum number of seconds the function can run for.
   * @default 30
   */
  readonly timeout?: number;
  /**
   * Set of triggers for the function
   *
   * @default - {}
   */
  readonly triggers?: EventTriggers;
  /**
   * The absolute path to the zip file in the assets directory where the function
   * code can be found. Assume use of TerraformAsset to ensure that the file
   * is automatically placed in the correct location for CDKTF.
   *
   * Use this option when optimizing the overall stack file size for stacks
   * with many functions that all use the same workspacePath. NB: many (30+)
   * uses of the same workspace function may result in very large (5+ GB) stack
   * sizes, which will lead to GitHub Actions running out of memory and killing
   * the process. If this happens, pull the asset management outside of this
   * construct (using the accompanying WorkspaceAsset construct), and instead
   * pass in this value with the output of that construct.
   *
   * This option is mutually-exclusive from workspacePath below, with exactly one
   * of the two required.
   */
  readonly workspaceDist?: WorkspaceDist;
  /**
   * The absolute path to the workspace where the code is. Assumes a 'dist'
   * subdirectory that includes compiled code to zip.
   *
   * This option is mutually-exclusive from workspaceDist above, with exactly one
   * of the two required.
   */
  readonly workspacePath?: string;
}

export function isExternalSecret(obj: any): obj is ExternalSecret {
  return (obj as ExternalSecret).arn !== undefined;
}

/**
 * Required providers: aws, archive
 * TODO: if broken out into a separate library, add these as peer dependencies.
 */
export class WorkspaceFunction extends TaggedConstruct {
  private _additionalPermissionsCount = 0;
  private func: LambdaFunction;
  functionName: string;
  private _role: IamRole;
  private _secretArn: string | undefined = undefined;

  constructor(scope: Construct, id: string, config: WorkspaceFunctionConfig) {
    super(scope, id, config);
    const {
      additionalPermissions = [],
      dlqArn,
      ephemeralStorage,
      envVars = {},
      handler = 'index.handler',
      logRetentionDays = 7,
      memory,
      namespace,
      nameOverride,
      nameSuffix,
      networking,
      runtime = LambdaRuntime.NODEJS_18_X,
      secret: secretConfig,
      tags,
      timeout = 30,
      triggers = {},
      workspaceDist,
      workspacePath,
    } = config;
    if (workspaceDist && workspacePath) throw new Error('Please specify only one of [workspaceDist, workspacePath');
    if (!workspaceDist && !workspacePath) throw new Error('Please specify one of [workspaceDist, workspacePath');
    const pathFileName = workspacePath ? path.parse(workspacePath).name : workspaceDist!.name;
    this.functionName = nameOverride ?? `${namespace}-${pathFileName}${nameSuffix ? '-' + nameSuffix : ''}`;
    const additionalEnvVars: { [key: string]: string } = {};

    new CloudwatchLogGroup(this, 'log-group', {
      name: `/aws/lambda/${this.functionName}`,
      retentionInDays: logRetentionDays,
      tags,
    });

    const functionPermissions: DataAwsIamPolicyDocumentStatement[] = [];
    if (secretConfig) {
      if (isExternalSecret(secretConfig)) {
        this._secretArn = secretConfig.arn;
        const secretLookup = new DataAwsSecretsmanagerSecret(this, 'lookup-secret', {
          arn: secretConfig.arn,
        });
        additionalEnvVars.SECRET_NAME = secretLookup.name;
      } else {
        const secret = new SecretsmanagerSecret(this, 'secret', {
          name: this.functionName,
        });
        this._secretArn = secret.arn;
        if (secretConfig.value) {
          const lifecycle = secretConfig.ignoreChanges ? { ignoreChanges: ['secret_string'] } : undefined;
          new SecretsmanagerSecretVersion(this, 'secret-value', {
            secretId: secret.id,
            secretString: secretConfig.value,
            lifecycle,
          });
        }
      }
      functionPermissions.push({
        effect: 'Allow',
        actions: ['secretsmanager:GetSecretValue'],
        resources: [this._secretArn],
      });
    }
    if (triggers.s3Buckets && triggers.s3Buckets.length > 0) {
      functionPermissions.push({
        effect: 'Allow',
        actions: ['s3:GetObject'],
        resources: triggers.s3Buckets.map(bucketName => `arn:aws:s3:::${bucketName}/*`),
      });
    }
    if (dlqArn) {
      functionPermissions.push({
        effect: 'Allow',
        actions: ['sqs:SendMessage', 'sns:Publish'],
        resources: [dlqArn],
      });
    }

    const assumeRolePolicy = new DataAwsIamPolicyDocument(this, 'assume-role-policy', {
      statement: [
        {
          effect: 'Allow',
          principals: [
            {
              type: 'Service',
              identifiers: ['lambda.amazonaws.com'],
            },
          ],
          actions: ['sts:AssumeRole'],
        },
      ],
    });
    const managedPolicies = ['AWSLambdaBasicExecutionRole'];
    if (networking) managedPolicies.push('AWSLambdaVPCAccessExecutionRole');
    this._role = new IamRole(this, 'lambda-role', {
      name: this.functionName.length > IAM_ROLE_MAX_LENGTH ? undefined : this.functionName,
      namePrefix: this.functionName.length > IAM_ROLE_MAX_LENGTH ? namespace : undefined,
      assumeRolePolicy: assumeRolePolicy.json,
      managedPolicyArns: managedPolicies.map(name => `arn:aws:iam::aws:policy/service-role/${name}`),
      tags,
    });
    if (additionalPermissions.length > 0 || functionPermissions.length > 0) {
      const additionalPolicyDocument = new DataAwsIamPolicyDocument(this, 'additional-policy-document', {
        statement: [
          ...additionalPermissions,
          ...functionPermissions,
        ],
      });
      new IamRolePolicy(this, 'additional-policy', {
        name: `${this.functionName}-policy`,
        policy: additionalPolicyDocument.json,
        role: this._role.name,
      });
    }

    const localWorkspaceDist = workspaceDist ?? new WorkspaceDist(this, 'file-dist', { workspacePath: workspacePath! });
    this.func = new LambdaFunction(this, 'function', {
      functionName: this.functionName,
      runtime: runtime.functionRuntime,
      role: this._role.arn,
      handler,
      filename: localWorkspaceDist.filePath,
      environment: {
        variables: {
          ...envVars,
          ...additionalEnvVars,
        },
      },
      deadLetterConfig: dlqArn ? {
        targetArn: dlqArn,
      } : undefined,
      ephemeralStorage: {
        size: ephemeralStorage,
      },
      memorySize: memory,
      timeout,
      tags,
      vpcConfig: networking,
    });

    if (triggers.s3Buckets) {
      new S3LambdaTrigger(this, 's3-triggers', {
        functionArn: this.func.arn,
        functionName: this.functionName,
        matchers: triggers.s3Buckets.map(name => { return { s3Bucket: name };}),
        namePrefix: this.functionName,
        assumeEventBridgeOn: true,
      });
    }
  }

  addPermissions(permissions: DataAwsIamPolicyDocumentStatement[]) {
    this._additionalPermissionsCount++;
    const policyDocument = new DataAwsIamPolicyDocument(this, `additional-policy-document-${this._additionalPermissionsCount}`, {
      statement: permissions,
    });
    new IamRolePolicy(this, 'additional-policy', {
      name: `${this.functionName}-policy-${this._additionalPermissionsCount}`,
      policy: policyDocument.json,
      role: this._role.name,
    });
  }

  // To use if need to force dependency mapping
  get dependsOn(): ITerraformDependable[] {
    return [
      this.func,
    ];
  }

  get functionArn() {
    return this.func.arn;
  }

  get secretArn(): string | undefined {
    return this._secretArn;
  }
}
