import { App, TerraformStack } from 'cdktf';
import { pushBackend } from './backend';
import { Environment } from './environments';
import { pushStacks } from './stack';

const app = new App();
const stacks = pushStacks(app);
Object.entries(stacks).forEach(([env, stack]) => pushBackend<TerraformStack>(stack, env as Environment<TerraformStack>))
app.synth();
