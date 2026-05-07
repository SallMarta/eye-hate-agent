# Architecture — Template Repository

Last updated: 2026-05-07

---

## Stack Overview

| Area | Role |
| --- | --- |
| Markdown docs | Contract, adoption guidance, prompts, skills, and repo-level truth |
| Instruction files | Always-on guardrails for AI agents |
| Skill files | Reusable procedures that read project docs first |
| Prompt files | Bootstrap, refresh, and consistency-audit workflows |
| Editor diagnostics | Structural validation for markdown and text drift |

This repository does not ship an executable product runtime. Its primary architecture is documentation structure plus agent-facing behavior.

---

## Architecture Pattern

The template uses a documentation-first control model.

```text
rules and instructions -> read project docs
skills -> read project docs, then apply reusable procedure
prompts -> create or refresh project docs
project docs -> hold project-specific truth in adopted repositories
```

The repository's own `docs/project-docs/` tree describes the template repository itself.
Adopted repositories should replace those docs with their own project truth.

---

## Dependency Rules

- rules stay generic and point back to project docs instead of embedding project truth
- skills define procedures, not product-specific requirements
- prompts generate or refresh docs, not hidden architecture decisions
- `docs/project-docs/` owns stack, commands, architecture, testing, and workflow truth
- optional docs exist only when they carry durable value
- sample products and historical artifacts do not belong in the active template tree

---

## Integrations

| Surface | Responsibility |
| --- | --- |
| `.github/instructions/` | Copilot-facing instruction layer |
| `.claude/rules/` | Claude-facing mirrored rule layer |
| `docs/project-docs/` | Contracted documentation surface for repo-specific truth |
| `docs/vibes/skills/` | Reusable operational procedures |
| `docs/vibes/prompt/` | Prompt modules for bootstrap, refresh, and audit workflows |

---

## Data / Storage

| Location | Purpose |
| --- | --- |
| `docs/project-docs/` | Required and optional project-doc contract files |
| `docs/vibes/skills/` | Reusable skills that adapt after reading project docs |
| `docs/vibes/prompt/` | Prompt modules for generating and refreshing docs |
| `.github/instructions/` and `.claude/rules/` | Mirrored instruction surfaces |

This repository stores durable truth as text, not as application state.

---

## Commands

Use lightweight structural checks while editing the template:

- list owned docs with `rg --files docs/project-docs`
- search for stale terms with `rg "<term>" docs/`
- inspect changed docs with `git diff -- docs/`
- use editor diagnostics or markdown linting for formatting issues

The stronger verification guidance lives in `TESTING.md`.

---

## Testing Stack

This template repository does not define an executable application test stack.

Validation is primarily:

- structural review
- targeted text search for drift
- markdown diagnostics
- contract consistency checks across rules, skills, prompts, and project docs

See `TESTING.md` for the verification policy.
