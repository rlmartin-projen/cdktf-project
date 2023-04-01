# cdktf-project
This is a [projen](https://github.com/projen/projen) project template to manage CDKTF repositories. Please see the [API](./API.md) for documentation.

## Requirements
CDKTF supports only certain versions of Node (`^19.0.0`, `^16.3.0`, `^18.0.0`) and will show unexpected errors in other versions of Node. As such, make sure your local environment is using one of these versions when running projen. `18.0.0` has the farthest EOL at `2025-04-30`.

## Usage
```
nvm use 18
npx projen new \
  --from @rlmartin-projen/cdktf-project@~0 \
  --projenrc-ts
```

## Warnings
### .github/settings.yml
This template will generate configuration in `.github/settings.yml` to attempt to manage [protected branches](https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28) and [deployment environments](https://docs.github.com/en/rest/deployments/environments?apiVersion=2022-11-28). Both of these features are available to only _public repositories_ or _public and private repositories on paid plans_. If you are using this project template on a _free, private repository_, you should not expect the protected branch or deployment environment configuration in `.github/settings.yml` to have any effect.
