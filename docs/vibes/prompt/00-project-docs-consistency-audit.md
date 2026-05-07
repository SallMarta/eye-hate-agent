# Project Docs Consistency Audit Prompt

Read `docs/project-docs/TEMPLATE_CONTRACT.md` first.

Audit the repository for **documentation-system drift**.

## Goal

Find mismatches where project docs, rules, skills, prompts, workflow docs, or quick-reference material disagree about the same fact.

## Scope

Check at least these areas when present:

- `docs/project-docs/`
- rule / instruction files
- `docs/vibes/skills/`
- `docs/vibes/prompt/`
- workflow docs and handoff docs

## High-value drift categories

- stack and dependency choices
- test commands and quality gates
- architecture and dependency rules
- API / integration ownership
- workflow expectations
- roadmap / phase naming
- project identity and naming

## Required behavior

1. Use project docs as the primary source of truth unless the repository explicitly states otherwise.
2. Treat `TEMPLATE_CONTRACT.md` as the ownership map.
3. Distinguish between:
   - true contradiction
   - stale summary
   - historical artifact
   - optional module not currently active
4. Do not fix anything unless explicitly asked.

## Output format

For each finding, include:

- severity
- fact in conflict
- source-of-truth file
- conflicting file
- why it matters
- recommended owner to update

## Final pass

End with:

1. a short list of highest-priority drift items
2. a short list of acceptable historical artifacts that should not be treated as blockers
