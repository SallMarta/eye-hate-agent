# Eye Hate Agent (EHA)

## Documentation and engine toolkit for AI-agent-assisted project workflows

Authored by SuLyAdEe.

---

## Table of Contents

- [Eye Hate Agent](#eye-hate-agent)
  - [Purpose](#purpose)
  - [Quick Start](#quick-start)
  - [CLI Commands](#cli-commands)
  - [What Gets Generated](#what-gets-generated)

## Purpose

Eye Hate Agent (EHA) is designed to give your AI agents (like Claude and GitHub Copilot) a shared set of rules, skills, and documentation workflows across any project.

It acts as a CLI engine that generates agent-specific instruction files directly into your repository. This ensures that every agent you use follows the same structural contract, adheres to consistent rules, and has access to reusable skills without relying on disparate, global instructions. EHA materializes runtime-facing surfaces directly into your target repository so your team (and their agents) can stay perfectly aligned.

Use this README as the main guide for installing and running EHA in your projects.

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

**Claude**
- **Workflows**: `.claude/commands/eha/eha-{bootstrap,refresh,parity,discuss}.md` + README
- **Skills**: `.claude/skills/eha-{analysis,api-design,code-audit,full-verification,parity,project-elevation,test-authoring}.md`
- **Rules**: `.claude/rules/eha-agent-rules.md`

**Copilot**
- **Workflows**: `.github/prompts/eha-{bootstrap,refresh,parity,discuss}.prompt.md` + `.github/instructions/eha-workflows.instructions.md`
- **Skills**: `.github/prompts/skills/eha-{analysis,api-design,code-audit,full-verification,parity,project-elevation,test-authoring}.prompt.md`
- **Rules**: `.github/instructions/eha-agent-rules.instructions.md`

Each generated workflow/skill file contains:
1. Agent-specific frontmatter (Claude `description:`, Copilot `mode: agent`)
2. A compact EHA rules block — the 4-layer taxonomy, ownership map, and SDD rule
3. The full content — self-contained, no external files required

The generated files are committed into the target repository. After updating `@sallmarta/eye-hate-agent`, run `eha` — it detects the version mismatch and prompts to regenerate automatically. You can also re-run `eha init` at any time to force a regeneration.
