# Architecture — Template Repository

Last updated: 2026-05-07

---

## Stack Overview

| Area | Role |
| --- | --- |
| `docs/project-docs/` | Active contract docs and canonical repository truth |
| `docs/vibes/` | Reusable template assets such as reusable prompts, skills, and adoption guidance |
| `.github/instructions/` and `.claude/rules/` | Platform-specific instruction entry points for the same generic rule layer |
| Editor diagnostics | Structural validation for markdown and text drift |

This repository does not ship an executable product runtime. Its primary architecture is documentation structure plus agent-facing behavior.

---

## Architecture Pattern

The template uses a documentation-first control model.

```text
platform instruction surfaces -> read project docs
reusable prompts and skills -> read or update project docs
project docs -> hold active repository truth
reference material -> never overrides the active contract
```

The repository's own `docs/project-docs/` tree describes the template repository itself.
Adopted repositories should replace those docs with their own project truth.

---

## Dependency Rules

- rules stay generic and point back to project docs instead of embedding project truth
- skills define procedures, not product-specific requirements
- reusable prompts generate or refresh docs, not hidden architecture decisions
- `docs/project-docs/` owns stack, commands, architecture, testing, and workflow truth
- `docs/vibes/` contains reusable support assets, not active project truth
- optional docs exist only when they carry durable value
- any reference-only material must live in a clearly named non-contract path

---

## Integrations

| Surface | Responsibility |
| --- | --- |
| `.github/instructions/` | Copilot-facing instruction layer |
| `.claude/rules/` | Claude-facing mirrored rule layer |
| `docs/project-docs/` | Contracted documentation surface for repo-specific truth |
| `docs/vibes/skills/` | Reusable operational procedures |
| `docs/vibes/reusable-prompts/` | Reusable prompt files for bootstrap, refresh, and audit workflows |
| `docs/vibes/ADOPTION_GUIDE.md` | Adoption workflow for applying the template in other repositories |

---

## Data / Storage

| Location | Purpose |
| --- | --- |
| `docs/project-docs/` | Required and optional project-doc contract files |
| `docs/vibes/skills/` | Reusable skills that adapt after reading project docs |
| `docs/vibes/reusable-prompts/` | Reusable prompt files for generating and refreshing docs |
| `docs/vibes/ADOPTION_GUIDE.md` | Human guidance for copying and applying the template |
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
- contract consistency checks across rules, skills, reusable prompts, and project docs

See `TESTING.md` for the verification policy.
