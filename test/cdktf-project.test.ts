import { CdktfProject } from '../src';

test('ProjenProject', () => {
  const project = new CdktfProject({
    name: 'foo-project',
    defaultReleaseBranch: 'main',
    deploymentEnvironments: {
      dev: {},
      prod: {
        requireApproval: true,
      },
    },
    repoAdmins: {
      '@foo-name': 1234,
    },
    terraformModules: [
      {
        name: 'foo',
        githubOrgName: 'bar',
        version: '1.0.0',
      },
    ],
    terraformProviders: ['aws@~3'],
  });
  const fileNames = project.files.map(_ => _.path);
  ['.projen/tasks.json'].forEach(fileName => {
    expect(fileNames).toContain(fileName);
  });
});
