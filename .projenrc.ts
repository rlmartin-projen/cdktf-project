import { ProjenProject } from '@rlmartin-projen/projen-project';
import { NpmAccess } from 'projen/lib/javascript';
import { sharedDeps } from './src/cdktf-project';

const majorVersion = 2;
const nodeVersion = '16';
const project = new ProjenProject({
  author: 'Ryan Martin',
  authorAddress: 'rlmartin@gmail.com',
  defaultReleaseBranch: 'main',
  deps: [
    '@cdktf/provider-archive@~6',
    '@cdktf/provider-aws@~14',
    ...sharedDeps,
  ],
  devDeps: ['@rlmartin-projen/projen-project@~0'],
  name: '@rlmartin-projen/cdktf-project',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:rlmartin-projen/cdktf-project.git',
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  minNodeVersion: `${nodeVersion}.0.0`,
  workflowNodeVersion: nodeVersion,
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