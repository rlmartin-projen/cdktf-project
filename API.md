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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CdktfProject <a name="CdktfProject" id="@rlmartin-projen/cdktf-project.CdktfProject"></a>

#### Initializers <a name="Initializers" id="@rlmartin-projen/cdktf-project.CdktfProject.Initializer"></a>

```typescript
import { CdktfProject } from '@rlmartin-projen/cdktf-project'

new CdktfProject(options: CdktfProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.Initializer.parameter.options">options</a></code> | <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions">CdktfProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@rlmartin-projen/cdktf-project.CdktfProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions">CdktfProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addCompileCommand">addCompileCommand</a></code> | DEPRECATED. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addTestCommand">addTestCommand</a></code> | DEPRECATED. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.hasScript">hasScript</a></code> | Indicates if a script by the name name is defined. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.addEmbeddedPackage">addEmbeddedPackage</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@rlmartin-projen/cdktf-project.CdktfProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@rlmartin-projen/cdktf-project.CdktfProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: string): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@rlmartin-projen/cdktf-project.CdktfProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* string

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@rlmartin-projen/cdktf-project.CdktfProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rlmartin-projen/cdktf-project.CdktfProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@rlmartin-projen/cdktf-project.CdktfProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rlmartin-projen/cdktf-project.CdktfProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### `addTask` <a name="addTask" id="@rlmartin-projen/cdktf-project.CdktfProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@rlmartin-projen/cdktf-project.CdktfProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="@rlmartin-projen/cdktf-project.CdktfProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="@rlmartin-projen/cdktf-project.CdktfProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@rlmartin-projen/cdktf-project.CdktfProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@rlmartin-projen/cdktf-project.CdktfProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@rlmartin-projen/cdktf-project.CdktfProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@rlmartin-projen/cdktf-project.CdktfProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@rlmartin-projen/cdktf-project.CdktfProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@rlmartin-projen/cdktf-project.CdktfProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `npx projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@rlmartin-projen/cdktf-project.CdktfProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@rlmartin-projen/cdktf-project.CdktfProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="@rlmartin-projen/cdktf-project.CdktfProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rlmartin-projen/cdktf-project.CdktfProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="@rlmartin-projen/cdktf-project.CdktfProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rlmartin-projen/cdktf-project.CdktfProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@rlmartin-projen/cdktf-project.CdktfProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rlmartin-projen/cdktf-project.CdktfProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@rlmartin-projen/cdktf-project.CdktfProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rlmartin-projen/cdktf-project.CdktfProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addBins` <a name="addBins" id="@rlmartin-projen/cdktf-project.CdktfProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@rlmartin-projen/cdktf-project.CdktfProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### `addBundledDeps` <a name="addBundledDeps" id="@rlmartin-projen/cdktf-project.CdktfProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: string): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@rlmartin-projen/cdktf-project.CdktfProject.addBundledDeps.parameter.deps"></a>

- *Type:* string

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### ~~`addCompileCommand`~~ <a name="addCompileCommand" id="@rlmartin-projen/cdktf-project.CdktfProject.addCompileCommand"></a>

```typescript
public addCompileCommand(commands: string): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@rlmartin-projen/cdktf-project.CdktfProject.addCompileCommand.parameter.commands"></a>

- *Type:* string

---

##### `addDeps` <a name="addDeps" id="@rlmartin-projen/cdktf-project.CdktfProject.addDeps"></a>

```typescript
public addDeps(deps: string): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rlmartin-projen/cdktf-project.CdktfProject.addDeps.parameter.deps"></a>

- *Type:* string

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDevDeps` <a name="addDevDeps" id="@rlmartin-projen/cdktf-project.CdktfProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: string): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rlmartin-projen/cdktf-project.CdktfProject.addDevDeps.parameter.deps"></a>

- *Type:* string

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addFields` <a name="addFields" id="@rlmartin-projen/cdktf-project.CdktfProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@rlmartin-projen/cdktf-project.CdktfProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### `addKeywords` <a name="addKeywords" id="@rlmartin-projen/cdktf-project.CdktfProject.addKeywords"></a>

```typescript
public addKeywords(keywords: string): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@rlmartin-projen/cdktf-project.CdktfProject.addKeywords.parameter.keywords"></a>

- *Type:* string

The keywords to add.

---

##### `addPeerDeps` <a name="addPeerDeps" id="@rlmartin-projen/cdktf-project.CdktfProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: string): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@rlmartin-projen/cdktf-project.CdktfProject.addPeerDeps.parameter.deps"></a>

- *Type:* string

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addScripts` <a name="addScripts" id="@rlmartin-projen/cdktf-project.CdktfProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@rlmartin-projen/cdktf-project.CdktfProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### ~~`addTestCommand`~~ <a name="addTestCommand" id="@rlmartin-projen/cdktf-project.CdktfProject.addTestCommand"></a>

```typescript
public addTestCommand(commands: string): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@rlmartin-projen/cdktf-project.CdktfProject.addTestCommand.parameter.commands"></a>

- *Type:* string

---

##### ~~`hasScript`~~ <a name="hasScript" id="@rlmartin-projen/cdktf-project.CdktfProject.hasScript"></a>

```typescript
public hasScript(name: string): boolean
```

Indicates if a script by the name name is defined.

###### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProject.hasScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `removeScript` <a name="removeScript" id="@rlmartin-projen/cdktf-project.CdktfProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `renderWorkflowSetup` <a name="renderWorkflowSetup" id="@rlmartin-projen/cdktf-project.CdktfProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@rlmartin-projen/cdktf-project.CdktfProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### `setScript` <a name="setScript" id="@rlmartin-projen/cdktf-project.CdktfProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@rlmartin-projen/cdktf-project.CdktfProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

##### `addEmbeddedPackage` <a name="addEmbeddedPackage" id="@rlmartin-projen/cdktf-project.CdktfProject.addEmbeddedPackage"></a>

```typescript
public addEmbeddedPackage(name: string, config: EmbeddedPackage, majorVersion: number, namespaceOpt?: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProject.addEmbeddedPackage.parameter.name"></a>

- *Type:* string

---

###### `config`<sup>Required</sup> <a name="config" id="@rlmartin-projen/cdktf-project.CdktfProject.addEmbeddedPackage.parameter.config"></a>

- *Type:* <a href="#@rlmartin-projen/cdktf-project.EmbeddedPackage">EmbeddedPackage</a>

---

###### `majorVersion`<sup>Required</sup> <a name="majorVersion" id="@rlmartin-projen/cdktf-project.CdktfProject.addEmbeddedPackage.parameter.majorVersion"></a>

- *Type:* number

---

###### `namespaceOpt`<sup>Optional</sup> <a name="namespaceOpt" id="@rlmartin-projen/cdktf-project.CdktfProject.addEmbeddedPackage.parameter.namespaceOpt"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@rlmartin-projen/cdktf-project.CdktfProject.isConstruct"></a>

```typescript
import { CdktfProject } from '@rlmartin-projen/cdktf-project'

CdktfProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@rlmartin-projen/cdktf-project.CdktfProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@rlmartin-projen/cdktf-project.CdktfProject.isProject"></a>

```typescript
import { CdktfProject } from '@rlmartin-projen/cdktf-project'

CdktfProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@rlmartin-projen/cdktf-project.CdktfProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@rlmartin-projen/cdktf-project.CdktfProject.of"></a>

```typescript
import { CdktfProject } from '@rlmartin-projen/cdktf-project'

CdktfProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@rlmartin-projen/cdktf-project.CdktfProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.entrypoint">entrypoint</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.manifest">manifest</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The package manager to use. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version required by this package. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | Minimum node.js version required by this package. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.publisher">publisher</a></code> | <code>projen.release.Publisher</code> | Package publisher. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.libdir">libdir</a></code> | <code>string</code> | The directory in which compiled .js files reside. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.srcdir">srcdir</a></code> | <code>string</code> | The directory in which the .ts sources reside. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.testdir">testdir</a></code> | <code>string</code> | The directory in which tests reside. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfig</code> | A typescript configuration file which covers all files (sources, tests, projen). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.watchTask">watchTask</a></code> | <code>projen.Task</code> | The "watch" task. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.docgen">docgen</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.eslint">eslint</a></code> | <code>projen.javascript.Eslint</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.tsconfigEslint">tsconfigEslint</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@rlmartin-projen/cdktf-project.CdktfProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@rlmartin-projen/cdktf-project.CdktfProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@rlmartin-projen/cdktf-project.CdktfProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@rlmartin-projen/cdktf-project.CdktfProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@rlmartin-projen/cdktf-project.CdktfProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@rlmartin-projen/cdktf-project.CdktfProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@rlmartin-projen/cdktf-project.CdktfProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@rlmartin-projen/cdktf-project.CdktfProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@rlmartin-projen/cdktf-project.CdktfProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@rlmartin-projen/cdktf-project.CdktfProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@rlmartin-projen/cdktf-project.CdktfProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@rlmartin-projen/cdktf-project.CdktfProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@rlmartin-projen/cdktf-project.CdktfProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@rlmartin-projen/cdktf-project.CdktfProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@rlmartin-projen/cdktf-project.CdktfProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="@rlmartin-projen/cdktf-project.CdktfProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rlmartin-projen/cdktf-project.CdktfProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `projectType`<sup>Required</sup> <a name="projectType" id="@rlmartin-projen/cdktf-project.CdktfProject.property.projectType"></a>

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@rlmartin-projen/cdktf-project.CdktfProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rlmartin-projen/cdktf-project.CdktfProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@rlmartin-projen/cdktf-project.CdktfProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rlmartin-projen/cdktf-project.CdktfProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rlmartin-projen/cdktf-project.CdktfProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### ~~`allowLibraryDependencies`~~<sup>Required</sup> <a name="allowLibraryDependencies" id="@rlmartin-projen/cdktf-project.CdktfProject.property.allowLibraryDependencies"></a>

- *Deprecated:* use `package.allowLibraryDependencies`

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="@rlmartin-projen/cdktf-project.CdktfProject.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### `artifactsJavascriptDirectory`<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@rlmartin-projen/cdktf-project.CdktfProject.property.artifactsJavascriptDirectory"></a>

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### `bundler`<sup>Required</sup> <a name="bundler" id="@rlmartin-projen/cdktf-project.CdktfProject.property.bundler"></a>

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### ~~`entrypoint`~~<sup>Required</sup> <a name="entrypoint" id="@rlmartin-projen/cdktf-project.CdktfProject.property.entrypoint"></a>

- *Deprecated:* use `package.entrypoint`

```typescript
public readonly entrypoint: string;
```

- *Type:* string

---

##### ~~`manifest`~~<sup>Required</sup> <a name="manifest" id="@rlmartin-projen/cdktf-project.CdktfProject.property.manifest"></a>

- *Deprecated:* use `package.addField(x, y)`

```typescript
public readonly manifest: any;
```

- *Type:* any

---

##### `npmrc`<sup>Required</sup> <a name="npmrc" id="@rlmartin-projen/cdktf-project.CdktfProject.property.npmrc"></a>

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### `package`<sup>Required</sup> <a name="package" id="@rlmartin-projen/cdktf-project.CdktfProject.property.package"></a>

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### ~~`packageManager`~~<sup>Required</sup> <a name="packageManager" id="@rlmartin-projen/cdktf-project.CdktfProject.property.packageManager"></a>

- *Deprecated:* use `package.packageManager`

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager

The package manager to use.

---

##### `runScriptCommand`<sup>Required</sup> <a name="runScriptCommand" id="@rlmartin-projen/cdktf-project.CdktfProject.property.runScriptCommand"></a>

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rlmartin-projen/cdktf-project.CdktfProject.property.autoMerge"></a>

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rlmartin-projen/cdktf-project.CdktfProject.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### `buildWorkflowJobId`<sup>Optional</sup> <a name="buildWorkflowJobId" id="@rlmartin-projen/cdktf-project.CdktfProject.property.buildWorkflowJobId"></a>

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rlmartin-projen/cdktf-project.CdktfProject.property.jest"></a>

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rlmartin-projen/cdktf-project.CdktfProject.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version required by this package.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rlmartin-projen/cdktf-project.CdktfProject.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

Minimum node.js version required by this package.

---

##### `npmignore`<sup>Optional</sup> <a name="npmignore" id="@rlmartin-projen/cdktf-project.CdktfProject.property.npmignore"></a>

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rlmartin-projen/cdktf-project.CdktfProject.property.prettier"></a>

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### ~~`publisher`~~<sup>Optional</sup> <a name="publisher" id="@rlmartin-projen/cdktf-project.CdktfProject.property.publisher"></a>

- *Deprecated:* use `release.publisher`.

```typescript
public readonly publisher: Publisher;
```

- *Type:* projen.release.Publisher

Package publisher.

This will be `undefined` if the project does not have a
release workflow.

---

##### `release`<sup>Optional</sup> <a name="release" id="@rlmartin-projen/cdktf-project.CdktfProject.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### `upgradeWorkflow`<sup>Optional</sup> <a name="upgradeWorkflow" id="@rlmartin-projen/cdktf-project.CdktfProject.property.upgradeWorkflow"></a>

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

##### `docsDirectory`<sup>Required</sup> <a name="docsDirectory" id="@rlmartin-projen/cdktf-project.CdktfProject.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string

---

##### `libdir`<sup>Required</sup> <a name="libdir" id="@rlmartin-projen/cdktf-project.CdktfProject.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string

The directory in which compiled .js files reside.

---

##### `srcdir`<sup>Required</sup> <a name="srcdir" id="@rlmartin-projen/cdktf-project.CdktfProject.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string

The directory in which the .ts sources reside.

---

##### `testdir`<sup>Required</sup> <a name="testdir" id="@rlmartin-projen/cdktf-project.CdktfProject.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string

The directory in which tests reside.

---

##### `tsconfigDev`<sup>Required</sup> <a name="tsconfigDev" id="@rlmartin-projen/cdktf-project.CdktfProject.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

A typescript configuration file which covers all files (sources, tests, projen).

---

##### `watchTask`<sup>Required</sup> <a name="watchTask" id="@rlmartin-projen/cdktf-project.CdktfProject.property.watchTask"></a>

```typescript
public readonly watchTask: Task;
```

- *Type:* projen.Task

The "watch" task.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rlmartin-projen/cdktf-project.CdktfProject.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rlmartin-projen/cdktf-project.CdktfProject.property.eslint"></a>

```typescript
public readonly eslint: Eslint;
```

- *Type:* projen.javascript.Eslint

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rlmartin-projen/cdktf-project.CdktfProject.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `tsconfigEslint`<sup>Optional</sup> <a name="tsconfigEslint" id="@rlmartin-projen/cdktf-project.CdktfProject.property.tsconfigEslint"></a>

```typescript
public readonly tsconfigEslint: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN">DEFAULT_TS_JEST_TRANFORM_PATTERN</a></code> | <code>string</code> | *No description.* |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@rlmartin-projen/cdktf-project.CdktfProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

##### `DEFAULT_TS_JEST_TRANFORM_PATTERN`<sup>Required</sup> <a name="DEFAULT_TS_JEST_TRANFORM_PATTERN" id="@rlmartin-projen/cdktf-project.CdktfProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN"></a>

```typescript
public readonly DEFAULT_TS_JEST_TRANFORM_PATTERN: string;
```

- *Type:* string

---

## Structs <a name="Structs" id="Structs"></a>

### CdktfProjectOptions <a name="CdktfProjectOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.Initializer"></a>

```typescript
import { CdktfProjectOptions } from '@rlmartin-projen/cdktf-project'

