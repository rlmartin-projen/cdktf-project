# cdktf-project
This is a [projen](https://github.com/projen/projen) project template to manage CDKTF repositories. Please see the [API](./API.md) for documentation.

## Requirements
CDKTF uses Node 14 and will show unexpected errors in higher versions of Node. As such, make sure your local environment is using Node 14 when running projen.

## Usage
```
nvm use 14
npx projen new \
  --from @rlmartin-projen/cdktf-project@~0 \
  --projenrc-ts
```
