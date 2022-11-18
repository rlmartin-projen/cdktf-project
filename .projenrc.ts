import { ProjenProject } from '@rlmartin-projen/projen-project';
const project = new ProjenProject({
  author: 'Ryan Martin',
  authorAddress: 'ryan.martin@medly.com',
  defaultReleaseBranch: 'main',
  devDeps: ['@rlmartin-projen/projen-project'],
  name: 'cdktf-project',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:rlmartin-projen/cdktf-project.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();