const cdktfProjectOptions: CdktfProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for mergify. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | Which type of project this is (library/app). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorOrganization">authorOrganization</a></code> | <code>boolean</code> | Is the author an organization. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorUrl">authorUrl</a></code> | <code>string</code> | Author's URL / Website. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoDetectBin">autoDetectBin</a></code> | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bin">bin</a></code> | <code>{[ key: string ]: string}</code> | Binary programs vended with your module. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bugsEmail">bugsEmail</a></code> | <code>string</code> | The email address to which issues should be reported. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bugsUrl">bugsUrl</a></code> | <code>string</code> | The url to your project's issue tracker. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bundledDeps">bundledDeps</a></code> | <code>string[]</code> | List of dependencies to bundle into this module. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code>projen.javascript.CodeArtifactOptions</code> | Options for npm packages using AWS CodeArtifact. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | Runtime dependencies of this module. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.description">description</a></code> | <code>string</code> | The description is just a string that helps people understand the purpose of the package. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | Build dependencies for this module. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.entrypoint">entrypoint</a></code> | <code>string</code> | Module entrypoint (`main` in `package.json`). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.homepage">homepage</a></code> | <code>string</code> | Package's Homepage / Website. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords to include in `package.json`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.license">license</a></code> | <code>string</code> | License's SPDX identifier. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.licensed">licensed</a></code> | <code>boolean</code> | Indicates if a license should be added. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Minimum node.js version to require via `engines` (inclusive). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | Minimum Node.js version to require via package.json `engines` (inclusive). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmAccess">npmAccess</a></code> | <code>projen.javascript.NpmAccess</code> | Access level of the npm package. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when the package is published. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmRegistry">npmRegistry</a></code> | <code>string</code> | The host name of the npm registry to publish to. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmRegistryUrl">npmRegistryUrl</a></code> | <code>string</code> | The base URL of the npm package registry. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The Node Package Manager used to execute scripts. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.packageName">packageName</a></code> | <code>string</code> | The "name" in package.json. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.peerDependencyOptions">peerDependencyOptions</a></code> | <code>projen.javascript.PeerDependencyOptions</code> | Options for `peerDeps`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.peerDeps">peerDeps</a></code> | <code>string[]</code> | Peer dependencies for this module. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.pnpmVersion">pnpmVersion</a></code> | <code>string</code> | The version of PNPM to use if using PNPM as a package manager. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.repository">repository</a></code> | <code>string</code> | The repository is the location where the actual code for your package lives. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.repositoryDirectory">repositoryDirectory</a></code> | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.scopedPackagesOptions">scopedPackagesOptions</a></code> | <code>projen.javascript.ScopedPackagesOptions[]</code> | Options for privately hosted scoped packages. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.scripts">scripts</a></code> | <code>{[ key: string ]: string}</code> | npm scripts to include. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.stability">stability</a></code> | <code>string</code> | Package's Stability. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.yarnBerryOptions">yarnBerryOptions</a></code> | <code>projen.javascript.YarnBerryOptions</code> | Options for Yarn Berry. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: projen.release.BranchOptions}</code> | Defines additional release branches. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseEveryCommit">releaseEveryCommit</a></code> | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseSchedule">releaseSchedule</a></code> | <code>string</code> | CRON schedule to trigger new releases. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseTrigger">releaseTrigger</a></code> | <code>projen.release.ReleaseTrigger</code> | The release trigger to use. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with standard-version package. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.defaultReleaseBranch">defaultReleaseBranch</a></code> | <code>string</code> | The name of the main release branch. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | A directory which will contain build artifacts. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoApproveUpgrades">autoApproveUpgrades</a></code> | <code>boolean</code> | Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configued). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.buildWorkflow">buildWorkflow</a></code> | <code>boolean</code> | Define a GitHub workflow for building PRs. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.buildWorkflowTriggers">buildWorkflowTriggers</a></code> | <code>projen.github.workflows.Triggers</code> | Build workflow triggers. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bundlerOptions">bundlerOptions</a></code> | <code>projen.javascript.BundlerOptions</code> | Options for `Bundler`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.checkLicenses">checkLicenses</a></code> | <code>projen.javascript.LicenseCheckerOptions</code> | Configure which licenses should be deemed acceptable for use by dependencies. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.codeCov">codeCov</a></code> | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v3 A secret is required for private repos. Configured with `@codeCovTokenSecret`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.codeCovTokenSecret">codeCovTokenSecret</a></code> | <code>string</code> | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.copyrightOwner">copyrightOwner</a></code> | <code>string</code> | License copyright owner. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.copyrightPeriod">copyrightPeriod</a></code> | <code>string</code> | The copyright years to put in the LICENSE file. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.dependabot">dependabot</a></code> | <code>boolean</code> | Use dependabot to handle dependency upgrades. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.dependabotOptions">dependabotOptions</a></code> | <code>projen.github.DependabotOptions</code> | Options for dependabot. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.depsUpgrade">depsUpgrade</a></code> | <code>boolean</code> | Use tasks and github workflows to handle dependency upgrades. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.depsUpgradeOptions">depsUpgradeOptions</a></code> | <code>projen.javascript.UpgradeDependenciesOptions</code> | Options for `UpgradeDependencies`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitignore">gitignore</a></code> | <code>string[]</code> | Additional entries to .gitignore. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.jest">jest</a></code> | <code>boolean</code> | Setup jest unit tests. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.jestOptions">jestOptions</a></code> | <code>projen.javascript.JestOptions</code> | Jest options. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.mutableBuild">mutableBuild</a></code> | <code>boolean</code> | Automatically update files modified during builds to pull-request branches. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmignore">npmignore</a></code> | <code>string[]</code> | Additional entries to .npmignore. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmignoreEnabled">npmignoreEnabled</a></code> | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmIgnoreOptions">npmIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .npmignore file. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.package">package</a></code> | <code>boolean</code> | Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.prettier">prettier</a></code> | <code>boolean</code> | Setup prettier. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.prettierOptions">prettierOptions</a></code> | <code>projen.javascript.PrettierOptions</code> | Prettier options. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenDevDependency">projenDevDependency</a></code> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJs">projenrcJs</a></code> | <code>boolean</code> | Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJsOptions">projenrcJsOptions</a></code> | <code>projen.javascript.ProjenrcOptions</code> | Options for .projenrc.js. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | Version of projen to install. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.pullRequestTemplate">pullRequestTemplate</a></code> | <code>boolean</code> | Include a GitHub pull request template. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.pullRequestTemplateContents">pullRequestTemplateContents</a></code> | <code>string[]</code> | The contents of the pull request template. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.release">release</a></code> | <code>boolean</code> | Add release management to this project. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseToNpm">releaseToNpm</a></code> | <code>boolean</code> | Automatically release to npm when new versions are introduced. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseWorkflow">releaseWorkflow</a></code> | <code>boolean</code> | DEPRECATED: renamed to `release`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowBootstrapSteps">workflowBootstrapSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Workflow steps to use in order to bootstrap this repo. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowGitIdentity">workflowGitIdentity</a></code> | <code>projen.github.GitIdentity</code> | The git identity to use in workflows. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | The node version to use in GitHub workflows. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowPackageCache">workflowPackageCache</a></code> | <code>boolean</code> | Enable Node.js package cache in GitHub workflows. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.disableTsconfig">disableTsconfig</a></code> | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.disableTsconfigDev">disableTsconfigDev</a></code> | <code>boolean</code> | Do not generate a `tsconfig.dev.json` file. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.docgen">docgen</a></code> | <code>boolean</code> | Docgen by Typedoc. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | Docs directory. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.entrypointTypes">entrypointTypes</a></code> | <code>string</code> | The .d.ts file that includes the type declarations for this module. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.eslint">eslint</a></code> | <code>boolean</code> | Setup eslint. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.eslintOptions">eslintOptions</a></code> | <code>projen.javascript.EslintOptions</code> | Eslint options. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.libdir">libdir</a></code> | <code>string</code> | Typescript  artifacts output directory. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcTs">projenrcTs</a></code> | <code>boolean</code> | Use TypeScript for your projenrc file (`.projenrc.ts`). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcTsOptions">projenrcTsOptions</a></code> | <code>projen.typescript.ProjenrcOptions</code> | Options for .projenrc.ts. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.sampleCode">sampleCode</a></code> | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.srcdir">srcdir</a></code> | <code>string</code> | Typescript sources directory. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.testdir">testdir</a></code> | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom TSConfig. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom tsconfig options for the development tsconfig.json file (used for testing). |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsconfigDevFile">tsconfigDevFile</a></code> | <code>string</code> | The name of the development tsconfig.json file. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsJestOptions">tsJestOptions</a></code> | <code>projen.typescript.TsJestOptions</code> | Options for ts-jest. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.typescriptVersion">typescriptVersion</a></code> | <code>string</code> | TypeScript version to use. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.artifactsFolder">artifactsFolder</a></code> | <code>string</code> | Configurable folder for artifacts to package when transitioning from plan to apply. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.deploymentEnvironments">deploymentEnvironments</a></code> | <code>{[ key: string ]: <a href="#@rlmartin-projen/cdktf-project.DeploymentEnvironment">DeploymentEnvironment</a>}</code> | Add GitHub Wokflows for enabled environments. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.embeddedNamespace">embeddedNamespace</a></code> | <code>string</code> | Used to scope the embedded packages to avoid naming collisions. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.embeddedPackages">embeddedPackages</a></code> | <code>{[ key: string ]: <a href="#@rlmartin-projen/cdktf-project.EmbeddedPackage">EmbeddedPackage</a>}</code> | Small functions to be deployed with the other resources in the repo. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.nodeScripts">nodeScripts</a></code> | <code>{[ key: string ]: string}</code> | A set of scripts to be added to package.json but not wrapped by projen. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.nodeVersion">nodeVersion</a></code> | <code>number</code> | The Node.js version to use when building. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmrc">npmrc</a></code> | <code>string[]</code> | Raw lines to drop into the workflow's .npmrc file, to access private package. Empty implies no .npmrc required. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.repoAdmins">repoAdmins</a></code> | <code>{[ key: string ]: number}</code> | The GitHub Team slug (including the org_name/ prefix) or GitHub username for the teams/people who maintain infrastructure. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformBackend">terraformBackend</a></code> | <code><a href="#@rlmartin-projen/cdktf-project.TerraformBackend">TerraformBackend</a></code> | Terraform backend configuration. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformManualWorkflow">terraformManualWorkflow</a></code> | <code>boolean</code> | Set this to turn on a GitHub workflow that can be used to run manual Terraform commands within the environment. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformModules">terraformModules</a></code> | <code><a href="#@rlmartin-projen/cdktf-project.TerraformModuleOptions">TerraformModuleOptions</a>[]</code> | Terraform Modules to add to cdktf.json. These are assumed to be internal to the Medly GitHub org. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformModulesSsh">terraformModulesSsh</a></code> | <code>boolean</code> | Set this to true for local dev when using SSH to connect to GitHub. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformProviders">terraformProviders</a></code> | <code>string[]</code> | Terraform Providers to add to cdktf.json. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformVars">terraformVars</a></code> | <code>string[]</code> | List of Terraform variables to pull from GitHub secrets and set as TF_VAR_ environment variables during terraform plan. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformVersion">terraformVersion</a></code> | <code>string</code> | The Terraform version to use in the build pipelines. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowEnvVars">workflowEnvVars</a></code> | <code><a href="#@rlmartin-projen/cdktf-project.EnvVars">EnvVars</a></code> | Optional list of env vars to load from GitHub Secrets/Variables into workflow-level env variables. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowInputs">workflowInputs</a></code> | <code>{[ key: string ]: <a href="#@rlmartin-projen/cdktf-project.WorkflowInputOptions">WorkflowInputOptions</a>}</code> | Optional inputs (map of name => options) to inject into the workflow_dispatch. |
| <code><a href="#@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowSteps">workflowSteps</a></code> | <code><a href="#@rlmartin-projen/cdktf-project.WorkflowSteps">WorkflowSteps</a></code> | Optional steps to include in the GitHub workflow. |

