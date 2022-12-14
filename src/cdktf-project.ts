import * as path from 'path';
import { addFiles, allCases, loadSettings, squashPackages } from '@rlmartin-projen/projen-project';
import { JsonFile, SampleFile, TextFile, typescript, YamlFile } from 'projen';
import { cleanArray, isGitHubTeam } from './helpers';

const deps = [
  'projen@~0',
  'cdktf@~0',
  'cdktf-cli@~0',
  'constructs@~10',
];
const NodeVersion = '14';

function mergeUnique<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set(arr1.concat(arr2))];
}

export interface DeploymentEnvironment {
  /**
   * Branch matchers from which code can be deployed for this environment. Empty implies "all".
   * Mutually-exclusive from onlyProtectedBranches.
   *
   * @default - []
   */
  readonly branchFilters?: string[];

  /**
   * Instead of filtering branches, use branches protected in the repo settings.
   * Mutually-exclusive from branchFilters
   *
   * @default - false
   */
  readonly onlyProtectedBranches?: boolean;

  /**
   * Whether the environment requires approval before applying; plans always run
   *
   * @default - false
   */
  readonly requireApproval?: boolean;
}

interface GitHubEnvironmentReviewer {
  readonly id: number;
  readonly 'type': 'User' | 'Team';
}

interface GitHubEnvironment {
  readonly name: string;
  readonly reviewers?: GitHubEnvironmentReviewer[];
  readonly deployment_branch_policy?: {
    protected_branches?: boolean;
    custom_branches?: string[];
  };
}

export interface TerraformBackend {
  readonly aws: S3Backend;
}

export interface S3Backend {
  /**
   * The AWS accountId where the S3 bucket and DynamoDB locks table exist.
   */
  readonly accountId: string;
  /**
   * Prefix to use when naming backend resources
   */
  readonly prefix: string;

  /**
   * AWS region where the S3 bucket and DynamoDB locks table exist.
   *
   * @default - 'us-east-1'
   */
  readonly region?: string;
}

export interface TerraformModuleOptions {
  readonly name: string;
  readonly nameOverride?: string;
  readonly githubOrgName: string;
  readonly version: string;
}

export interface CdktfProjectOptions extends typescript.TypeScriptProjectOptions {
  /**
   * Configurable folder for artifacts to package when transitioning from plan to apply.
   *
   * @default - 'dist'
   */
  readonly artifactsFolder?: string;

  /**
   * Add GitHub Wokflows for enabled environments
   *
   * @default - {}
   */
  readonly deploymentEnvironments?: { [key: string]: DeploymentEnvironment };

  /**
   * A set of scripts to be added to package.json but not wrapped by projen
   *
   * @default - {}
   */
  readonly nodeScripts?: { [name:string]: string };

  /**
   * Raw lines to drop into the workflow's .npmrc file, to access private package.
   * Empty implies no .npmrc required.
   *
   * @default - []
   */
  readonly npmrc?: string[];

  /**
   * The GitHub Team slug (including the org_name/ prefix) or GitHub username for the teams/people who maintain infrastructure.
   * As a hack, and to avoid async fetching from the GitHub API to lookup ids, this is a map of
   * username => GitHub id (which will need to be looked up manually). In the future it would be
   * nice to make this a simple string[] (list of usernames) and automatically lookup the ids.
   *
   * @default - {}
   */
  readonly repoAdmins?: { [key: string]: number };

  /**
   * Terraform backend configuration.
   *
   * @default - S3Backend
   */
  readonly terraformBackend?: TerraformBackend;

  /**
   * Terraform Providers to add to cdktf.json
   *
   * @default - []
   */
  readonly terraformProviders?: string[];

  /**
   * Terraform Modules to add to cdktf.json. These are assumed to be internal to the Medly GitHub org.
   *
   * @default - []
   */
  readonly terraformModules?: TerraformModuleOptions[];

  /**
   * Set this to true for local dev when using SSH to connect to GitHub.
   *
   * @default - false
   */
  readonly terraformModulesSsh?: boolean;

  /**
   * List of Terraform variables to pull from GitHub secrets and set as TF_VAR_
   * environment variables during terraform plan. The secrets will need to be set
   * manually, on one of org/repo/environment. The name of the var is expected to
   * not include the TF_VAR_ prefix.
   *
   * @default - []
   */
  readonly terraformVars?: string[];

}

