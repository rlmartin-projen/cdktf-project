import * as path from 'path';
import { DataArchiveFile } from '@cdktf/provider-archive/lib/data-archive-file';
import { CloudwatchLogGroup } from '@cdktf/provider-aws/lib/cloudwatch-log-group';
import { DataAwsIamPolicyDocument, DataAwsIamPolicyDocumentStatement } from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { IamRolePolicy } from '@cdktf/provider-aws/lib/iam-role-policy';
import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import { SecretsmanagerSecret } from '@cdktf/provider-aws/lib/secretsmanager-secret';
import { TerraformAsset } from 'cdktf';
import { Construct } from 'constructs';
import { LambdaRuntime } from 'projen/lib/awscdk';
import { S3LambdaTrigger } from './s3LambdaTrigger';
import { TaggedConstruct, TaggedConstructConfig } from './taggedConstruct';

export interface EventTriggers {
  /**
   * List of S3 buckets that will trigger invoking the function
   */
  readonly s3Buckets?: string[];
}

export interface WorkspaceFunctionConfig extends TaggedConstructConfig {
  /**
   * Non-standard IAM policy statements to inject into the function's role.
   * Optional
   */
  readonly additionalPermissions?: DataAwsIamPolicyDocumentStatement[];
  /**
   * Environment variables to inject into the function.
   * Optional, defaults to {}
   */
  readonly envVars?: { [key: string]: string };
  /**
   * The name of the handler to use in the Lambda function.
   * Optional, defaults to index.handler
   */
  readonly handler?: string;
  /**
   * Whether or not the function will utilize a secret. Name matches the function name.
   * Optional, defaults to false
   */
  readonly hasSecret?: boolean;
  /**
   * Number of days to retain logs in CloudWatch Logs.
   * Optional, defaults to 7
   */
  readonly logRetentionDays?: number;
  /**
   * Used to namespace this function to avoid naming collisions
   */
  readonly namespace: string;
  /**
   * The runtime to use for the Lambda function.
   * Optional, defaults to NODEJS_16_X
   */
  readonly runtime?: LambdaRuntime;
  /**
   * Set of triggers for the function
   *
   * @default - {}
   */
  readonly triggers?: EventTriggers;
  /**
   * The absolute path to the workspace where the code is. Assumes a 'dist'
   * subdirectory that includes compiled code to zip.
   */
  readonly workspacePath: string;
}

/**
 * Required providers: aws, archive
 * TODO: if broken out into a separate library, add these as peer dependencies.
 */
export class WorkspaceFunction extends TaggedConstruct {
  private func: LambdaFunction;
  functionName: string;

  constructor(scope: Construct, id: string, config: WorkspaceFunctionConfig) {
    super(scope, id, config);
    const {
      additionalPermissions = [],
      envVars = {},
      handler = 'index.handler',
      hasSecret = false,
      logRetentionDays = 7,
      namespace,
      runtime = LambdaRuntime.NODEJS_16_X,
      tags,
      triggers = {},
      workspacePath,
    } = config;
    this.functionName = `${namespace}-${path.parse(workspacePath).name}`;

    new CloudwatchLogGroup(this, 'log-group', {
      name: `/aws/lambda/${this.functionName}`,
      retentionInDays: logRetentionDays,
      tags,
    });

    const functionPermissions: DataAwsIamPolicyDocumentStatement[] = [];
    if (hasSecret) {
      const secret = new SecretsmanagerSecret(this, 'secret', {
        name: this.functionName,
      });
      functionPermissions.push({
        effect: 'Allow',
        actions: ['secretsmanager:GetSecretValue'],
        resources: [secret.arn],
      });
    }
    if (triggers.s3Buckets && triggers.s3Buckets.length > 0) {
      functionPermissions.push({
        effect: 'Allow',
        actions: ['s3:GetObject'],
        resources: triggers.s3Buckets.map(bucketName => `arn:aws:s3:::${bucketName}/*`),
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
    const role = new IamRole(this, 'lambda-role', {
      name: `${this.functionName}-role`,
      assumeRolePolicy: assumeRolePolicy.json,
      managedPolicyArns: ['arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
      tags,
    });
    const additionalPolicyDocument = new DataAwsIamPolicyDocument(this, 'additional-policy-document', {
      statement: [
        ...additionalPermissions,
        ...functionPermissions,
      ],
    });
    new IamRolePolicy(this, 'additional-policy', {
      name: `${this.functionName}-policy`,
      policy: additionalPolicyDocument.json,
      role: role.name,
    });

    const assetDir = new TerraformAsset(this, 'code-directory', {
      path: `${workspacePath}/dist`,
    });
    const assetFile = new DataArchiveFile(this, 'zip-file', {
      sourceDir: assetDir.path,
      outputPath: `${assetDir.path}/../dist.zip`,
      type: 'zip',
    });

    this.func = new LambdaFunction(this, 'function', {
      functionName: this.functionName,
      runtime: runtime.functionRuntime,
      role: role.arn,
      handler,
      filename: `${assetDir.path}/../dist.zip`,
      environment: {
        variables: envVars,
      },
      dependsOn: [assetFile],
      timeout: 30,
      tags,
    });

    if (triggers.s3Buckets) {
      new S3LambdaTrigger(this, 's3-triggers', {
        functionArn: this.func.arn,
        functionName: this.functionName,
        matchers: triggers.s3Buckets.map(name => { return { s3Bucket: name };}),
        assumeEventBridgeOn: true,
      });
    }
  }

  get functionArn() {
    return this.func.arn;
  }
}