---

##### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="github" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="mergify" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="mergifyOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.mergifyOptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projectType" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projectType"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenTokenSecret"></a>

- *Deprecated:* use `projenCredentials`

```typescript
public readonly projenTokenSecret: string;
```

- *Type:* string
- *Default:* "PROJEN_GITHUB_TOKEN"

The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.

This token needs to have the `repo`, `workflows`
and `packages` scope.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.readme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

*Example*

```typescript
"{ filename: 'readme.md', contents: '# title' }"
```


##### `stale`<sup>Optional</sup> <a name="stale" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `allowLibraryDependencies`<sup>Optional</sup> <a name="allowLibraryDependencies" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.allowLibraryDependencies"></a>

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean
- *Default:* true

Allow the project to include `peerDependencies` and `bundledDependencies`.

This is normally only allowed for libraries. For apps, there's no meaning
for specifying these.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Author's e-mail.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Author's name.

---

##### `authorOrganization`<sup>Optional</sup> <a name="authorOrganization" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorOrganization"></a>

```typescript
public readonly authorOrganization: boolean;
```

- *Type:* boolean

Is the author an organization.

---

##### `authorUrl`<sup>Optional</sup> <a name="authorUrl" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.authorUrl"></a>

```typescript
public readonly authorUrl: string;
```

- *Type:* string

Author's URL / Website.

---

##### `autoDetectBin`<sup>Optional</sup> <a name="autoDetectBin" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoDetectBin"></a>

```typescript
public readonly autoDetectBin: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.

---

##### `bin`<sup>Optional</sup> <a name="bin" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bin"></a>

```typescript
public readonly bin: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Binary programs vended with your module.

You can use this option to add/customize how binaries are represented in
your `package.json`, but unless `autoDetectBin` is `false`, every
executable file under `bin` will automatically be added to this section.

---

##### `bugsEmail`<sup>Optional</sup> <a name="bugsEmail" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bugsEmail"></a>

```typescript
public readonly bugsEmail: string;
```

- *Type:* string

The email address to which issues should be reported.

---

##### `bugsUrl`<sup>Optional</sup> <a name="bugsUrl" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bugsUrl"></a>

```typescript
public readonly bugsUrl: string;
```

- *Type:* string

The url to your project's issue tracker.

---

##### `bundledDeps`<sup>Optional</sup> <a name="bundledDeps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bundledDeps"></a>

```typescript
public readonly bundledDeps: string[];
```

- *Type:* string[]

List of dependencies to bundle into this module.

These modules will be
added both to the `dependencies` section and `bundledDependencies` section of
your `package.json`.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="codeArtifactOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.codeArtifactOptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* projen.javascript.CodeArtifactOptions
- *Default:* undefined

Options for npm packages using AWS CodeArtifact.

This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact

---

##### `deps`<sup>Optional</sup> <a name="deps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

Runtime dependencies of this module.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

*Example*

```typescript
[ 'express', 'lodash', 'foo@^2' ]
```


##### `description`<sup>Optional</sup> <a name="description" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description is just a string that helps people understand the purpose of the package.

It can be used when searching for packages in a package manager as well.
See https://classic.yarnpkg.com/en/docs/package-json/#toc-description

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

Build dependencies for this module.

These dependencies will only be
available in your build environment but will not be fetched when this
module is consumed.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

*Example*

```typescript
[ 'typescript', '@types/express' ]
```


##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string
- *Default:* "lib/index.js"

Module entrypoint (`main` in `package.json`).

Set to an empty string to not include `main` in your package.json

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Package's Homepage / Website.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords to include in `package.json`.

---

##### `license`<sup>Optional</sup> <a name="license" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string
- *Default:* "Apache-2.0"

License's SPDX identifier.

See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
Use the `licensed` option if you want to no license to be specified.

---

##### `licensed`<sup>Optional</sup> <a name="licensed" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.licensed"></a>

```typescript
public readonly licensed: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates if a license should be added.

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string
- *Default:* no max

Minimum node.js version to require via `engines` (inclusive).

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string
- *Default:* no "engines" specified

Minimum Node.js version to require via package.json `engines` (inclusive).

---

##### `npmAccess`<sup>Optional</sup> <a name="npmAccess" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmAccess"></a>

```typescript
public readonly npmAccess: NpmAccess;
```

- *Type:* projen.javascript.NpmAccess
- *Default:* for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.

Access level of the npm package.

---

##### `npmProvenance`<sup>Optional</sup> <a name="npmProvenance" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmProvenance"></a>

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* true for public packages, false otherwise

Should provenance statements be generated when the package is published.

A supported package manager is required to publish a package with npm provenance statements and
you will need to use a supported CI/CD provider.

Note that the projen `Release` and `Publisher` components are using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

> [https://docs.npmjs.com/generating-provenance-statements](https://docs.npmjs.com/generating-provenance-statements)

---

##### ~~`npmRegistry`~~<sup>Optional</sup> <a name="npmRegistry" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmRegistry"></a>

- *Deprecated:* use `npmRegistryUrl` instead

```typescript
public readonly npmRegistry: string;
```

- *Type:* string

The host name of the npm registry to publish to.

Cannot be set together with `npmRegistryUrl`.

---

##### `npmRegistryUrl`<sup>Optional</sup> <a name="npmRegistryUrl" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmRegistryUrl"></a>

```typescript
public readonly npmRegistryUrl: string;
```

- *Type:* string
- *Default:* "https://registry.npmjs.org"

The base URL of the npm package registry.

Must be a URL (e.g. start with "https://" or "http://")

---

##### `npmTokenSecret`<sup>Optional</sup> <a name="npmTokenSecret" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmTokenSecret"></a>

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN"

GitHub secret which contains the NPM token to use when publishing packages.

---

##### `packageManager`<sup>Optional</sup> <a name="packageManager" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.packageManager"></a>

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager
- *Default:* NodePackageManager.YARN_CLASSIC

The Node Package Manager used to execute scripts.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string
- *Default:* defaults to project name

The "name" in package.json.

---

##### `peerDependencyOptions`<sup>Optional</sup> <a name="peerDependencyOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.peerDependencyOptions"></a>

```typescript
public readonly peerDependencyOptions: PeerDependencyOptions;
```

- *Type:* projen.javascript.PeerDependencyOptions

Options for `peerDeps`.

---

##### `peerDeps`<sup>Optional</sup> <a name="peerDeps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.peerDeps"></a>

```typescript
public readonly peerDeps: string[];
```

- *Type:* string[]
- *Default:* []

Peer dependencies for this module.

Dependencies listed here are required to
be installed (and satisfied) by the _consumer_ of this library. Using peer
dependencies allows you to ensure that only a single module of a certain
library exists in the `node_modules` tree of your consumers.

Note that prior to npm@7, peer dependencies are _not_ automatically
installed, which means that adding peer dependencies to a library will be a
breaking change for your customers.

Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
enabled by default), projen will automatically add a dev dependency with a
pinned version for each peer dependency. This will ensure that you build &
test your module against the lowest peer version required.

---

##### `pnpmVersion`<sup>Optional</sup> <a name="pnpmVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.pnpmVersion"></a>

```typescript
public readonly pnpmVersion: string;
```

- *Type:* string
- *Default:* "7"

The version of PNPM to use if using PNPM as a package manager.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

The repository is the location where the actual code for your package lives.

See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository

---

##### `repositoryDirectory`<sup>Optional</sup> <a name="repositoryDirectory" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.repositoryDirectory"></a>

```typescript
public readonly repositoryDirectory: string;
```

- *Type:* string

If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.

---

##### `scopedPackagesOptions`<sup>Optional</sup> <a name="scopedPackagesOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.scopedPackagesOptions"></a>

```typescript
public readonly scopedPackagesOptions: ScopedPackagesOptions[];
```

- *Type:* projen.javascript.ScopedPackagesOptions[]
- *Default:* fetch all scoped packages from the public npm registry

Options for privately hosted scoped packages.

---

##### ~~`scripts`~~<sup>Optional</sup> <a name="scripts" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.scripts"></a>

- *Deprecated:* use `project.addTask()` or `package.setScript()`

```typescript
public readonly scripts: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

