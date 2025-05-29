import * as path from 'path';
import { DataArchiveFile } from '@cdktf/provider-archive/lib/data-archive-file';
import { S3Object } from '@cdktf/provider-aws/lib/s3-object';
import { TerraformAsset } from 'cdktf';
import { Construct } from 'constructs';
import { TaggedConstruct, TaggedConstructConfig } from './taggedConstruct';

export interface WorkspaceDistConfig extends TaggedConstructConfig {
  /**
   * The absolute path to the workspace where the code is. Assumes a 'dist'
   * subdirectory that includes compiled code to zip.
   */
  readonly workspacePath: string;
  /**
   * If provided, the dist file will get uploaded into this S3 bucket.
   * This is useful if you run into status code 413 RequestEntityTooLargeException errors
   * when creating the Lambda function.
   */
  readonly s3BucketName?: string;
}

export class WorkspaceDist extends TaggedConstruct {
  private assetFile: DataArchiveFile;
  private assetFileName: string;
  private assetS3File: S3Object | undefined;

  constructor(scope: Construct, id: string, config: WorkspaceDistConfig) {
    super(scope, id, config);
    const { workspacePath, s3BucketName } = config;
    this.assetFileName = path.parse(workspacePath).name;

    const assetDir = new TerraformAsset(this, 'code-directory', {
      path: `${workspacePath}/dist`,
    });
    this.assetFile = new DataArchiveFile(this, 'zip-file', {
      sourceDir: assetDir.path,
      outputPath: `${assetDir.path}/../dist.zip`,
      type: 'zip',
    });
    if (s3BucketName) {
      this.assetS3File = new S3Object(this, 's3-object', {
        bucket: s3BucketName,
        key: `${this.assetFile.outputMd5}.zip`,
        source: this.assetFile.outputPath,
      });
    }
  }

  get filePath(): string | undefined {
    // Mutually-exclusive with s3 configuration properties
    return this.assetS3File === undefined ? this.assetFile.outputPath : undefined;
  }

  get name(): string {
    return this.assetFileName;
  }

  get s3Bucket(): string | undefined {
    return this.assetS3File?.bucket;
  }

  get s3ObjectKey(): string | undefined {
    return this.assetS3File?.key;
  }
}
