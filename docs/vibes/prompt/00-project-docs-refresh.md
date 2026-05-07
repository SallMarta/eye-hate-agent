# Project Docs Refresh Prompt

Read `docs/project-docs/TEMPLATE_CONTRACT.md` first.

Refresh the existing project documentation after a change in scope, stack, workflow, architecture, testing policy, or product behavior.

## Goal

Update **only the docs that own the changed information** while keeping the documentation set consistent.

## Required behavior

1. Read the current project docs before editing anything.
2. Use `TEMPLATE_CONTRACT.md` to identify which files own the changed information.
3. Update only the affected docs and any documents that summarize them.
4. Preserve stable headings wherever possible.
5. Avoid rewriting unrelated sections.
6. If the change introduces a new durable concern, create the smallest justified new doc.

## Required review sequence

1. Read the change summary.
2. Read the owning project docs.
3. Identify impacted dependent docs.
4. Refresh the owning docs first.
5. Refresh summary or index docs second.
6. Run a consistency pass.

## Common ownership examples

- stack or dependency changes → `ARCHITECTURE.md`, `TESTING.md`, `QUICK_REFERENCE.md`
- feature scope changes → `PROJECT.md`, `FEATURE_INVENTORY.md`, `STATUS.md`
- workflow or roadmap changes → `STATUS.md`, `phases/INDEX.md`, workflow docs if present
- validation / CI changes → `TESTING.md`, `QUICK_REFERENCE.md`, `GETTING_STARTED.md`
- API or integration changes → relevant API / integration docs plus `ARCHITECTURE.md`

## Output expectations

Your result should state:

1. which docs were updated
2. why each doc was updated
3. which docs were intentionally left unchanged
4. any remaining consistency risks or open questions

## Final pass

Before finishing, check that:

1. the updated docs still match the contract in `TEMPLATE_CONTRACT.md`
2. rules and skills would now read the correct project-specific truth
3. no stale summary remains in `QUICK_REFERENCE.md`, `STATUS.md`, or other index docs

## Inputs

Use the change summary, affected artifacts, and current project docs provided below.