npm scripts to include.

If a script has the same name as a standard script,
the standard script will be overwritten.
Also adds the script as a task.

---

##### `stability`<sup>Optional</sup> <a name="stability" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.stability"></a>

```typescript
public readonly stability: string;
```

- *Type:* string

Package's Stability.

---

##### `yarnBerryOptions`<sup>Optional</sup> <a name="yarnBerryOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.yarnBerryOptions"></a>

```typescript
public readonly yarnBerryOptions: YarnBerryOptions;
```

- *Type:* projen.javascript.YarnBerryOptions
- *Default:* Yarn Berry v4 with all default options

Options for Yarn Berry.

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="jsiiReleaseVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.jsiiReleaseVersion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `publishDryRun`<sup>Optional</sup> <a name="publishDryRun" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.publishDryRun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `releasableCommits`<sup>Optional</sup> <a name="releasableCommits" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releasableCommits"></a>

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### `releaseBranches`<sup>Optional</sup> <a name="releaseBranches" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseBranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: projen.release.BranchOptions}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### ~~`releaseEveryCommit`~~<sup>Optional</sup> <a name="releaseEveryCommit" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseEveryCommit"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.continuous()` instead

```typescript
public readonly releaseEveryCommit: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically release new versions every commit to one of branches in `releaseBranches`.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="releaseFailureIssue" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseFailureIssue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseFailureIssueLabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### ~~`releaseSchedule`~~<sup>Optional</sup> <a name="releaseSchedule" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseSchedule"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.scheduled()` instead

```typescript
public readonly releaseSchedule: string;
```

- *Type:* string
- *Default:* no scheduled releases

CRON schedule to trigger new releases.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="releaseTagPrefix" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseTagPrefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="releaseTrigger" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseTrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* projen.release.ReleaseTrigger
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="releaseWorkflowName" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseWorkflowName"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseWorkflowSetupSteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `versionrcOptions`<sup>Optional</sup> <a name="versionrcOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.versionrcOptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with standard-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

##### `defaultReleaseBranch`<sup>Required</sup> <a name="defaultReleaseBranch" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.defaultReleaseBranch"></a>

```typescript
public readonly defaultReleaseBranch: string;
```

- *Type:* string
- *Default:* "main"

The name of the main release branch.

---

##### `artifactsDirectory`<sup>Optional</sup> <a name="artifactsDirectory" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### `autoApproveUpgrades`<sup>Optional</sup> <a name="autoApproveUpgrades" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.autoApproveUpgrades"></a>

```typescript
public readonly autoApproveUpgrades: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configued).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Define a GitHub workflow for building PRs.

---

##### `buildWorkflowTriggers`<sup>Optional</sup> <a name="buildWorkflowTriggers" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.buildWorkflowTriggers"></a>

```typescript
public readonly buildWorkflowTriggers: Triggers;
```

- *Type:* projen.github.workflows.Triggers
- *Default:* "{ pullRequest: {}, workflowDispatch: {} }"

Build workflow triggers.

---

##### `bundlerOptions`<sup>Optional</sup> <a name="bundlerOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.bundlerOptions"></a>

```typescript
public readonly bundlerOptions: BundlerOptions;
```

- *Type:* projen.javascript.BundlerOptions

Options for `Bundler`.

---

##### `checkLicenses`<sup>Optional</sup> <a name="checkLicenses" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.checkLicenses"></a>

```typescript
public readonly checkLicenses: LicenseCheckerOptions;
```

- *Type:* projen.javascript.LicenseCheckerOptions
- *Default:* no license checks are run during the build and all licenses will be accepted

Configure which licenses should be deemed acceptable for use by dependencies.

This setting will cause the build to fail, if any prohibited or not allowed licenses ares encountered.

---

##### `codeCov`<sup>Optional</sup> <a name="codeCov" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.codeCov"></a>

```typescript
public readonly codeCov: boolean;
```

- *Type:* boolean
- *Default:* false

Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v3 A secret is required for private repos. Configured with `@codeCovTokenSecret`.

---

##### `codeCovTokenSecret`<sup>Optional</sup> <a name="codeCovTokenSecret" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.codeCovTokenSecret"></a>

```typescript
public readonly codeCovTokenSecret: string;
```

- *Type:* string
- *Default:* if this option is not specified, only public repositories are supported

Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.

---

##### `copyrightOwner`<sup>Optional</sup> <a name="copyrightOwner" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.copyrightOwner"></a>

```typescript
public readonly copyrightOwner: string;
```

- *Type:* string
- *Default:* defaults to the value of authorName or "" if `authorName` is undefined.

License copyright owner.

---

##### `copyrightPeriod`<sup>Optional</sup> <a name="copyrightPeriod" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.copyrightPeriod"></a>

```typescript
public readonly copyrightPeriod: string;
```

- *Type:* string
- *Default:* current year

The copyright years to put in the LICENSE file.

---

##### `dependabot`<sup>Optional</sup> <a name="dependabot" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.dependabot"></a>

```typescript
public readonly dependabot: boolean;
```

- *Type:* boolean
- *Default:* false

Use dependabot to handle dependency upgrades.

Cannot be used in conjunction with `depsUpgrade`.

---

##### `dependabotOptions`<sup>Optional</sup> <a name="dependabotOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.dependabotOptions"></a>

```typescript
public readonly dependabotOptions: DependabotOptions;
```

- *Type:* projen.github.DependabotOptions
- *Default:* default options

Options for dependabot.

---

##### `depsUpgrade`<sup>Optional</sup> <a name="depsUpgrade" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.depsUpgrade"></a>

```typescript
public readonly depsUpgrade: boolean;
```

- *Type:* boolean
- *Default:* true

Use tasks and github workflows to handle dependency upgrades.

Cannot be used in conjunction with `dependabot`.

---

##### `depsUpgradeOptions`<sup>Optional</sup> <a name="depsUpgradeOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.depsUpgradeOptions"></a>

```typescript
public readonly depsUpgradeOptions: UpgradeDependenciesOptions;
```

- *Type:* projen.javascript.UpgradeDependenciesOptions
- *Default:* default options

Options for `UpgradeDependencies`.

---

##### `gitignore`<sup>Optional</sup> <a name="gitignore" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.gitignore"></a>

```typescript
public readonly gitignore: string[];
```

- *Type:* string[]

Additional entries to .gitignore.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.jest"></a>

```typescript
public readonly jest: boolean;
```

- *Type:* boolean
- *Default:* true

Setup jest unit tests.

---

##### `jestOptions`<sup>Optional</sup> <a name="jestOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.jestOptions"></a>

```typescript
public readonly jestOptions: JestOptions;
```

- *Type:* projen.javascript.JestOptions
- *Default:* default options

Jest options.

---

##### `mutableBuild`<sup>Optional</sup> <a name="mutableBuild" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.mutableBuild"></a>

```typescript
public readonly mutableBuild: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically update files modified during builds to pull-request branches.

This means
that any files synthesized by projen or e.g. test snapshots will always be up-to-date
before a PR is merged.

Implies that PR builds do not have anti-tamper checks.

---

##### ~~`npmignore`~~<sup>Optional</sup> <a name="npmignore" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmignore"></a>

- *Deprecated:* - use `project.addPackageIgnore`

```typescript
public readonly npmignore: string[];
```

- *Type:* string[]

Additional entries to .npmignore.

---

