import { CloudwatchEventRule } from '@cdktf/provider-aws/lib/cloudwatch-event-rule';
import { CloudwatchEventTarget } from '@cdktf/provider-aws/lib/cloudwatch-event-target';
import { LambdaPermission } from '@cdktf/provider-aws/lib/lambda-permission';
import { S3BucketNotification } from '@cdktf/provider-aws/lib/s3-bucket-notification';
import { Construct } from 'constructs';
import { TaggedConstruct, TaggedConstructConfig } from './taggedConstruct';

export interface S3ObjectMatcher {
  /**
   * The S3 bucket to watch for triggering
   */
  readonly s3Bucket: string;
  /**
   * Match this prefix for objects in the bucket. Optional
   */
  readonly objectPrefix?: string;
  /**
   * Match this suffix for objects in the bucket. Optional
   */
  readonly objectSuffix?: string;
}

export interface S3LambdaTriggerConfig extends TaggedConstructConfig {
  /**
   * The Lambda function ARN to invoke when objects are added to any of
   * the given S3 buckets.
   */
  readonly functionArn: string;
  /**
   * The Lambda function name to invoke when objects are added to any of
   * the given S3 buckets. Should match the ARN, but leaving it to the caller
   * to parse out the name from the ARN.
   */
  readonly functionName: string;
  /**
   * This list of S3 bucket/object matchers that will trigger the Lambda function
   */
  readonly matchers: S3ObjectMatcher[];
  /**
   * Used when naming internal resources.
   */
  readonly namePrefix: string;
  /**
   * Assume that the EventBridge flag is already turned on for all triggering buckets.
   * @default - false
   */
  readonly assumeEventBridgeOn?: boolean;
}

export class S3LambdaTrigger extends TaggedConstruct {
  constructor(scope: Construct, id: string, config: S3LambdaTriggerConfig) {
    super(scope, id, config);

    const { functionArn, functionName, matchers, namePrefix, tags } = config;

    if (!config.assumeEventBridgeOn) {
      [...new Set(matchers.map(matcher => matcher.s3Bucket))].forEach(s3Bucket =>
        new S3BucketNotification(this, `${s3Bucket}-eventbridge-notification`, {
          bucket: s3Bucket,
          eventbridge: true,
        }),
      );
    }

    matchers.forEach(matcher => {
      const { s3Bucket, objectPrefix, objectSuffix } = matcher;
      const prefix = `${s3Bucket}-${objectPrefix}-${objectSuffix}-${functionName}-`;
      const objectEventFilter = [];
      if (objectPrefix) objectEventFilter.push({ prefix: objectPrefix });
      if (objectSuffix) objectEventFilter.push({ suffix: objectSuffix });
      const eventPattern = {
        'source': ['aws.s3'],
        'detail-type': ['Object Created'],
        'detail': {
          bucket: {
            name: [matcher.s3Bucket],
          },
          object: objectEventFilter.length > 0 ? { key: objectEventFilter } : undefined,
        },
      };
      const eventRule = new CloudwatchEventRule(this, `${prefix}rule`, {
        namePrefix,
        eventPattern: JSON.stringify(eventPattern),
        tags,
      });
      const lambdaPermission = new LambdaPermission(this, `${prefix}invoke-permission`, {
        action: 'lambda:InvokeFunction',
        functionName,
        principal: 'events.amazonaws.com',
        sourceArn: eventRule.arn,
      });
      new CloudwatchEventTarget(this, `${prefix}target`, {
        rule: eventRule.name,
        arn: functionArn,
        dependsOn: [lambdaPermission],
      });
    });
  }
}
