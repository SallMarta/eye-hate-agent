# Eye Hate Agent (EHA)

## Documentation and engine repository for AI-agent-assisted project work

Authored by SuLyAdEe.

---

## Table of Contents

- [Eye Hate Agent](#eye-hate-agent)
  - [Purpose](#purpose)
  - [Quick Start](#quick-start)
  - [CLI Commands](#cli-commands)
  - [What Gets Generated](#what-gets-generated)
  - [Maintainer Notes (This Repository)](#maintainer-notes-this-repository)
  - [Key Paths](#key-paths)

## Purpose

Designed to give multiple agents a shared contract, shared rules, and shared planning/doc workflows across app types, while the actual app code lives in your target repo.

It provides generic agent rules, reusable skills and prompts, a project-doc contract, and a repo-local EHA engine/CLI for generating runtime-facing command/prompt files.

This repository is no longer template-only. It ships both reusable template assets and the EHA engine code that materializes runtime-facing surfaces in the target repository.

Use this README as the main operator guide for installing and running EHA.

## Quick Start

Two ways to run EHA — both ask the same questions and generate the same files:

| How | What it means |
|---|---|
| `npm install -g @sallmarta/eye-hate-agent` | `eha` binary available globally. Run `eha` in any project, any time. |
| `npx @sallmarta/eye-hate-agent` | One-shot: runs the wizard in the current directory, generates files, no binary left behind. |

```bash
# global
npm install -g @sallmarta/eye-hate-agent
cd your-project
eha

# one-shot
cd your-project
npx @sallmarta/eye-hate-agent
```

After running `eha init`, open your agent and use the generated commands:

| Agent | How to trigger |
|---|---|
| Claude | `/eha-bootstrap`, `/eha-refresh`, `/eha-parity`, `/eha-discuss` |
| GitHub Copilot | Attach `#eha-bootstrap.prompt.md` (or the relevant prompt) in agent mode |

## CLI Commands

```
eha [init]            Wizard: detect project root, choose agent, generate files
eha init [agent]      Set up EHA. Agent: claude | copilot
eha remove            Remove all EHA-generated files and config
eha doctor            Show EHA status and verify generated files
```

## What Gets Generated

**Claude** — `.claude/commands/eha/eha-{bootstrap,refresh,parity,discuss}.md` + README

**Copilot** — `.github/prompts/eha-{bootstrap,refresh,parity,discuss}.prompt.md` + `.github/instructions/eha-workflows.instructions.md`

Each generated file contains:
1. Agent-specific frontmatter (Claude `description:`, Copilot `mode: agent`)
2. A compact EHA rules block — the 4-layer taxonomy, ownership map, and SDD rule
3. The full workflow prompt — self-contained, no external files required

The generated files are committed into the target repository. Re-run `eha init` to regenerate (e.g., after updating `@sallmarta/eye-hate-agent`).

### Local Development (This Repository)

```bash
npm install
node bin/eha.js --help
node bin/eha.js init claude
node bin/eha.js doctor
```

## Maintainer Notes (This Repository)

This section is for maintainers of `eye-hate-agent` itself.

If you are using EHA in another project, you usually only need the Quick Start section above.

### Workflow Sources

EHA generates runtime files from these reusable prompt sources:

- `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md`
- `docs/vibes/reusable-prompts/00-project-docs-refresh.md`
- `docs/vibes/reusable-prompts/00-project-docs-parity.md`
- `docs/vibes/reusable-prompts/02-sdd-discuss.md`

### Rule and Contract Ownership

- `docs/eyehateagent-contract.md` is the canonical contract and authority order
- `docs/eyehateagent-maintenance.md` is for maintaining this repository
- `.github/instructions/`, `.claude/rules/`, and `.agents/rules/` are platform surfaces

When updating workflow behavior or prompt content, keep generated runtime behavior and project docs in sync.

## Key Paths

| Area | Path | Role |
| --- | --- | --- |
| README | `README.md` | main human guide for installing and using EHA |
| Contract | `docs/eyehateagent-contract.md` | canonical EHA contract and decision order |
| Maintenance | `docs/eyehateagent-maintenance.md` | maintenance workflow for this repository |
| Project docs | `docs/project-docs/` | canonical docs for this repository |
| Reusable prompts | `docs/vibes/reusable-prompts/` | source prompts used to generate runtime files |
| Skills | `docs/vibes/skills/` | reusable procedures for analysis, testing, auditing, and design |
| Starter templates | `docs/vibes/project-docs-template/` | reusable scaffolds for project docs |