##### `npmignoreEnabled`<sup>Optional</sup> <a name="npmignoreEnabled" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmignoreEnabled"></a>

```typescript
public readonly npmignoreEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.

---

##### `npmIgnoreOptions`<sup>Optional</sup> <a name="npmIgnoreOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmIgnoreOptions"></a>

```typescript
public readonly npmIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .npmignore file.

---

##### `package`<sup>Optional</sup> <a name="package" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean
- *Default:* true

Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.prettier"></a>

```typescript
public readonly prettier: boolean;
```

- *Type:* boolean
- *Default:* false

Setup prettier.

---

##### `prettierOptions`<sup>Optional</sup> <a name="prettierOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.prettierOptions"></a>

```typescript
public readonly prettierOptions: PrettierOptions;
```

- *Type:* projen.javascript.PrettierOptions
- *Default:* default options

Prettier options.

---

##### `projenDevDependency`<sup>Optional</sup> <a name="projenDevDependency" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenDevDependency"></a>

```typescript
public readonly projenDevDependency: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates of "projen" should be installed as a devDependency.

---

##### `projenrcJs`<sup>Optional</sup> <a name="projenrcJs" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJs"></a>

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* boolean
- *Default:* true if projenrcJson is false

Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="projenrcJsOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcJsOptions"></a>

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* projen.javascript.ProjenrcOptions
- *Default:* default options

Options for .projenrc.js.

---

##### `projenVersion`<sup>Optional</sup> <a name="projenVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenVersion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* Defaults to the latest version.

Version of projen to install.

---

##### `pullRequestTemplate`<sup>Optional</sup> <a name="pullRequestTemplate" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.pullRequestTemplate"></a>

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* boolean
- *Default:* true

Include a GitHub pull request template.

---

##### `pullRequestTemplateContents`<sup>Optional</sup> <a name="pullRequestTemplateContents" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.pullRequestTemplateContents"></a>

```typescript
public readonly pullRequestTemplateContents: string[];
```

- *Type:* string[]
- *Default:* default content

The contents of the pull request template.

---

##### `release`<sup>Optional</sup> <a name="release" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.release"></a>

```typescript
public readonly release: boolean;
```

- *Type:* boolean
- *Default:* true (false for subprojects)

Add release management to this project.

---

##### `releaseToNpm`<sup>Optional</sup> <a name="releaseToNpm" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseToNpm"></a>

```typescript
public readonly releaseToNpm: boolean;
```

- *Type:* boolean
- *Default:* false

Automatically release to npm when new versions are introduced.

---

##### ~~`releaseWorkflow`~~<sup>Optional</sup> <a name="releaseWorkflow" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.releaseWorkflow"></a>

- *Deprecated:* see `release`.

```typescript
public readonly releaseWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

DEPRECATED: renamed to `release`.

---

##### `workflowBootstrapSteps`<sup>Optional</sup> <a name="workflowBootstrapSteps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowBootstrapSteps"></a>

```typescript
public readonly workflowBootstrapSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* "yarn install --frozen-lockfile && yarn projen"

Workflow steps to use in order to bootstrap this repo.

---

##### `workflowGitIdentity`<sup>Optional</sup> <a name="workflowGitIdentity" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowGitIdentity"></a>

```typescript
public readonly workflowGitIdentity: GitIdentity;
```

- *Type:* projen.github.GitIdentity
- *Default:* GitHub Actions

The git identity to use in workflows.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="workflowNodeVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowNodeVersion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* same as `minNodeVersion`

The node version to use in GitHub workflows.

---

##### `workflowPackageCache`<sup>Optional</sup> <a name="workflowPackageCache" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowPackageCache"></a>

```typescript
public readonly workflowPackageCache: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Node.js package cache in GitHub workflows.

---

##### `disableTsconfig`<sup>Optional</sup> <a name="disableTsconfig" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.disableTsconfig"></a>

```typescript
public readonly disableTsconfig: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).

---

##### `disableTsconfigDev`<sup>Optional</sup> <a name="disableTsconfigDev" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.disableTsconfigDev"></a>

```typescript
public readonly disableTsconfigDev: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.dev.json` file.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean
- *Default:* false

Docgen by Typedoc.

---

##### `docsDirectory`<sup>Optional</sup> <a name="docsDirectory" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string
- *Default:* "docs"

Docs directory.

---

##### `entrypointTypes`<sup>Optional</sup> <a name="entrypointTypes" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.entrypointTypes"></a>

```typescript
public readonly entrypointTypes: string;
```

- *Type:* string
- *Default:* .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)

The .d.ts file that includes the type declarations for this module.

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.eslint"></a>

```typescript
public readonly eslint: boolean;
```

- *Type:* boolean
- *Default:* true

Setup eslint.

---

##### `eslintOptions`<sup>Optional</sup> <a name="eslintOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.eslintOptions"></a>

```typescript
public readonly eslintOptions: EslintOptions;
```

- *Type:* projen.javascript.EslintOptions
- *Default:* opinionated default options

Eslint options.

---

##### `libdir`<sup>Optional</sup> <a name="libdir" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string
- *Default:* "lib"

Typescript  artifacts output directory.

---

##### `projenrcTs`<sup>Optional</sup> <a name="projenrcTs" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcTs"></a>

```typescript
public readonly projenrcTs: boolean;
```

- *Type:* boolean
- *Default:* false

Use TypeScript for your projenrc file (`.projenrc.ts`).

---

##### `projenrcTsOptions`<sup>Optional</sup> <a name="projenrcTsOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.projenrcTsOptions"></a>

```typescript
public readonly projenrcTsOptions: ProjenrcOptions;
```

- *Type:* projen.typescript.ProjenrcOptions

Options for .projenrc.ts.

---

##### `sampleCode`<sup>Optional</sup> <a name="sampleCode" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.sampleCode"></a>

```typescript
public readonly sampleCode: boolean;
```

- *Type:* boolean
- *Default:* true

Generate one-time sample in `src/` and `test/` if there are no files there.

---

##### `srcdir`<sup>Optional</sup> <a name="srcdir" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string
- *Default:* "src"

Typescript sources directory.

---

##### `testdir`<sup>Optional</sup> <a name="testdir" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string
- *Default:* "test"

Jest tests directory. Tests files should be named `xxx.test.ts`.

If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`),
then tests are going to be compiled into `lib/` and executed as javascript.
If the test directory is outside of `src`, then we configure jest to
compile the code in-memory.

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* default options

Custom TSConfig.

---

##### `tsconfigDev`<sup>Optional</sup> <a name="tsconfigDev" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* use the production tsconfig options

Custom tsconfig options for the development tsconfig.json file (used for testing).

---

##### `tsconfigDevFile`<sup>Optional</sup> <a name="tsconfigDevFile" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsconfigDevFile"></a>

```typescript
public readonly tsconfigDevFile: string;
```

- *Type:* string
- *Default:* "tsconfig.dev.json"

The name of the development tsconfig.json file.

---

##### `tsJestOptions`<sup>Optional</sup> <a name="tsJestOptions" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.tsJestOptions"></a>

```typescript
public readonly tsJestOptions: TsJestOptions;
```

- *Type:* projen.typescript.TsJestOptions

Options for ts-jest.

---

##### `typescriptVersion`<sup>Optional</sup> <a name="typescriptVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.typescriptVersion"></a>

```typescript
public readonly typescriptVersion: string;
```

- *Type:* string
- *Default:* "latest"

TypeScript version to use.

NOTE: Typescript is not semantically versioned and should remain on the
same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).

---

##### `artifactsFolder`<sup>Optional</sup> <a name="artifactsFolder" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.artifactsFolder"></a>

```typescript
public readonly artifactsFolder: string;
```

- *Type:* string
- *Default:* 'dist'

Configurable folder for artifacts to package when transitioning from plan to apply.

---

##### `deploymentEnvironments`<sup>Optional</sup> <a name="deploymentEnvironments" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.deploymentEnvironments"></a>

```typescript
public readonly deploymentEnvironments: {[ key: string ]: DeploymentEnvironment};
```

- *Type:* {[ key: string ]: <a href="#@rlmartin-projen/cdktf-project.DeploymentEnvironment">DeploymentEnvironment</a>}
- *Default:* {}

Add GitHub Wokflows for enabled environments.

---

##### `embeddedNamespace`<sup>Optional</sup> <a name="embeddedNamespace" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.embeddedNamespace"></a>

```typescript
public readonly embeddedNamespace: string;
```

- *Type:* string
- *Default:* top-level project name

Used to scope the embedded packages to avoid naming collisions.

---

##### `embeddedPackages`<sup>Optional</sup> <a name="embeddedPackages" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.embeddedPackages"></a>

```typescript
public readonly embeddedPackages: {[ key: string ]: EmbeddedPackage};
```

