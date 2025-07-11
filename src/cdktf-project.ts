import * as path from 'path';
import { NodeVersion, addFiles, allCases, kebabCase, loadSettings, sharedOptions, squashPackages } from '@rlmartin-projen/projen-project';
import { JsonFile, SampleFile, TextFile, typescript, YamlFile } from 'projen';
import { JobStep as GitHubJobStep } from 'projen/lib/github/workflows-model';
import { cleanArray, isGitHubTeam } from './helpers';

export const sharedDeps = [
  'cdktf@~0',
  'constructs@~10',
  'projen@~0',
];

const deps = [
  'cdktf-cli@~0',
  ...sharedDeps,
];
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
   * The AWS region to deploy to.
   *
   * @default - us-east-1
   */
  readonly region?: string;

  /**
   * Whether the environment requires approval before applying; plans always run
   *
   * @default - false
   */
  readonly requireApproval?: boolean;

  /**
   * Whether this deployment uses a GitHub OIDC connection to deploy.
   * See https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
   *
   * @default - false
   */
  readonly useOidc?: boolean;
}

export type EmbeddedPackageType = 'function' | 'library';

export interface EmbeddedPackage {
  /**
   * Any dependencies specific to the embedded function.
   *
   * @default - []
   */
  readonly deps?: string[];
  /**
   * Any dev dependencies specific to the embedded function.
   *
   * @default - []
   */
  readonly devDeps?: string[];
  /**
   * Local dependencies on other embedded packages.
   *
   * @default - []
   */
  readonly localDeps?: string[];
  /**
   * Determined whether the embedded package is a function or a library
   */
  readonly type: EmbeddedPackageType;
}

interface GitHubEnvironmentReviewer {
  readonly id: number;
  readonly type: 'User' | 'Team';
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

export interface TerraformSubmoduleOptions {
  readonly name: string;
  /**
   * The directory where the module can be found. Should not include 'name'.
   *
   * @default - modules
   */
  readonly rootPath?: string;
}

export interface TerraformModuleOptions {
  readonly name: string;
  readonly nameOverride?: string;
  readonly githubOrgName: string;
  readonly submodule?: TerraformSubmoduleOptions;
  readonly version: string;
}

export type WorkflowInputType = 'boolean' | 'choice' | 'number' | 'string';

export interface WorkflowInputOptions {
  readonly default?: string;
  readonly description?: string;
  readonly options?: string[];
  readonly required?: boolean;
  readonly type?: WorkflowInputType;
}

export type WorkflowType = 'main' | 'manual';
export interface WorkflowExcludable {
  readonly excludedWorkflows?: WorkflowType[];
}
export interface JobStep extends GitHubJobStep, WorkflowExcludable {};

export interface WorkflowSteps {
  readonly preBuild?: JobStep[];
  readonly postBuild?: JobStep[];
  readonly preDeploy?: JobStep[];
  readonly postDeploy?: JobStep[];
}

export type EnvNameInclusion = 'none' | 'prefix' | 'suffix';
export interface EnvVars {
  readonly secrets?: string[] | { [key: string]: EnvNameInclusion };
  readonly vars?: string[] | { [key: string]: EnvNameInclusion };
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
   * Used to scope the embedded packages to avoid naming collisions.
   *
   * @default - top-level project name
   */
  readonly embeddedNamespace?: string;

  /**
   * Small functions to be deployed with the other resources in the repo.
   * Should be viewed more as infrastructure than services. Testing and linting
   * intentionally mirror the overall repo.
   *
   * @default - {}
   */
  readonly embeddedPackages?: { [key: string]: EmbeddedPackage };

  /**
   * A set of scripts to be added to package.json but not wrapped by projen
   *
   * @default - {}
   */
  readonly nodeScripts?: { [name:string]: string };

  /**
   * The Node.js version to use when building.
   *
   * @default - 20
   */
  readonly nodeVersion?: NodeVersion;

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
   * Root directory where code lives.
   *
   * @default 'src'
   */
  readonly rootDir?: string;

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
   * Set this to turn on a GitHub workflow that can be used to
   * run manual Terraform commands within the environment. This
   * is helpful for debugging and managing complicated state changes.
   */
  readonly terraformManualWorkflow?: boolean;

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
   * List of Terraform variables to pull from GitHub secrets/vars and set as TF_VAR_
   * environment variables during terraform plan. The secrets will need to be set
   * manually, on one of org/repo/environment. The name of the var is expected to
   * not include the TF_VAR_ prefix.
   *
   * @default - []
   */
  readonly terraformVars?: EnvVars;

