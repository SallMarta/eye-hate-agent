on gitu# EHA Q&A for a running repo with unclear docs

Assumption: you mean a **target project repository** that already has code, but its documentation is missing or outdated.

---

## 1. How to set up EHA for this repo via `npm`?

There are two practical ways, depending on whether you want a global install or one-off usage.

### Option A — global install

```bash
npm install -g @sallmarta/eye-hate-agent
eha install claude copilot
eha doctor
```

### Option B — one-off usage with `npx`

Run this **inside the target repo**:

```bash
npx @sallmarta/eye-hate-agent install claude copilot
npx @sallmarta/eye-hate-agent doctor
```

Important notes:

- The target directory must already look like a project root, usually by having `package.json` or `.git`.
- If the folder is empty, run `npm init -y` or `git init` first.
- If you are developing **inside this `eye-hate-agent` source repo itself**, use:

```bash
npm install
node bin/eha.js install claude copilot
node bin/eha.js doctor
```

---

## 2. After installed, how to interact with EHA? What will EHA do?

### What `install` does

`install` does **not** analyze your app and write project docs immediately.

What it does now:

1. Detects the repo root.
2. Bundles the EHA contract and workflow prompt sources into `.eha/generated/sources/`.
3. Generates repo-local runtime surfaces for supported agents:
   - Claude command files under `.claude/commands/eha/`
   - Copilot routing instructions under `.github/instructions/`
4. Writes an install manifest under `.eha/generated/install-manifest.json`

### How you interact with EHA after install

You then run workflow commands such as:

```bash
eha bootstrap
eha refresh
eha parity
eha discuss "my feature idea"
eha execute "implement X"
eha verify
```

Current behavior of these workflow commands:

- They prepare a workflow dispatch prompt.
- They copy the needed canonical source files into `.eha/generated/sources/`.
- They write run artifacts such as:
  - `.eha/state/last-prompt.md`
  - `.eha/state/last-run.json`
- They print a summary, or with `--print`, print the assembled prompt directly.

So today EHA is mainly a **repo-local workflow installer + prompt-preparation engine**.

---

## 3. What files will EHA create in the project?

### Files created by `eha install claude copilot`

#### Claude runtime outputs

- `.claude/commands/eha/README.md`
- `.claude/commands/eha/eha-bootstrap.md`
- `.claude/commands/eha/eha-refresh.md`
- `.claude/commands/eha/eha-parity.md`
- `.claude/commands/eha/eha-discuss.md`
- `.claude/commands/eha/eha-execute.md`
- `.claude/commands/eha/eha-verify.md`

#### Copilot runtime outputs

- `.github/instructions/eha-workflows.instructions.md`

#### Engine-generated files

- `.eha/generated/install-manifest.json`
- `.eha/generated/sources/docs/eyehateagent-contract.md`
- `.eha/generated/sources/docs/vibes/reusable-prompts/...`

### Files created when you run a workflow command

Examples: `eha bootstrap`, `eha discuss`, `eha verify`

- `.eha/state/last-prompt.md`
- `.eha/state/last-run.json`
- any required bundled source copies under `.eha/generated/sources/`

### What EHA does **not** automatically create yet

It does **not** currently create `docs/project-docs/...` in your target repo just because you ran the CLI.

The reusable prompt for `bootstrap` defines how an agent should generate those docs, but the current engine mainly prepares that workflow and its prompt artifacts.

---

## 4. How can I use EHA to analyze my codebase and then generate documentation based on EHA templates?

For a running repo with unclear docs, the intended path is:

### Step 1 — install EHA into the target repo

```bash
npx @sallmarta/eye-hate-agent install claude copilot
```

or, if globally installed:

```bash
eha install claude copilot
```

### Step 2 — prepare the bootstrap workflow

```bash
eha bootstrap
```

or print the assembled prompt:

```bash
eha bootstrap --print
```

### Step 3 — use that workflow with your agent

For a running repo with unclear docs, the bootstrap prompt explicitly says the agent should:

1. inspect the current workspace state
2. detect that code exists but docs are missing or unclear
3. analyze code artifacts such as package files, schemas, and routes
4. reverse-engineer key docs like:
   - `foundation/architecture.md`
   - `technical/database.md`
