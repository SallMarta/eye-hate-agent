# Project Docs Refresh Reusable Prompt

Read `docs/eyehateagent-contract.md` first.

Refresh the existing project documentation after a change in scope, stack, workflow, architecture, testing policy, or product behavior.

## Goal

Update **only the docs that own the changed information** while keeping the documentation set consistent.

## Required Behavior

1. Read the current project docs before editing anything.
2. Use `docs/eyehateagent-contract.md` to identify which files own the changed information.
3. Read `docs/project-docs/INDEX.md` and `docs/project-docs/guidelines/INDEX.md` when present and treat them as the authoritative inventories for optional docs and guideline docs.
4. Update only the affected docs and any documents that summarize them.
5. Preserve stable headings wherever possible.
6. Avoid rewriting unrelated sections.
7. If the change introduces a new durable concern, create the smallest justified new doc.
8. If the change affects an optional regular doc or its metadata, update `docs/project-docs/INDEX.md` when present.
9. If the change affects domain-specific technical guidance, update the owning guideline and `guidelines/INDEX.md` when present.

### Review Sequence

1. Read the change summary.
2. Read the owning project docs.
3. Read `docs/project-docs/INDEX.md` and `docs/project-docs/guidelines/INDEX.md` when present.
4. Read the relevant guideline docs when the change touches technical rules or implementation conventions.
5. Identify impacted dependent docs.
6. Refresh the owning docs first.
7. Refresh summary or index docs second.
8. Run a consistency pass.

## Ownership Examples

- stack or dependency changes → `ARCHITECTURE.md`, `TESTING.md`, `QUICK_REFERENCE.md`
- feature scope changes → `PROJECT.md`, `FEATURE_INVENTORY.md`, `STATUS.md`
- detailed requirements or acceptance changes → `PRD.md`, `PROJECT.md`, `STATUS.md`
- workflow or roadmap changes → `STATUS.md`, `phases/INDEX.md`, workflow docs if present
- validation / CI changes → `TESTING.md`, `QUICK_REFERENCE.md`, `GETTING_STARTED.md`
- production environment, rollout, rollback, or smoke-check changes → `PRODUCTION_RUNBOOK.md`, `ARCHITECTURE.md`, `TESTING.md`, `QUICK_REFERENCE.md`
- API or integration changes → relevant API / integration docs plus `ARCHITECTURE.md`
- optional or conditional doc inventory changes → `docs/project-docs/INDEX.md` plus the affected optional owner docs
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
3. no stale summary remains in `QUICK_REFERENCE.md`, `STATUS.md`, `docs/project-docs/INDEX.md`, `guidelines/INDEX.md`, or other index docs

## Inputs

Use the change summary, affected artifacts, and current project docs provided below.
