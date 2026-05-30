# EHA Architecture

Last updated: 2026-05-26

## Purpose

Eye Hate Agent is an **npm CLI + template engine** that generates self-contained AI agent workflow files inside any target repository.

The user-facing flow is:
1. `npm install -g @sallmarta/eye-hate-agent` or `npx @sallmarta/eye-hate-agent`
2. Run `eha` or `eha init` in any project with a `package.json` or `.git`
3. Pick an agent (`claude` or `copilot`)
4. EHA generates self-contained command files into the project
5. Open the agent and run the generated workflow commands

No external files are required at runtime. Each generated file is fully self-contained.

## Canonical source assets

Human-authored source-of-truth assets:

- `docs/vibes/reusable-prompts/` — 4 canonical workflow prompts (bootstrap, refresh, parity, discuss)
- `docs/eyehateagent-contract.md` — full rules reference (not bundled into generated files; the compact rules block serves that role)
- `docs/eyehateagent-maintenance.md` — maintainer guide

## Engine layer

`src/engine/` modules:

| File | Responsibility |
|---|---|
| `workflow-registry.js` | Maps workflow IDs to prompt file paths |
| `state.js` | Repo root detection, config R/W, filesystem helpers |
| `runtime-adapters.js` | Generates files per agent; embeds compact EHA rules + prompt content |
| `install.js` | `initProject`, `removeProject`, `doctor` — orchestrates file generation and manifest |
| `index.js` | Barrel export |

### Config and manifest

- Config: `.eha/config.json` — `{ configVersion: 1, agent: "claude" | "copilot" }`
- Manifest: `.eha/manifest.json` — tracks generated file paths, `updatedAt` timestamp, and `packageVersion` (the EHA version that wrote the files); used for clean removal and staleness detection

## CLI layer (`bin/eha.js`)

| Command | Behavior |
|---|---|
| `eha` / `eha init` | Wizard: detect root → if initialized and manifest `packageVersion` differs from installed EHA version, prompt to regenerate (default Y); else prompt agent if TTY → call `initProject` |
| `eha init [agent]` | Non-interactive init with explicit agent |
| `eha remove` | Confirm + `removeProject` |
| `eha doctor` | Print config, agent, and generated-file status |

Bin aliases: `eha`, `eye-hate-agent`, `eyehateagent`

## Generated file structure per agent

### Claude

```
.claude/commands/eha/
  eha-bootstrap.md
  eha-refresh.md
  eha-parity.md
  eha-discuss.md
  README.md
```

Each `.md` file has:
- YAML frontmatter: `description: "EHA {workflow} — {description}"`
- `EHA_COMPACT_RULES` block (4-layer taxonomy, ownership, SDD rule)
- Full workflow prompt content (contract reference removed — rules are embedded)

### GitHub Copilot

```
.github/prompts/
  eha-bootstrap.prompt.md
  eha-refresh.prompt.md
  eha-parity.prompt.md
  eha-discuss.prompt.md
.github/instructions/
  eha-workflows.instructions.md
```

Each `.prompt.md` has:
- YAML frontmatter: `mode: agent`
- `EHA_COMPACT_RULES` block
- Full workflow prompt content

The `.instructions.md` file is always-on routing context listing the 4 prompts.

## Supported workflows

| ID | Command | Source |
|---|---|---|
| bootstrap | `/eha-bootstrap` | `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` |
| refresh | `/eha-refresh` | `docs/vibes/reusable-prompts/00-project-docs-refresh.md` |
| parity | `/eha-parity` | `docs/vibes/reusable-prompts/00-project-docs-parity.md` |
| discuss | `/eha-discuss` | `docs/vibes/reusable-prompts/02-sdd-discuss.md` |

### GitHub Copilot

**Support tier:** guided

Generated outputs:

- `.github/instructions/eha-workflows.instructions.md`

Copilot currently receives generated instruction routing rather than slash-command surfaces. This is an intentional capability gap and should remain explicit until a stronger Copilot command surface is defined.
Copilot still installs guided repo-local instruction surfaces by default, but the engine now has the same automation contract available if the repo owner configures a callable command template.

### Execution modes

Each runtime now resolves to one of three execution modes at run time:

- `automated`: EHA can invoke the runtime through a configured command template
- `guided`: EHA prepares prompts and runtime surfaces, but the user still drives the agent manually
- `unavailable`: reserved for runtimes that cannot be detected or configured on the current machine

EHA stores the default preferred runtime and automation settings in `.eha/config.json`, while keeping per-run overrides available on workflow commands.

## Generated outputs model

Generated outputs stay **inside the target repository** where EHA is executed.

Current generated paths:

- runtime surfaces in `.claude/` and `.github/`
- repo-local runtime config in `.eha/config.json`
- engine manifest in `.eha/generated/install-manifest.json`
- bundled contract and workflow source copies in `.eha/generated/sources/`
- execution artifacts in `.eha/state/`
- run records in `.eha/state/runs/`

### Ownership rule

- canonical source assets are edited by humans
- generated runtime outputs are materialized by `eha install`
- in the EHA source repository, generated runtime surfaces are ignored rather than committed
- generated outputs may be reviewed directly, but durable behavior changes should be made in the owning source assets or engine code first

## Workflow registry model

The engine workflow registry maps CLI commands to canonical reusable prompts:

| CLI command | Canonical source |
| --- | --- |
| `bootstrap` / `init` | `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` |
| `refresh` | `docs/vibes/reusable-prompts/00-project-docs-refresh.md` |
| `parity` | `docs/vibes/reusable-prompts/00-project-docs-parity.md` |
| `discuss` | `docs/vibes/reusable-prompts/02-sdd-discuss.md` |
| `execute` | `docs/vibes/reusable-prompts/01-sdd-execute.md` |
| `verify` | `docs/vibes/reusable-prompts/00-project-docs-parity.md` |

`verify` currently routes to parity until a dedicated verify workflow exists.

## Runtime orchestration model

Workflow commands now pass through a runtime-resolution step:

1. resolve the repo-local preferred runtime from `.eha/config.json`
2. allow per-run override such as `--runtime claude` or `--runtime copilot`
3. prepare the workflow prompt and state artifacts
4. choose guided or automated execution based on config and runtime command-template availability
5. persist run status and result artifacts under `.eha/state/runs/`
