# Project Docs Consistency Audit Reusable Prompt

Read `docs/eyehateagent-contract.md` first.

Audit the repository for **documentation-system drift**.

## Goal

Find mismatches where project docs, rules, skills, reusable prompts, workflow docs, or quick-reference material disagree about the same fact.

## Scope

Check at least these areas when present:

- `docs/project-docs/`
- `docs/project-docs/INDEX.md`
- `docs/project-docs/guidelines/`
- rule / instruction files
- `docs/vibes/skills/`
- `docs/vibes/reusable-prompts/`
- workflow docs and handoff docs

### High-Value Drift Categories

- stack and dependency choices
- test commands and quality gates
- architecture and dependency rules
- optional and conditional regular-doc inventory mismatches
- API / integration ownership
- technical guideline ownership, overlap, and missing guideline index coverage
- workflow expectations
- roadmap / phase naming
- project identity and naming

## Required Behavior

1. Use project docs as the primary source of truth unless the repository explicitly states otherwise.
2. Treat `docs/eyehateagent-contract.md` as the ownership map.
3. Treat `docs/project-docs/INDEX.md` and `docs/project-docs/guidelines/INDEX.md` as the authoritative inventories for optional regular docs and guideline docs when present.
4. Distinguish between:
   - true contradiction
   - stale summary
   - historical artifact
   - optional module not currently active
5. Treat a missing `docs/project-docs/INDEX.md` as drift when optional or conditional regular docs exist beyond the always-required core set.
6. Treat a missing `guidelines/INDEX.md` as drift when guideline files exist.
7. Treat registry entries without matching files and files without matching registry entries as drift unless the registry explicitly marks them deprecated or archived.
8. Treat a missing recommended guideline as drift only when the repo already claims that domain is covered or the repo claims to be fully documented for that domain.
9. Do not fix anything unless explicitly asked.

## Output Contract

For each finding, include:

- severity
- fact in conflict
- source-of-truth file
- conflicting file
- why it matters
- recommended owner to update

## Final Pass

End with:

1. a short list of highest-priority drift items
2. a short list of acceptable historical artifacts that should not be treated as blockers

## Inputs

Use the current repository docs, rule files, skills, reusable prompts, and any relevant workflow or summary artifacts available below.