- *Type:* {[ key: string ]: <a href="#@rlmartin-projen/cdktf-project.EmbeddedPackage">EmbeddedPackage</a>}
- *Default:* {}

Small functions to be deployed with the other resources in the repo.

Should be viewed more as infrastructure than services. Testing and linting
intentionally mirror the overall repo.

---

##### `nodeScripts`<sup>Optional</sup> <a name="nodeScripts" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.nodeScripts"></a>

```typescript
public readonly nodeScripts: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

A set of scripts to be added to package.json but not wrapped by projen.

---

##### `nodeVersion`<sup>Optional</sup> <a name="nodeVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.nodeVersion"></a>

```typescript
public readonly nodeVersion: number;
```

- *Type:* number
- *Default:* 20

The Node.js version to use when building.

---

##### `npmrc`<sup>Optional</sup> <a name="npmrc" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.npmrc"></a>

```typescript
public readonly npmrc: string[];
```

- *Type:* string[]
- *Default:* []

Raw lines to drop into the workflow's .npmrc file, to access private package. Empty implies no .npmrc required.

---

##### `repoAdmins`<sup>Optional</sup> <a name="repoAdmins" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.repoAdmins"></a>

```typescript
public readonly repoAdmins: {[ key: string ]: number};
```

- *Type:* {[ key: string ]: number}
- *Default:* {}

The GitHub Team slug (including the org_name/ prefix) or GitHub username for the teams/people who maintain infrastructure.

As a hack, and to avoid async fetching from the GitHub API to lookup ids, this is a map of
username => GitHub id (which will need to be looked up manually). In the future it would be
nice to make this a simple string[] (list of usernames) and automatically lookup the ids.

---

##### `terraformBackend`<sup>Optional</sup> <a name="terraformBackend" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformBackend"></a>

```typescript
public readonly terraformBackend: TerraformBackend;
```

- *Type:* <a href="#@rlmartin-projen/cdktf-project.TerraformBackend">TerraformBackend</a>
- *Default:* S3Backend

Terraform backend configuration.

---

##### `terraformManualWorkflow`<sup>Optional</sup> <a name="terraformManualWorkflow" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformManualWorkflow"></a>

```typescript
public readonly terraformManualWorkflow: boolean;
```

- *Type:* boolean

Set this to turn on a GitHub workflow that can be used to run manual Terraform commands within the environment.

This
is helpful for debugging and managing complicated state changes.

---

##### `terraformModules`<sup>Optional</sup> <a name="terraformModules" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformModules"></a>

```typescript
public readonly terraformModules: TerraformModuleOptions[];
```

- *Type:* <a href="#@rlmartin-projen/cdktf-project.TerraformModuleOptions">TerraformModuleOptions</a>[]
- *Default:* []

Terraform Modules to add to cdktf.json. These are assumed to be internal to the Medly GitHub org.

---

##### `terraformModulesSsh`<sup>Optional</sup> <a name="terraformModulesSsh" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformModulesSsh"></a>

```typescript
public readonly terraformModulesSsh: boolean;
```

- *Type:* boolean
- *Default:* false

Set this to true for local dev when using SSH to connect to GitHub.

---

##### `terraformProviders`<sup>Optional</sup> <a name="terraformProviders" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformProviders"></a>

```typescript
public readonly terraformProviders: string[];
```

- *Type:* string[]
- *Default:* []

Terraform Providers to add to cdktf.json.

---

##### `terraformVars`<sup>Optional</sup> <a name="terraformVars" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformVars"></a>

```typescript
public readonly terraformVars: string[];
```

- *Type:* string[]
- *Default:* []

List of Terraform variables to pull from GitHub secrets and set as TF_VAR_ environment variables during terraform plan.

The secrets will need to be set
manually, on one of org/repo/environment. The name of the var is expected to
not include the TF_VAR_ prefix.

---

##### `terraformVersion`<sup>Optional</sup> <a name="terraformVersion" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.terraformVersion"></a>

```typescript
public readonly terraformVersion: string;
```

- *Type:* string
- *Default:* latest

The Terraform version to use in the build pipelines.

---

##### `workflowEnvVars`<sup>Optional</sup> <a name="workflowEnvVars" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowEnvVars"></a>

```typescript
public readonly workflowEnvVars: EnvVars;
```

- *Type:* <a href="#@rlmartin-projen/cdktf-project.EnvVars">EnvVars</a>
- *Default:* {}

Optional list of env vars to load from GitHub Secrets/Variables into workflow-level env variables.

---

##### `workflowInputs`<sup>Optional</sup> <a name="workflowInputs" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowInputs"></a>

```typescript
public readonly workflowInputs: {[ key: string ]: WorkflowInputOptions};
```

- *Type:* {[ key: string ]: <a href="#@rlmartin-projen/cdktf-project.WorkflowInputOptions">WorkflowInputOptions</a>}

Optional inputs (map of name => options) to inject into the workflow_dispatch.

---

##### `workflowSteps`<sup>Optional</sup> <a name="workflowSteps" id="@rlmartin-projen/cdktf-project.CdktfProjectOptions.property.workflowSteps"></a>

```typescript
public readonly workflowSteps: WorkflowSteps;
```

- *Type:* <a href="#@rlmartin-projen/cdktf-project.WorkflowSteps">WorkflowSteps</a>

Optional steps to include in the GitHub workflow.

---

### DeploymentEnvironment <a name="DeploymentEnvironment" id="@rlmartin-projen/cdktf-project.DeploymentEnvironment"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.DeploymentEnvironment.Initializer"></a>

```typescript
import { DeploymentEnvironment } from '@rlmartin-projen/cdktf-project'

const deploymentEnvironment: DeploymentEnvironment = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.branchFilters">branchFilters</a></code> | <code>string[]</code> | Branch matchers from which code can be deployed for this environment. |
| <code><a href="#@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.onlyProtectedBranches">onlyProtectedBranches</a></code> | <code>boolean</code> | Instead of filtering branches, use branches protected in the repo settings. |
| <code><a href="#@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.region">region</a></code> | <code>string</code> | The AWS region to deploy to. |
| <code><a href="#@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.requireApproval">requireApproval</a></code> | <code>boolean</code> | Whether the environment requires approval before applying; |
| <code><a href="#@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.useOidc">useOidc</a></code> | <code>boolean</code> | Whether this deployment uses a GitHub OIDC connection to deploy. |

---

##### `branchFilters`<sup>Optional</sup> <a name="branchFilters" id="@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.branchFilters"></a>

```typescript
public readonly branchFilters: string[];
```

- *Type:* string[]
- *Default:* []

Branch matchers from which code can be deployed for this environment.

Empty implies "all".
Mutually-exclusive from onlyProtectedBranches.

---

##### `onlyProtectedBranches`<sup>Optional</sup> <a name="onlyProtectedBranches" id="@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.onlyProtectedBranches"></a>

```typescript
public readonly onlyProtectedBranches: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of filtering branches, use branches protected in the repo settings.

Mutually-exclusive from branchFilters

---

##### `region`<sup>Optional</sup> <a name="region" id="@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string
- *Default:* us-east-1

The AWS region to deploy to.

---

##### `requireApproval`<sup>Optional</sup> <a name="requireApproval" id="@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.requireApproval"></a>

```typescript
public readonly requireApproval: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the environment requires approval before applying;

plans always run

---

##### `useOidc`<sup>Optional</sup> <a name="useOidc" id="@rlmartin-projen/cdktf-project.DeploymentEnvironment.property.useOidc"></a>

```typescript
public readonly useOidc: boolean;
```

- *Type:* boolean
- *Default:* false

Whether this deployment uses a GitHub OIDC connection to deploy.

See https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services

---

### EmbeddedPackage <a name="EmbeddedPackage" id="@rlmartin-projen/cdktf-project.EmbeddedPackage"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.EmbeddedPackage.Initializer"></a>