  /**
   * The Terraform version to use in the build pipelines.
   *
   * @default - latest
   */
  readonly terraformVersion?: string;

  /**
   * Optional list of env vars to load from GitHub Secrets/Variables into
   * workflow-level env variables.
   *
   * @default - {}
   */
  readonly workflowEnvVars?: EnvVars;
  /**
   * Optional inputs (map of name => options) to inject into the workflow_dispatch.
   */
  readonly workflowInputs?: { [key: string]: WorkflowInputOptions };
  /**
   * Optional steps to include in the GitHub workflow.
   */
  readonly workflowSteps?: WorkflowSteps;
}

export class CdktfProject extends typescript.TypeScriptProject {
  private embeddedPackageNames: Record<EmbeddedPackageType, string[]>;

  constructor(options: CdktfProjectOptions) {
    const { nodeVersion = sharedOptions.nodeVersion } = options;
    const {
      artifactsFolder = 'dist',
      defaultReleaseBranch,
      deploymentEnvironments = {},
      majorVersion = 0,
      minNodeVersion = `${nodeVersion}.0.0`,
      npmrc = [],
      repoAdmins = {},
      rootDir = 'src',
      terraformModules = [],
      terraformProviders = [],
      terraformManualWorkflow = false,
      terraformModulesSsh = false,
      terraformVars = {},
      terraformVersion = 'latest',
      workflowNodeVersion = nodeVersion.toString(),
      workflowEnvVars = {},
      workflowInputs,
      workflowSteps = {},
    } = options;
    const tempOptions = {
      ...options,
      buildWorkflow: false,
      depsUpgrade: false,
      entrypoint: `${artifactsFolder}/index.js`,
      licensed: false,
      majorVersion,
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
          rootDir,
          outDir: artifactsFolder,
          declaration: true,
          noEmitOnError: false,
          ...options.tsconfig?.compilerOptions,
          lib: mergeUnique(options.tsconfig?.compilerOptions?.lib || [], ['esnext']),
        },
        include: mergeUnique(
          options.tsconfig?.include || [],
          [`${(options.tsconfig?.compilerOptions?.rootDir ?? rootDir) + '/'}**/*.ts`],
        ),
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

    const tfModules: Array<{ name: string; source: string }> = [];
    terraformModules.forEach(module => {
      let sourceBase = terraformModulesSsh ? `git@github.com:${module.githubOrgName}` : `https://github.com/${module.githubOrgName}`;

      let tfModule = {
        name: (module.nameOverride) ? module.nameOverride : module.name + `${module.submodule ? '-' + module.submodule.name : ''}`,
        source: `git::${sourceBase}/${module.name}${module.submodule ? '//' + (module.submodule.rootPath ?? 'modules') + '/' + module.submodule.name : ''}?ref=${module.version}`,
      };
      tfModules.push(tfModule);
    });
    new JsonFile(this, 'cdktf.json', {
      obj:
      {
        language: 'typescript',
        app: `tsc && node ${artifactsFolder}/index.js`,
        codeMakerOutput: `${rootDir}/.gen`,
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

    this.embeddedPackageNames = {
      library: [],
      function: [],
    };
    Object.entries(options.embeddedPackages ?? {}).forEach(([name, funcConfig]) => {
      this.addEmbeddedPackage(name, funcConfig, majorVersion, rootDir, options.embeddedNamespace);
    });
    if (Object.entries(options.embeddedPackages ?? {}).length > 0) {
      this.addFields({
        private: true,
        workspaces: [
          'packages/*',
        ],
      });
    }

    const environments: GitHubEnvironment[] = [];
    const setupNodeStep = {
      name: 'Setup Node.js',
      uses: 'actions/setup-node@v4',
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
    Object.entries(deploymentEnvironments).map(([env, config]) => {
      const tfVars = {
        ...envVarListToGithubEnv(terraformVars?.secrets, env, 'secrets', true),
        ...envVarListToGithubEnv(terraformVars?.vars, env, 'vars', true),
      };
      const { branchFilters, onlyProtectedBranches, region = 'us-east-1', useOidc = false } = config;
      if (onlyProtectedBranches !== undefined && branchFilters !== undefined) throw new Error(`Please set either branchFilters OR onlyProtectedBranches for ${env}, not both.`);
      environments.push({
        name: `${env}-plan`,
      });
      const reviewers = config.requireApproval ? Object.entries(repoAdmins).map(([name, id]) => {
        return {
          id,
          type: isGitHubTeam(name) ? 'Team' : 'User',
        } as GitHubEnvironmentReviewer;
      }) : undefined;
      const deploymentBranchPolicy = branchFilters
        ? { custom_branches: branchFilters }
        : { protected_branches: onlyProtectedBranches ?? false };
      environments.push({
        name: env,
        reviewers,
        deployment_branch_policy: deploymentBranchPolicy,
      });
      const applyStepConditional = ['needs.plan.outputs.latest_commit == github.sha'];
      if (branchFilters) {
        applyStepConditional.push(`contains('${branchFilters.map(filter => `refs/heads/${filter}`).join('|')}', github.ref)`);
      } else if (onlyProtectedBranches) {
        applyStepConditional.push(`github.ref == 'refs/heads/${defaultReleaseBranch}'`);
      }
      const on = {
        workflow_dispatch: workflowInputs ? { inputs: workflowInputs } : {},
        pull_request: { },
        push: { branches: [defaultReleaseBranch] },
      };
      const workflowEnv = {
        ...envVarListToGithubEnv(workflowEnvVars?.secrets, env, 'secrets'),
        ...envVarListToGithubEnv(workflowEnvVars?.vars, env, 'vars'),
        ENV: env,
      };
      var awsCredsEnvVars = undefined;
      var awsCredsStep = undefined;
      var oidcPermissions = undefined;
      if (useOidc) {
        oidcPermissions = {
          'id-token': 'write',
          'contents': 'read',
        };
        awsCredsStep = {
          name: 'Configure AWS Credentials',
          uses: 'aws-actions/configure-aws-credentials@v4',
          with: {
            'aws-region': region,
            // TODO: Move this into environment-level variables once this Settings App is implemented:
            // https://github.com/repository-settings/app/issues/711
            'role-to-assume': `\${{ vars.${env.toUpperCase()}_DEPLOYMENT_ROLE }}`,
            'role-session-name': `${kebabCase(this.name)}-${kebabCase(env)}-oidc-session`,
          },
        };
      } else {
        awsCredsEnvVars = {
          AWS_ACCESS_KEY_ID: `\${{ secrets.${env.toUpperCase()}_AWS_ACCESS_KEY_ID }}`,
          AWS_SECRET_ACCESS_KEY: `\${{ secrets.${env.toUpperCase()}_AWS_SECRET_ACCESS_KEY }}`,
        };
      }
      const tfSetupSteps: JobStep[] = [
        {
          name: 'Checkout code',
          uses: 'actions/checkout@v4',
        },
        setupNodeStep,
        npmrcStep,
        {
          uses: 'hashicorp/setup-terraform@v3',
          with: {
            terraform_version: terraformVersion,
            terraform_wrapper: false,
          },
        },
        {
          name: 'Install dependencies',
          run: 'yarn install',
        },
        ...(workflowSteps.preBuild ?? []),
        ...this.embeddedPackageNames.library.map(name => {
          return {
            name: `Build + package ${name}`,
            run: `yarn workspace ${name} package`,
          };
        }),
        ...this.embeddedPackageNames.function.map(name => {
          return {
            name: `Build + package ${name}`,
            run: `yarn workspace ${name} package`,
          };
        }),
        {
          name: 'Build',
          run: 'yarn cdktf-build',
        },
        {
          name: 'Generate Terraform',
          run: 'yarn cdktf-synth',
        },
        awsCredsStep,
      ].filter(x => x) as JobStep[];
      Object.assign(on, { pull_request: { } });
      new YamlFile(this, `.github/workflows/plan-apply-${env}.yml`, {
        obj: {
          name: `plan-apply-${env}`,
          on,
          concurrency: {
            'group': `\${{ github.repository }}-${env}`,
            'cancel-in-progress': true,
          },
          env: workflowEnv,
          jobs: {
            plan: {
              'runs-on': 'ubuntu-latest',
              'environment': `${env}-plan`,
              'permissions': oidcPermissions,
              'outputs': {
                latest_commit: '${{ steps.git_remote.outputs.latest_commit }}',
              },
              'steps': [
                ...filterJobSteps(tfSetupSteps, 'main'),
                {
                  name: 'Terraform plan',
                  env: {
                    ...tfVars,
                    ...awsCredsEnvVars,
                  },
                  run: [
                    `terraform -chdir=cdktf.out/stacks/${env} init`,
                    `terraform -chdir=cdktf.out/stacks/${env} plan -out=${env}.tfplan`,
                    `mkdir -p ${artifactsFolder}/.terraform`,
                    `cp cdktf.out/stacks/${env}/${env}.tfplan ${artifactsFolder}`,
                    `cp cdktf.out/stacks/${env}/.terraform.lock.hcl ${artifactsFolder}`,
                    `cp -R cdktf.out/stacks/${env}/.terraform/* ${artifactsFolder}/.terraform`,
                    `mkdir -p ${artifactsFolder}/assets`,
                    `cp -R cdktf.out/stacks/${env}/assets/* ${artifactsFolder}/assets || true`,
                  ].join('\n'),
                },
                {
                  name: 'Check for new commits',
                  id: 'git_remote',
                  run: 'echo "latest_commit=$(git ls-remote origin -h ${{ github.ref }} | cut -f1)" >> $GITHUB_OUTPUT',
                },
                ...filterJobSteps(workflowSteps.postBuild ?? [], 'main'),
                {
                  'name': 'Backup artifact permissions',
                  'if': '\${{ steps.git_remote.outputs.latest_commit == github.sha }}',
                  'run': `cd ${artifactsFolder} && getfacl -R . > permissions-backup.acl`,
                  'continue-on-error': true,
                },
                {
                  name: 'Zip artifact',
                  run: `zip -r ${artifactsFolder}.zip ${artifactsFolder}`,
                },
                {
                  name: 'Upload artifact',
                  if: '\${{ steps.git_remote.outputs.latest_commit == github.sha }}',
                  uses: 'actions/upload-artifact@v4',
                  with: {
                    name: `${artifactsFolder}.zip`,
                    path: `${artifactsFolder}.zip`,
                  },
                },
              ],
            },
            apply: {
              'runs-on': 'ubuntu-latest',
              'environment': env,
              'needs': 'plan',
              'permissions': oidcPermissions,
              'if': applyStepConditional.join(' && '),
              'steps': [
                setupNodeStep,
                {
                  uses: 'hashicorp/setup-terraform@v3',
                  with: {
                    terraform_version: terraformVersion,
                    terraform_wrapper: false,
                  },
                },
                {
                  name: 'Download build artifacts',
                  uses: 'actions/download-artifact@v4',
                  with: {
                    name: `${artifactsFolder}.zip`,
                  },
                },
                {
                  name: 'Unzip artifact',
                  run: `unzip ${artifactsFolder}.zip`,
                },
                {
                  'name': 'Restore build artifact permissions',
                  'run': `cd ${artifactsFolder} && setfacl --restore=permissions-backup.acl`,
                  'continue-on-error': true,
                },
                awsCredsStep,
                ...filterJobSteps(workflowSteps.preDeploy ?? [], 'main'),
                {
                  name: 'Terraform apply',
                  env: awsCredsEnvVars,
                  run: `cd ${artifactsFolder} && terraform apply ${env}.tfplan`,
                },
                ...filterJobSteps(workflowSteps.postDeploy ?? [], 'main'),
              ],
            },
          },
        },
      });
      if (terraformManualWorkflow) {
        new YamlFile(this, `.github/workflows/terraform-manual-${env}.yml`, {
          obj: {
            name: `terraform-manual-${env}`,
            on: {
              workflow_dispatch: {
                inputs: {
                  command: {
                    description: 'The Terraform command to execute, not including the \'terraform\' keyword',
                    required: true,
                  },
                  tf_log: {
                    description: 'Set to any log level to see Terraform log output',
                    required: false,
                    type: 'choice',
                    options: [
                      '',
                      'JSON',
                      'TRACE',
                      'DEBUG',
                      'INFO',
                      'WARN',
                      'ERROR',
                    ],
                  },
                  ...workflowInputs,
                },
              },
            },
            concurrency: {
              'group': `\${{ github.repository }}-${env}`,
              'cancel-in-progress': true,
            },
            env: workflowEnv,
            jobs: {
              manual: {
                'runs-on': 'ubuntu-latest',
                'environment': `${env}-plan`,
                'permissions': oidcPermissions,
                'steps': [
                  ...filterJobSteps(tfSetupSteps, 'manual'),
                  {
                    name: 'Run Terraform command',
                    env: {
                      ...tfVars,
                      ...awsCredsEnvVars,
                      TF_LOG: '${{ github.event.inputs.tf_log }}',
                    },
                    run: [
                      `terraform -chdir=cdktf.out/stacks/${env} init`,
                      `terraform -chdir=cdktf.out/stacks/${env} \${{ github.event.inputs.command }}`,
                    ].join('\n'),
                  },
                  ...filterJobSteps(workflowSteps.postBuild ?? [], 'manual'),
                ],
              },
            },
          },
        });
      }
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

    new TextFile(this, `${rootDir}/environments.ts`, {
      lines: [
        'export interface Environments<T> {',
        ...Object.keys(deploymentEnvironments).map(env => `  readonly ${env}: T;`),
        '}',
        '',
        'export type Environment<T> = keyof Environments<T>',
        '',
      ],
    });
    this.eslint?.addIgnorePattern(`${rootDir}/environments.ts`);

    new SampleFile(this, `${rootDir}/stack.ts`, {
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

  addEmbeddedPackage(name: string, config: EmbeddedPackage, majorVersion: number, rootDir?: string, namespaceOpt?: string) {
    const { deps: embeddedDeps, devDeps: embeddedDevDeps, localDeps = [], type: packageType } = config;
    const suffixes: Record<EmbeddedPackageType, string> = {
      function: '-function',
      library: '',
    };
    var suffix = suffixes[packageType];
    const cleanName = `${kebabCase(name).replace(new RegExp(`${suffix}$`), '')}${suffix}`;
    const namespace = namespaceOpt ?? this.name;
    const npmScope = packageType === 'function' ? '' : `@${namespace}/`;
    const artifactsDirectory = this.artifactsDirectory;
    const embedded = new typescript.TypeScriptProject({
      artifactsDirectory,
      name: `${npmScope}${cleanName}`,
      parent: this,
      defaultReleaseBranch: 'main',
      deps: embeddedDeps,
      devDeps: embeddedDevDeps,
      entrypoint: path.join(artifactsDirectory, 'index.js'),
      eslintOptions: this.eslint?.config,
      jest: this.jest?.config,
      licensed: false,
      outdir: path.join('packages', cleanName),
      tsconfig: {
        ...this.tsconfig,
        compilerOptions: {
          ...this.tsconfig?.compilerOptions,
          declaration: packageType === 'library',
          rootDir,
        },
        fileName: this.tsconfig?.fileName ?? 'tsconfig.json',
      },
      tsconfigDev: {
        ...this.tsconfigDev,
        compilerOptions: {
          ...this.tsconfigDev?.compilerOptions,
          declaration: packageType === 'library',
          rootDir,
        },
        fileName: this.tsconfigDev?.fileName ?? 'tsconfig.dev.json',
      },
    });
    embedded.npmignore?.include('dist');
    embedded.addFields({
      optionalDependencies: localDeps.reduce((current, dep) => {
        current[`@${namespace}/${dep}`] = `~${majorVersion}`;
        return current;
      }, Object.assign({})),
      private: true,
    });
    Object.entries({
      build: 'tsc --build',
      test: 'jest --passWithNoTests --updateSnapshot',
      prepackage: '$npm_execpath run test && $npm_execpath run eslint',
      package: '$npm_execpath run build',
      postpackage: `rm -rf node_modules && cp package.json ${artifactsDirectory} && cd ${artifactsDirectory} && npm install --production --ignore-optional ${localDeps.map(dep => `&& npm pack ../../${dep} | grep .tgz | xargs npm install --production`).join(' ')} && rm *.tgz || true`,
    }).forEach(([embeddedFuncName, script]) => embedded.setScript(embeddedFuncName, script));
    this.embeddedPackageNames[packageType].push(`${npmScope}${cleanName}`);
  }
}

function envVarListToGithubEnv(
  list: string[] | { [key: string]: EnvNameInclusion } | undefined,
  env: string,
  varType: 'secrets' | 'vars',
  isTfVar: boolean = false,
): object {
  const varMap = Array.isArray(list)
    ? list.reduce((all, varName) => { all[varName] = 'none'; return all; }, Object.assign({}) as { [key: string]: EnvNameInclusion })
    : list ?? {}
  ;
  return Object.entries(varMap).reduce((all, [varName, inclusionType]) => {
    const currentEscaped = varName.match(/^GITHUB_/) ? `_${varName}` : varName;
    all[`${isTfVar ? 'TF_VAR_' : ''}${varName}`] = `\${{ ${varType}.${inclusionType == 'prefix' ? env.toUpperCase() + '_' : ''}${currentEscaped}${inclusionType == 'suffix' ? '_' + env.toUpperCase() : ''} }}`;
    return all;
  }, Object.assign({}));
}

function filterJobSteps(steps: JobStep[], workflowType: WorkflowType): GitHubJobStep[] {
  return steps
    .filter(step => !step.excludedWorkflows || !step.excludedWorkflows.includes(workflowType))
    .map(step => {
      const { excludedWorkflows, ...other } = step;
      return other;
    });
}
