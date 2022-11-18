# cdktf-project

## Bootstrapping
1. Set a `NPM_TOKEN` secret at either the repository or org level. It needs to have permissions to write packages.
2. Set a `PROJEN_GITHUB_TOKEN` secret at either the repository or org level. It needs to have permissions to submit PRs.
3. Add template files into the `files/generated` or `files/scaffolding` directories as needed. See [reference](https://github.com/rlmartin-projen/projen-project#adding-simple-template-files) if needed.
4. Add non-templated resources to `src/cdktf-project.ts`
5. Delete this section of the README
