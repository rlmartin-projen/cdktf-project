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
   * If the zipped file is too large for a direct upload to Lambda, it will get uploaded
   * first to S3 into this bucket.
   */
  readonly s3BucketName: string;
}

const LAMBDA_MAX_UPLOAD_SIZE = 70167211;

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
    if (this.assetFile.outputSize > LAMBDA_MAX_UPLOAD_SIZE) {
      this.assetS3File = new S3Object(this, 's3-object', {
        bucket: s3BucketName,
        key: `${this.assetFile.outputMd5}.zip`,
        source: this.assetFile.outputPath,
      });
    }
  }

  get filePath(): string {
    return this.assetFile.outputPath;
  }

  get name(): string {
    return this.assetFileName;
  }

  get s3Bucket(): string | undefined {
    return this.assetS3File?.bucket;
  }

  get s3ObjectKey(): string | undefined {
    return this.assetS3File?.keyInput;
  }
}