export class CdktfProject extends typescript.TypeScriptProject {
  constructor(options: CdktfProjectOptions) {
    const {
      artifactsFolder = 'dist',
      defaultReleaseBranch,
      deploymentEnvironments = {},
      maxNodeVersion = NodeVersion,
      minNodeVersion = `${NodeVersion}.0.0`,
      npmrc = [],
      repoAdmins = {},
      terraformModules = [],
      terraformProviders = ['aws@~> 4.24.0'],
      terraformModulesSsh = false,
      terraformVars = [],
      workflowNodeVersion = NodeVersion,
    } = options;
    const tempOptions = {
      ...options,
      buildWorkflow: false,
      depsUpgrade: false,
      entrypoint: `${artifactsFolder}/index.js`,
      eslint: false,
      jest: false,
      licensed: false,
      maxNodeVersion,
      mergify: false,
      minNodeVersion,
      deps: squashPackages([...(options.deps ?? []), ...deps]),
      pullRequestTemplate: false,
      releaseWorkflow: false,
      sampleCode: false,
      scripts: {
        'cdktf-get': 'cdktf get',
        'cdktf-build': 'cdktf get && tsc',
        'cdktf-diff': 'cdktf diff',
        'cdktf-synth': 'cdktf synth',
        'tsc-compile': 'tsc --pretty',
        'tsc-watch': 'tsc -w',
        'cdktf-upgrade': 'npm i cdktf@latest cdktf-cli@latest',
        ...options.scripts,
      },
      stale: false,
      tsconfig: {
        ...options.tsconfig,
        compilerOptions: {
          ...options.tsconfig?.compilerOptions,
          rootDir: '.',
          outDir: '.',
          declaration: true,
          lib: mergeUnique(options.tsconfig?.compilerOptions?.lib || [], ['esnext']),
          noEmitOnError: true,
        },
        include: mergeUnique(options.tsconfig?.include || [], ['**/*.ts']),
      },
      workflowNodeVersion,
      terraformBackend: {
        aws: {
          accountId: options.terraformBackend?.aws.accountId ?? 'TODO',
          prefix: options.terraformBackend?.aws.prefix ?? 'TODO',
          region: options.terraformBackend?.aws.region ?? 'us-east-1',
        },
      },
      _name: allCases(options.name),
    };
    const { options: projectOpts, files } = loadSettings(tempOptions, path.join(__dirname, '../files'), true);
    super(projectOpts);
    addFiles(this, files);

    this.gitignore.exclude(
      '*.d.ts',
      '*.js',
      'node_modules',
      '.gen',
      'cdktf.out',
      'terraform.tfstate*',
      '.terraform',
      '*.tfplan',
      '.DS_Store',
      '!/lib',
      '!.projenrc.js',
    );


    const githubAdmins = Object.keys(repoAdmins).map(name => name.match(/^@/) ? name : `@${name}`);
    new TextFile(this, '.github/CODEOWNERS', {
      readonly: true,
      lines: githubAdmins.length > 0 ? [
        `* ${githubAdmins.join(' ')}`,
        `.projenrc.js ${githubAdmins.join(' ')}`,
        `config.ts ${githubAdmins.join(' ')}`,
        `README.md ${githubAdmins.join(' ')}`,
      ] : [],
    });

    if (options.nodeScripts) {
      Object.keys(options.nodeScripts).forEach(name => this.setScript(name, options.nodeScripts![name]));
    }

    const tfModules: Array<{name: string; source: string}> = [];
    terraformModules.forEach(module => {
      let sourceBase = terraformModulesSsh ? `git@github.com:${module.githubOrgName}` : `https://github.com/${module.githubOrgName}`;

      let tfModule = {
        name: (module.nameOverride) ? module.nameOverride : module.name,
        source: `git::${sourceBase}/${module.name}?ref=${module.version}`,
      };
      tfModules.push(tfModule);
    });
    new JsonFile(this, 'cdktf.json', {
      obj:
      {
        language: 'typescript',
        app: `tsc && node ${artifactsFolder}/index.js`,
        codeMakerOutput: 'src/.gen',
        terraformProviders: terraformProviders,
        terraformModules: tfModules,
        context: {
          excludeStackIdFromLogicalIds: 'true',
          allowSepCharsInLogicalIds: 'true',
        },
        // Prevents cdktf synth from needing write access to cdktf.json
        projectId: 'false',
      },
    });

    const environments: GitHubEnvironment[] = [];
    const setupNodeStep = {
      name: 'Setup Node.js',
      uses: 'actions/setup-node@v3',
      with: {
        'node-version': workflowNodeVersion,
      },
    };
    const npmrcLines = cleanArray(npmrc);
    const npmrcStep = (npmrcLines.length === 0) ? undefined : {
      name: 'Create .npmrc',
      run: [
        '(',
        'cat <<-EOF > .npmrc',
        '{',
        ...npmrcLines,
        '}',
        'EOF',
        ')',
      ].join('\n'),
    };
    // const githubClient = new Octokit();
    // const gitHubRepoAdmins: GitHubEnvironmentReviewer[] = githubAdmins.map(username => {
    //   if (isGitHubTeam(username)) {
    //     const [org, team_slug] = username.split('/');
    //     const gitHubTeam = githubClient.rest.teams.getByName({ org, team_slug })
    //     return {
    //       id: gitHubTeam.then(_ => _.data.id),
    //       'type': 'Team',
    //     }
    //   } else {
    //     const gitHubUser = githubClient.rest.users.getByUsername({ username })
    //     return {
    //       id: gitHubUser.then(_ => _.data.id),
    //       'type': 'User',
    //     }
    //   }
    // });
    const tfVars = cleanArray(terraformVars).reduce((all, current) => {
      // GITHUB_ is a reserved prefix for secrets
      const currentEscaped = current.match(/^GITHUB_/) ? `_${current}` : current;
      all[`TF_VAR_${current}`] = `\${{ secrets.${currentEscaped} }}`;
      return all;
    }, Object.assign({}));
    Object.entries(deploymentEnvironments).map(([env, config]) => {
      if (config.onlyProtectedBranches !== undefined && config.branchFilters !== undefined) throw new Error(`Please set either branchFilters OR onlyProtectedBranches for ${env}, not both.`);
      environments.push({
        name: `${env}-plan`,
      });
      const reviewers = config.requireApproval ? Object.entries(repoAdmins).map(([name, id]) => {
        return {
          id,
          type: isGitHubTeam(name) ? 'Team' : 'User',
        } as GitHubEnvironmentReviewer;
      }) : undefined;
      const deploymentBranchPolicy = config.branchFilters
        ? { custom_branches: config.branchFilters }
        : { protected_branches: config.onlyProtectedBranches ?? false };
      environments.push({
        name: env,
        reviewers,
        deployment_branch_policy: deploymentBranchPolicy,
      });
      const applyStepConditional = ['needs.plan.outputs.latest_commit == github.sha'];
      if (config.branchFilters) {
        applyStepConditional.push(`contains('${config.branchFilters.map(filter => `refs/heads/${filter}`).join('|')}', github.ref)`);
      } else if (config.onlyProtectedBranches) {
        applyStepConditional.push(`github.ref == 'refs/heads/${defaultReleaseBranch}'`);
      }
      const on = {
        workflow_dispatch: {},
        pull_request: { },
        push: { branches: [defaultReleaseBranch] },
      };
      Object.assign(on, { pull_request: { } });
      new YamlFile(this, `.github/workflows/plan-apply-${env}.yml`, {
        obj: {
          name: `plan-apply-${env}`,
          on,
          concurrency: {
            'group': `\${{ github.repository }}-${env}`,
            'cancel-in-progress': true,
          },
          jobs: {
            plan: {
              'runs-on': 'ubuntu-latest',
              'environment': `${env}-plan`,
              'permissions': {
                'id-token': 'write',
                'contents': 'read',
              },
              'outputs': {
                latest_commit: '${{ steps.git_remote.outputs.latest_commit }}',
              },
              'steps': [
                {
                  name: 'Checkout code',
                  uses: 'actions/checkout@v2',
                },
                setupNodeStep,
                npmrcStep,
                {
                  name: 'Install dependencies',
                  run: 'yarn install',
                },
                {
                  name: 'Build',
                  run: 'yarn cdktf-build',
                },
                {
                  name: 'Generate Terraform',
                  run: 'yarn cdktf-synth',
                },
                {
                  name: 'Terraform plan',
                  env: {
                    ...tfVars,
                    AWS_ACCESS_KEY_ID: '\${{ secrets.AWS_ACCESS_KEY_ID }}',
                    AWS_SECRET_ACCESS_KEY: '\${{ secrets.AWS_SECRET_ACCESS_KEY }}',
                  },
                  run: [
                    `terraform -chdir=cdktf.out/stacks/${env} init`,
                    `terraform -chdir=cdktf.out/stacks/${env} plan -out=${env}.tfplan`,
                    `mkdir -p ${artifactsFolder}/.terraform`,
                    `cp cdktf.out/stacks/${env}/${env}.tfplan ${artifactsFolder}`,
                    `cp cdktf.out/stacks/${env}/.terraform.lock.hcl ${artifactsFolder}`,
                    `cp -R cdktf.out/stacks/${env}/.terraform/* ${artifactsFolder}/.terraform`,
                  ].join('\n'),
                },
                {
                  name: 'Check for new commits',
                  id: 'git_remote',
                  run: 'echo "latest_commit=$(git ls-remote origin -h ${{ github.ref }} | cut -f1)" >> $GITHUB_OUTPUT',
                },
                {
                  'name': 'Backup artifact permissions',
                  'if': '\${{ steps.git_remote.outputs.latest_commit == github.sha }}',
                  'run': `cd ${artifactsFolder} && getfacl -R . > permissions-backup.acl`,
                  'continue-on-error': true,
                },
                {
                  name: 'Upload artifact',
                  if: '\${{ steps.git_remote.outputs.latest_commit == github.sha }}',
                  uses: 'actions/upload-artifact@v3',
                  with: {
                    name: 'build-artifact',
                    path: artifactsFolder,
                  },
                },
              ],
            },
            apply: {
              'runs-on': 'ubuntu-latest',
              'environment': env,
              'needs': 'plan',
              'permissions': {
                'id-token': 'write',
                'contents': 'read',
              },
              'if': applyStepConditional.join(' && '),
              'steps': [
                setupNodeStep,
                {
                  name: 'Download build artifacts',
                  uses: 'actions/download-artifact@v3',
                  with: {
                    name: 'build-artifact',
                    path: artifactsFolder,
                  },
                },
                {
                  'name': 'Restore build artifact permissions',
                  'run': `cd ${artifactsFolder} && setfacl --restore=permissions-backup.acl`,
                  'continue-on-error': true,
                },
                {
                  name: 'Terraform apply',
                  env: {
                    AWS_ACCESS_KEY_ID: '\${{ secrets.AWS_ACCESS_KEY_ID }}',
                    AWS_SECRET_ACCESS_KEY: '\${{ secrets.AWS_SECRET_ACCESS_KEY }}',
                  },
                  run: `cd ${artifactsFolder} && terraform apply ${env}.tfplan`,
                },
              ],
            },
          },
        },
      });
    });

    // https://github.com/apps/settings
    new YamlFile(this, '.github/settings.yml', {
      readonly: true,
      obj: {
        repository: {
          name: options.name,
          default_branch: defaultReleaseBranch,
          private: true,
          has_issues: true,
          has_wiki: false,
          has_projects: false,
          allow_squash_merge: true,
          allow_merge_commit: false,
          delete_branch_on_merge: true,
          topics: ['cdktf', 'infra', 'platform'].join(', '),
        },
        collaborators: githubAdmins.filter(name => !isGitHubTeam(name)).map(name => {
          return {
            username: name.replace(/^@/, ''),
            permission: 'admin',
          };
        }),
        teams: githubAdmins.filter(name => isGitHubTeam(name)).map(name => {
          return {
            name: name.split('/')[1],
            permission: 'admin',
          };
        }),
        branches: [
          {
            name: defaultReleaseBranch,
            protection: {
              required_pull_request_reviews: {
                required_approving_review_count: 1,
                require_code_owner_reviews: true,
              },
              required_status_checks: {
                strict: true, // Require branches to be up to date before merging.
                contexts: environments.length > 0 ? ['plan']: [], // Require plan if environments are turned on
              },
              enforce_admins: null,
              required_linear_history: null,
              restrictions: null,
            },
          },
        ],
        environments,
      },
    });

    new TextFile(this, 'src/environments.ts', {
      lines: [
        'export interface Environments<T> {',
        ...Object.keys(deploymentEnvironments).map(env => `  readonly ${env}: T`),
        '}',
        '',
        'export type Environment<T> = keyof Environments<T>',
        '',
      ],
    });

    new SampleFile(this, 'src/stack.ts', {
      contents: [
        'import { Construct } from \'constructs\';',
        'import { Environments } from \'./environments\';',
        'import { TerraformStack } from \'cdktf\';',
        '',
        'export const pushStacks = (scope: Construct): Environments<TerraformStack> => {',
        '  return {',
        ...Object.keys(deploymentEnvironments).map(env => `    '${env}': new TerraformStack(scope, '${env}'),`),
        '  }',
        '}',
        '',
      ].join('\n'),
    });
  }
}
