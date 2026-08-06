import { ProjenProject } from '@rlmartin-projen/projen-project';
import { GithubWorkflow } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';
import { NpmAccess } from 'projen/lib/javascript';
import { ReleaseTrigger } from 'projen/lib/release/release-trigger';
import { sharedDeps } from './src/cdktf-project';

const majorVersion = 8;
const project = new ProjenProject({
  author: 'Ryan Martin',
  authorAddress: 'rlmartin@gmail.com',
  defaultReleaseBranch: 'main',
  deps: [
    ...sharedDeps,
  ],
  bundledDeps: [
    '@cdktn/provider-archive@~12',
    '@cdktn/provider-aws@~23',
  ],
  devDeps: ['@rlmartin-projen/projen-project@~0'],
  name: '@rlmartin-projen/cdktf-project',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/rlmartin-projen/cdktf-project',
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  npmTrustedPublishing: true,
  majorVersion,
  releaseBranches: {
    dev: { prerelease: 'dev', npmDistTag: 'dev', majorVersion },
  },
  releaseTrigger: ReleaseTrigger.workflowDispatch(),
  depsUpgradeOptions: {
    workflowOptions: {
      branches: ['main'],
    },
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
const releaseAll = new GithubWorkflow(project.github!, 'release-all', {});
releaseAll.on({
  push: {
    branches: ['main', 'dev'],
  },
});
releaseAll.addJob('publish-prod', {
  if: "github.ref_name == 'main'",
  uses: './.github/workflows/release.yml',
  permissions: {
    idToken: JobPermission.WRITE,
    contents: JobPermission.READ,
  },
});
releaseAll.addJob('publish-beta', {
  if: "github.ref_name == 'dev'",
  uses: './.github/workflows/release-dev.yml',
  permissions: {
    idToken: JobPermission.WRITE,
    contents: JobPermission.WRITE,
  },
});
project.synth();