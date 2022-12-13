import * as path from 'path';
import { addFiles, loadSettings, squashPackages } from '@rlmartin-projen/projen-project';
import { JsonFile, TextFile, typescript, YamlFile } from 'projen';

const deps = [
  'projen@~0',
  'cdktf@~0',
  'cdktf-cli@~0',
  'constructs@~10',
];

function mergeUnique<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set(arr1.concat(arr2))];
}

export interface TerraformModuleOptions {
  readonly name: string;
  readonly nameOverride?: string;
  readonly githubOrgName: string;
  readonly version: string;
}

export interface CdktfProjectOptions extends typescript.TypeScriptProjectOptions {
  /**
   * Add GitHub Wokflows for enabled environments
   *
   * @default - []
   */
  readonly enabledEnvs?: string[];

  /**
   * A set of scripts to be added to package.json but not wrapped by projen
   *
   * @default - {}
   */
  readonly nodeScripts?: { [name:string]: string };

  /**
   * The GitHub Team slug (including the org_name/ prefix) or GitHub username for the teams/people who maintain infrastructure.
   *
   * @default - []
   */
  readonly repoAdmins?: string[];

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
}

export class CdktfProject extends typescript.TypeScriptProject {
  constructor(options: CdktfProjectOptions) {
    const {
      enabledEnvs = [],
      repoAdmins = [],
      terraformModules = [],
      terraformProviders = ['aws@~> 4.24.0'],
      terraformModulesSsh = false,
    } = options;
    const tempOptions = {
      ...options,
      buildWorkflow: false,
      depsUpgrade: false,
      entrypoint: 'main.js',
      eslint: false,
      jest: false,
      licensed: false,
      mergify: false,
      opts: squashPackages([...(options.deps ?? []), ...deps]),
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

    const githubAdmins = repoAdmins.map(name => name.match(/^@/) ? name : `@${name}`);
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
        app: 'tsc && node main.js',
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

    enabledEnvs.map(env => {
      let tfSteps = ['plan'];
      if (env.includes('dev')) {
        tfSteps.push('apply');
      }
      tfSteps.map(step => {
        const on = {
          workflow_dispatch: {},
        };
        if (step == 'apply' && env.includes('dev')) {
          Object.assign(on, { push: { branches: ['main'] } });
        } else {
          Object.assign(on, { pull_request: {} });
        }
        new YamlFile(this, `.github/workflows/${step}-${env}.yml`, {
          obj: {
            name: `${step}-${env}`,
            on: on,
            concurrency: `\${{ github.repository }}-${env}`,
            env: {
              AWS_ROLE_ARN: '${{ secrets.IAC_PIPELINES_ROLE_ARN }}',
              AWS_REGION: 'us-east-1',
            },
            jobs: {
              [step]: {
                'runs-on': 'ubuntu-latest',
                'permissions': {
                  'id-token': 'write',
                  'contents': 'read',
                },
                'steps': [
                  {
                    name: 'Checkout code',
                    uses: 'actions/checkout@v2',
                  },
                  {
                    name: 'Configure AWS Credentials',
                    uses: 'aws-actions/configure-aws-credentials@master',
                    with: {
                      'aws-region': '${{ env.AWS_REGION }}',
                      'role-to-assume': '${{ env.AWS_ROLE_ARN }}',
                      'role-session-name': `github-actions-${step}-\${{ env.REPO_NAME }}`,
                    },
                  },
                  // TODO: fix this
                  {
                    name: 'CodeBuild IAC ${{ env.TF_ROLE }}',
                    uses: 'aws-actions/aws-codebuild-run-build@v1.0.4',
                    with: {
                      'project-name': '${{ env.ENV }}-iac-pipeline-${{ env.TF_ROLE }}-runner',
                      'env-vars-for-codebuild': 'REPO_NAME,\nTRIGGER\n',
                    },
                  },
                ],
              },
            },
          },
        });
      });
    });

    // https://github.com/apps/settings
    new YamlFile(this, '.github/settings.yml', {
      readonly: true,
      obj: {
        repository: {
          name: options.name,
          default_branch: options.defaultReleaseBranch,
          private: true,
          has_issues: true,
          has_wiki: false,
          has_projects: false,
          allow_squash_merge: true,
          allow_merge_commit: false,
          delete_branch_on_merge: true,
          topics: ['cdktf', 'infra', 'platform'].join(', '),
        },
        contributors: githubAdmins.filter(name => !name.includes('/')).map(name => {
          return {
            name,
            permission: 'admin',
          };
        }),
        teams: githubAdmins.filter(name => name.includes('/')).map(name => {
          return {
            name,
            permission: 'admin',
          };
        }),
        branches: [
          {
            name: options.defaultReleaseBranch,
            protection: {
              required_pull_request_reviews: {
                required_approving_review_count: 1,
                require_code_owner_reviews: true,
              },
              required_status_checks: {
                strict: true, // Require branches to be up to date before merging.
                contexts: (enabledEnvs.length > 0) ? ['plan'] : [], // Require plan if enabledEnvs
              },
              enforce_admins: null,
              required_linear_history: null,
              restrictions: null,
            },
          },
        ],
      },
    });
  }
}
