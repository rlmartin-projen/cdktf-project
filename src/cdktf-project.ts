import { addFiles, loadSettings } from '@rlmartin-projen/projen-project';
import { cdk } from 'projen';

export interface CdktfProjectOptions extends cdk.JsiiProjectOptions {
}

export class CdktfProject extends cdk.JsiiProject {
  constructor(options: CdktfProjectOptions) {
    const { options: projectOpts, files } = loadSettings(options);
    super(projectOpts);
    addFiles(this, files);
    // Add non-templated resources here
  }
}
