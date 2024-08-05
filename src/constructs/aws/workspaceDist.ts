import * as path from 'path';
import { DataArchiveFile } from '@cdktf/provider-archive/lib/data-archive-file';
import { TerraformAsset } from 'cdktf';
import { Construct } from 'constructs';
import { TaggedConstruct, TaggedConstructConfig } from './taggedConstruct';

export interface WorkspaceDistConfig extends TaggedConstructConfig {
  /**
   * The absolute path to the workspace where the code is. Assumes a 'dist'
   * subdirectory that includes compiled code to zip.
   */
  readonly workspacePath: string;
}

export class WorkspaceDist extends TaggedConstruct {
  private assetFile: DataArchiveFile;
  private assetFileName: string;

  constructor(scope: Construct, id: string, config: WorkspaceDistConfig) {
    super(scope, id, config);
    const { workspacePath } = config;
    this.assetFileName = path.parse(workspacePath).name;

    const assetDir = new TerraformAsset(this, 'code-directory', {
      path: `${workspacePath}/dist`,
    });
    this.assetFile = new DataArchiveFile(this, 'zip-file', {
      sourceDir: assetDir.path,
      outputPath: `${assetDir.path}/../dist.zip`,
      type: 'zip',
    });
  }

  get filePath(): string {
    return this.assetFile.outputPath;
  }

  get name(): string {
    return this.assetFileName;
  }
}
