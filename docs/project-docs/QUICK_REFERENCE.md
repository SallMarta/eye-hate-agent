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
| `docs/vibes/prompt/` | Reusable prompt assets for bootstrap, refresh, and audit workflows |
| `docs/vibes/skills/` | Reusable skill assets that adapt after reading project docs |
| `docs/vibes/ADOPTION_GUIDE.md` | Adoption workflow for applying the template elsewhere |
| `.github/instructions/` | Copilot instruction surface |
| `.claude/rules/` | Mirrored Claude instruction surface |

---

## Modes

| If the request sounds like... | Mode | Default path |
| --- | --- | --- |
| build, create, fix, test, review, or analyze a feature or code path | Normal work | User prompt -> instructions -> project docs -> optional skill -> output |
| bootstrap docs, refresh docs, audit consistency, or update template structure | Template or doc maintenance | Reusable prompt asset or maintenance workflow -> contract or docs update |

---

## Conventions

- update the owning project doc first, then any summaries or dependent prompt or skill text
- keep rules generic and focused on behavior, not project facts
- keep skills procedural and project-aware, not stack-bound
- use a skill when the task benefits from a reusable method, deeper reasoning, boundary-specific design, structured audit, or verification planning
- explicit user requests to use a skill are stronger than automatic judgment; attached skill context is only a relevance hint
- act directly after reading the docs when the task is local and the path is already obvious
- keep mirrored instruction files aligned by base name and intent
- reserve numeric prompt prefixes for intentionally ordered core prompt sequences
- use optional docs only when they hold durable value
- remove stale sample content instead of preserving it as background clutter

---

## Gotchas

- this repository describes the template itself, not a product built from the template
- if a fact belongs to a specific adopted repo, it should not live in template-owned docs
- platform-specific extensions may differ even when mirrored rule files represent the same logical rule
- mirrored rule files should stay aligned whenever one changes
- contract changes require follow-up updates in rules, skills, and prompts
