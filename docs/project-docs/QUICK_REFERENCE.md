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
| `docs/project-docs/` | Active contract docs and canonical template truth |
| `docs/project-docs/TEMPLATE_MAINTENANCE.md` | Template governance, lifecycle, and maintainer workflow |
| `docs/vibes/reusable-prompts/` | Reusable prompts for bootstrap, refresh, and audit workflows |
| `docs/vibes/project-docs-template/` | Static starter scaffold for manual project-doc adoption |
| `docs/vibes/skills/` | Reusable skill assets that adapt after reading project docs |
| `docs/vibes/ADOPTION_GUIDE.md` | Adoption workflow for applying the template elsewhere |
| `.github/instructions/` | Copilot instruction surface |
| `.claude/rules/` | Mirrored Claude instruction surface |

---

## Modes

| If the request sounds like... | Mode | Default path |
| --- | --- | --- |
| build, create, fix, test, review, or analyze a feature or code path | Normal work | User prompt -> instructions -> project docs -> optional skill -> output |
| bootstrap docs, refresh docs, audit consistency, or update template structure | Template or doc maintenance | Reusable prompt or maintenance workflow -> contract or docs update |

---

## Conventions

- update the owning project doc first
- reusable prompts are maintenance-only; normal work starts from the user's prompt
- precedence: user goal > explicit constraints or skill request > contract and owning docs > attached context > automatic judgment
- act directly when the path is obvious; use a skill only when it adds real method or rigor
- keep mirrored instruction files aligned in the same change
- reserve numeric reusable prompt prefixes for the core reusable prompt baseline
- use `TEMPLATE_CONTRACT.md` for full routing, fallback, and output-by-mode rules

---

## Gotchas

- this repository describes the template itself, not a product built from the template
- if a fact belongs to a specific adopted repo, it should not live in template-owned docs
- platform-specific extensions may differ even when mirrored rule files represent the same logical rule
- mirrored rule files should stay aligned whenever one changes
- contract changes require follow-up updates in rules, skills, and reusable prompts
