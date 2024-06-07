import { ProjenProject } from '@rlmartin-projen/projen-project';
import { NpmAccess } from 'projen/lib/javascript';
import { sharedDeps } from './src/cdktf-project';

const majorVersion = 4;
const project = new ProjenProject({
  author: 'Ryan Martin',
  authorAddress: 'rlmartin@gmail.com',
  defaultReleaseBranch: 'main',
  deps: [
    '@cdktf/provider-archive@~10',
    '@cdktf/provider-aws@~19',
    ...sharedDeps,
  ],
  devDeps: ['@rlmartin-projen/projen-project@~0'],
  name: '@rlmartin-projen/cdktf-project',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/rlmartin-projen/cdktf-project',
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  majorVersion,
  releaseBranches: {
    dev: { prerelease: 'dev', npmDistTag: 'dev', majorVersion },
  },
  depsUpgradeOptions: {
    workflowOptions: {
      branches: ['main'],
    },
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();