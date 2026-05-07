# Quick Reference — Template Repository

Last updated: 2026-05-07

---

## Commands

| Command | Purpose |
| --- | --- |
| `rg --files docs/project-docs` | List the core project-doc contract files |
| `rg "<term>" docs/` | Find stale names, commands, or ownership drift |
| `git diff -- docs/` | Review template doc changes before handoff |
| editor diagnostics / markdown lint | Catch formatting and structural issues |

---

## Paths

| Path | Purpose |
| --- | --- |
| `docs/project-docs/` | Repo-level project docs and contract files |
| `docs/vibes/prompt/` | Prompt modules for bootstrap, refresh, and audit workflows |
| `docs/vibes/skills/` | Reusable skills that adapt after reading project docs |
| `.github/instructions/` | Copilot instruction surface |
| `.claude/rules/` | Mirrored Claude instruction surface |

---

## Conventions

- update the owning project doc first, then any summaries or dependent prompt or skill text
- keep rules generic and focused on behavior, not project facts
- keep skills procedural and project-aware, not stack-bound
- use optional docs only when they hold durable value
- remove stale sample content instead of preserving it as background clutter

---

## Gotchas

- this repository describes the template itself, not a product built from the template
- if a fact belongs to a specific adopted repo, it should not live in template-owned docs
- mirrored rule files should stay aligned whenever one changes
- contract changes require follow-up updates in rules, skills, and prompts
