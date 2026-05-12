# Project Docs Refresh Reusable Prompt

Read `docs/eyehateagent-contract.md` first.

Refresh the existing project documentation after a change in scope, stack, workflow, architecture, testing policy, or product behavior.

## Goal

Update **only the docs that own the changed information** while keeping the documentation set consistent.

## Required Behavior

1. Read the current project docs before editing anything.
2. Use `docs/eyehateagent-contract.md` to identify which files own the changed information.
3. Update only the affected docs and any documents that summarize them.
4. Preserve stable headings wherever possible.
5. Avoid rewriting unrelated sections.
6. If the change introduces a new durable concern, create the smallest justified new doc.
7. If the change affects domain-specific technical guidance, update the owning guideline and `guidelines/INDEX.md` when present.

### Review Sequence

1. Read the change summary.
2. Read the owning project docs.
3. Read the relevant guideline docs when the change touches technical rules or implementation conventions.
4. Identify impacted dependent docs.
5. Refresh the owning docs first.
6. Refresh summary or index docs second.
7. Run a consistency pass.

## Ownership Examples

- stack or dependency changes → `ARCHITECTURE.md`, `TESTING.md`, `QUICK_REFERENCE.md`
- feature scope changes → `PROJECT.md`, `FEATURE_INVENTORY.md`, `STATUS.md`
- detailed requirements or acceptance changes → `PRD.md`, `PROJECT.md`, `STATUS.md`
- workflow or roadmap changes → `STATUS.md`, `phases/INDEX.md`, workflow docs if present
- validation / CI changes → `TESTING.md`, `QUICK_REFERENCE.md`, `GETTING_STARTED.md`
- production environment, rollout, rollback, or smoke-check changes → `PRODUCTION_RUNBOOK.md`, `ARCHITECTURE.md`, `TESTING.md`, `QUICK_REFERENCE.md`
- API or integration changes → relevant API / integration docs plus `ARCHITECTURE.md`
- cross-cutting technical conventions or implementation rules → relevant `guidelines/*.md`, `guidelines/INDEX.md`, and any summarizing core docs that reference them

## Output Contract

Your result should state:

1. which docs were updated
2. why each doc was updated
3. which docs were intentionally left unchanged
4. any remaining consistency risks or open questions

## Final Pass

Before finishing, check that:

1. the updated docs still match the contract in `docs/eyehateagent-contract.md`
2. rules and skills would now read the correct project-specific truth
3. no stale summary remains in `QUICK_REFERENCE.md`, `STATUS.md`, `guidelines/INDEX.md`, or other index docs

## Inputs

Use the change summary, affected artifacts, and current project docs provided below.