5. ask you to fill in missing product goals
6. generate the `docs/project-docs/` structure using the EHA template model

### The important current limitation

Today, the engine helps by **preparing and routing the workflow**, but the actual repo analysis and document authoring still depends on the AI agent executing that workflow.

So the practical usage is:

1. install EHA
2. run `bootstrap`
3. let Claude/Copilot use the installed surfaces and workflow prompt
4. have the agent generate or refresh `docs/project-docs/`

---

## 5. What exactly do all EHA commands do, and where are they documented or sourced?

### Command list

- `install [runtimes...]`
- `uninstall [runtimes...]`
- `doctor`
- `bootstrap [context...]`
- `refresh [context...]`
- `parity [context...]`
- `discuss [context...]`
- `execute [context...]`
- `verify [context...]`
- `init [context...]`
- `runtimes`

### What each command does

| Command | What it does now | Source of truth |
| --- | --- | --- |
| `install` | Generates repo-local runtime files and writes install manifest | `bin/eha.js`, `src/engine/install.js`, `src/engine/runtime-adapters.js` |
| `uninstall` | Removes generated runtime files based on manifest | `bin/eha.js`, `src/engine/install.js` |
| `doctor` | Reports repo root, engine state paths, supported runtimes, installed outputs | `bin/eha.js`, `src/engine/install.js` |
| `bootstrap` | Prepares the project-doc bootstrap workflow prompt | `bin/eha.js`, `src/engine/workflow-registry.js`, `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` |
| `refresh` | Prepares the doc refresh workflow prompt | `workflow-registry.js`, `00-project-docs-refresh.md` |
| `parity` | Prepares the ownership/drift check workflow prompt | `workflow-registry.js`, `00-project-docs-parity.md` |
| `discuss` | Prepares the spec-discussion workflow prompt | `workflow-registry.js`, `02-sdd-discuss.md` |
| `execute` | Prepares the spec-driven execution workflow prompt | `workflow-registry.js`, `01-sdd-execute.md` |
| `verify` | Prepares the verification workflow, but currently routes to parity | `workflow-registry.js`, `00-project-docs-parity.md` |
| `init` | Alias for `bootstrap` | `bin/eha.js`, `workflow-registry.js` |
| `runtimes` | Lists supported runtimes and support tiers | `bin/eha.js`, `src/engine/runtime-adapters.js` |

### Where these commands are documented

Primary docs:

- `README.md`
- `docs/project-docs/foundation/workflow.md`
- `docs/project-docs/foundation/architecture.md`

Primary code sources:

- `bin/eha.js`
- `src/engine/workflow-registry.js`
- `src/engine/install.js`
- `src/engine/runtime-adapters.js`
- `src/engine/state.js`

---

## 6. Does EHA automatically connect with the user's Copilot or Claude or other agent before proceeding?

**No.**

Current EHA behavior is **repo-local file generation and workflow preparation**, not automatic live connection or account-level agent handshaking.

What it does:

- creates local command or instruction files for supported runtimes
- prepares workflow prompts and state artifacts
- gives the agent platform repo-local surfaces to read

What it does **not** do in the current implementation:

- no automatic authentication to Claude or Copilot
- no direct remote session creation with those tools
- no automatic execution against "other agents"
- no generalized runtime support beyond the adapters currently defined in code

Current supported runtimes are:

- `claude`
- `copilot`

And even those are not equal:

- Claude support is **full**
- Copilot support is **guided**

So the mental model should be:

> EHA is a local workflow engine that prepares repo-local instructions and prompts for agents to follow. It is not yet a universal agent connector or autonomous orchestration service.

---

## Short practical recommendation

If your real goal is: **"analyze my existing repo and generate EHA-style docs"**, do this:

```bash
npx @sallmarta/eye-hate-agent install claude copilot
npx @sallmarta/eye-hate-agent bootstrap --print
```

Then use the printed/bootstrap workflow with your agent in that target repo so the agent can inspect the codebase and create `docs/project-docs/` from the EHA templates.