```typescript
import { EmbeddedPackage } from '@rlmartin-projen/cdktf-project'

const embeddedPackage: EmbeddedPackage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.EmbeddedPackage.property.type">type</a></code> | <code>string</code> | Determined whether the embedded package is a function or a library. |
| <code><a href="#@rlmartin-projen/cdktf-project.EmbeddedPackage.property.deps">deps</a></code> | <code>string[]</code> | Any dependencies specific to the embedded function. |
| <code><a href="#@rlmartin-projen/cdktf-project.EmbeddedPackage.property.devDeps">devDeps</a></code> | <code>string[]</code> | Any dev dependencies specific to the embedded function. |
| <code><a href="#@rlmartin-projen/cdktf-project.EmbeddedPackage.property.localDeps">localDeps</a></code> | <code>string[]</code> | Local dependencies on other embedded packages. |

---

##### `type`<sup>Required</sup> <a name="type" id="@rlmartin-projen/cdktf-project.EmbeddedPackage.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

Determined whether the embedded package is a function or a library.

---

##### `deps`<sup>Optional</sup> <a name="deps" id="@rlmartin-projen/cdktf-project.EmbeddedPackage.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

Any dependencies specific to the embedded function.

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="@rlmartin-projen/cdktf-project.EmbeddedPackage.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

Any dev dependencies specific to the embedded function.

---

##### `localDeps`<sup>Optional</sup> <a name="localDeps" id="@rlmartin-projen/cdktf-project.EmbeddedPackage.property.localDeps"></a>

```typescript
public readonly localDeps: string[];
```

- *Type:* string[]
- *Default:* []

Local dependencies on other embedded packages.

---

### EnvVars <a name="EnvVars" id="@rlmartin-projen/cdktf-project.EnvVars"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.EnvVars.Initializer"></a>

```typescript
import { EnvVars } from '@rlmartin-projen/cdktf-project'

const envVars: EnvVars = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.EnvVars.property.secrets">secrets</a></code> | <code>string[] \| {[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.EnvVars.property.vars">vars</a></code> | <code>string[] \| {[ key: string ]: string}</code> | *No description.* |

---

##### `secrets`<sup>Optional</sup> <a name="secrets" id="@rlmartin-projen/cdktf-project.EnvVars.property.secrets"></a>

```typescript
public readonly secrets: string[] | {[ key: string ]: string};
```

- *Type:* string[] | {[ key: string ]: string}

---

##### `vars`<sup>Optional</sup> <a name="vars" id="@rlmartin-projen/cdktf-project.EnvVars.property.vars"></a>

```typescript
public readonly vars: string[] | {[ key: string ]: string};
```

- *Type:* string[] | {[ key: string ]: string}

---

### S3Backend <a name="S3Backend" id="@rlmartin-projen/cdktf-project.S3Backend"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.S3Backend.Initializer"></a>

```typescript
import { S3Backend } from '@rlmartin-projen/cdktf-project'

const s3Backend: S3Backend = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.S3Backend.property.accountId">accountId</a></code> | <code>string</code> | The AWS accountId where the S3 bucket and DynamoDB locks table exist. |
| <code><a href="#@rlmartin-projen/cdktf-project.S3Backend.property.prefix">prefix</a></code> | <code>string</code> | Prefix to use when naming backend resources. |
| <code><a href="#@rlmartin-projen/cdktf-project.S3Backend.property.region">region</a></code> | <code>string</code> | AWS region where the S3 bucket and DynamoDB locks table exist. |

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@rlmartin-projen/cdktf-project.S3Backend.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

The AWS accountId where the S3 bucket and DynamoDB locks table exist.

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="@rlmartin-projen/cdktf-project.S3Backend.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

Prefix to use when naming backend resources.

---

##### `region`<sup>Optional</sup> <a name="region" id="@rlmartin-projen/cdktf-project.S3Backend.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string
- *Default:* 'us-east-1'

AWS region where the S3 bucket and DynamoDB locks table exist.

---

### TerraformBackend <a name="TerraformBackend" id="@rlmartin-projen/cdktf-project.TerraformBackend"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.TerraformBackend.Initializer"></a>

```typescript
import { TerraformBackend } from '@rlmartin-projen/cdktf-project'

const terraformBackend: TerraformBackend = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformBackend.property.aws">aws</a></code> | <code><a href="#@rlmartin-projen/cdktf-project.S3Backend">S3Backend</a></code> | *No description.* |

---

##### `aws`<sup>Required</sup> <a name="aws" id="@rlmartin-projen/cdktf-project.TerraformBackend.property.aws"></a>

```typescript
public readonly aws: S3Backend;
```

- *Type:* <a href="#@rlmartin-projen/cdktf-project.S3Backend">S3Backend</a>

---

### TerraformModuleOptions <a name="TerraformModuleOptions" id="@rlmartin-projen/cdktf-project.TerraformModuleOptions"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.TerraformModuleOptions.Initializer"></a>

```typescript
import { TerraformModuleOptions } from '@rlmartin-projen/cdktf-project'

const terraformModuleOptions: TerraformModuleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.githubOrgName">githubOrgName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.version">version</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.nameOverride">nameOverride</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.submodule">submodule</a></code> | <code><a href="#@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions">TerraformSubmoduleOptions</a></code> | *No description.* |

---

##### `githubOrgName`<sup>Required</sup> <a name="githubOrgName" id="@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.githubOrgName"></a>

```typescript
public readonly githubOrgName: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `version`<sup>Required</sup> <a name="version" id="@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

---

##### `nameOverride`<sup>Optional</sup> <a name="nameOverride" id="@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.nameOverride"></a>

```typescript
public readonly nameOverride: string;
```

- *Type:* string

---

##### `submodule`<sup>Optional</sup> <a name="submodule" id="@rlmartin-projen/cdktf-project.TerraformModuleOptions.property.submodule"></a>

```typescript
public readonly submodule: TerraformSubmoduleOptions;
```

- *Type:* <a href="#@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions">TerraformSubmoduleOptions</a>

---

### TerraformSubmoduleOptions <a name="TerraformSubmoduleOptions" id="@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions.Initializer"></a>

```typescript
import { TerraformSubmoduleOptions } from '@rlmartin-projen/cdktf-project'

const terraformSubmoduleOptions: TerraformSubmoduleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions.property.rootPath">rootPath</a></code> | <code>string</code> | The directory where the module can be found. |

---

##### `name`<sup>Required</sup> <a name="name" id="@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `rootPath`<sup>Optional</sup> <a name="rootPath" id="@rlmartin-projen/cdktf-project.TerraformSubmoduleOptions.property.rootPath"></a>

```typescript
public readonly rootPath: string;
```

- *Type:* string
- *Default:* modules

The directory where the module can be found.

Should not include 'name'.

---

### WorkflowInputOptions <a name="WorkflowInputOptions" id="@rlmartin-projen/cdktf-project.WorkflowInputOptions"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.WorkflowInputOptions.Initializer"></a>

```typescript
import { WorkflowInputOptions } from '@rlmartin-projen/cdktf-project'

const workflowInputOptions: WorkflowInputOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.default">default</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.options">options</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.required">required</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.type">type</a></code> | <code>string</code> | *No description.* |

---

##### `default`<sup>Optional</sup> <a name="default" id="@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.default"></a>

```typescript
public readonly default: string;
```

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `options`<sup>Optional</sup> <a name="options" id="@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.options"></a>

```typescript
public readonly options: string[];
```

- *Type:* string[]

---

##### `required`<sup>Optional</sup> <a name="required" id="@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.required"></a>

```typescript
public readonly required: boolean;
```

- *Type:* boolean

---

##### `type`<sup>Optional</sup> <a name="type" id="@rlmartin-projen/cdktf-project.WorkflowInputOptions.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

### WorkflowSteps <a name="WorkflowSteps" id="@rlmartin-projen/cdktf-project.WorkflowSteps"></a>

#### Initializer <a name="Initializer" id="@rlmartin-projen/cdktf-project.WorkflowSteps.Initializer"></a>

```typescript
import { WorkflowSteps } from '@rlmartin-projen/cdktf-project'

const workflowSteps: WorkflowSteps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowSteps.property.postBuild">postBuild</a></code> | <code>projen.github.workflows.JobStep[]</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowSteps.property.postDeploy">postDeploy</a></code> | <code>projen.github.workflows.JobStep[]</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowSteps.property.preBuild">preBuild</a></code> | <code>projen.github.workflows.JobStep[]</code> | *No description.* |
| <code><a href="#@rlmartin-projen/cdktf-project.WorkflowSteps.property.preDeploy">preDeploy</a></code> | <code>projen.github.workflows.JobStep[]</code> | *No description.* |

---

##### `postBuild`<sup>Optional</sup> <a name="postBuild" id="@rlmartin-projen/cdktf-project.WorkflowSteps.property.postBuild"></a>

```typescript
public readonly postBuild: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

---

##### `postDeploy`<sup>Optional</sup> <a name="postDeploy" id="@rlmartin-projen/cdktf-project.WorkflowSteps.property.postDeploy"></a>

```typescript
public readonly postDeploy: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

---

##### `preBuild`<sup>Optional</sup> <a name="preBuild" id="@rlmartin-projen/cdktf-project.WorkflowSteps.property.preBuild"></a>

```typescript
public readonly preBuild: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

---

##### `preDeploy`<sup>Optional</sup> <a name="preDeploy" id="@rlmartin-projen/cdktf-project.WorkflowSteps.property.preDeploy"></a>

```typescript
public readonly preDeploy: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

---



