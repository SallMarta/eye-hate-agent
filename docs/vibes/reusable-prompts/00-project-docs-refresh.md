# Project Docs Refresh Reusable Prompt

Read `docs/eyehateagent-contract.md` first.

Refresh the existing project documentation after a change in scope, stack, workflow, architecture, testing policy, or product behavior.

## Goal

Update **only the docs that own the changed information** while keeping the documentation set consistent.

## Required Behavior

1. Read the current project docs before editing anything.
2. Use `docs/eyehateagent-contract.md` to identify which files own the changed information.
3. Read `docs/project-docs/INDEX.md` and `docs/project-docs/guidelines/INDEX.md` when present and treat them as the authoritative inventories for optional docs and guideline docs.
4. When clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` exist, read them as migration input only and do not treat them as owner-doc paths.
5. Update only the affected docs and any documents that summarize them.
6. Preserve stable headings wherever possible.
7. Avoid rewriting unrelated sections.
8. If the change introduces a new durable concern, create the smallest justified new doc.
9. If the change affects an optional regular doc or its metadata, update `docs/project-docs/INDEX.md` when present.
10. If the change affects domain-specific technical guidance, update the owning guideline and `guidelines/INDEX.md` when present.
11. When legacy or reference docs show that a justified optional doc should become active under `docs/project-docs/`, promote it into the active owner-doc set instead of leaving it stranded in reference-only folders.
12. When legacy or reference docs contain domain-specific technical guidance that is still valid, create or update the relevant files under `docs/project-docs/guidelines/` and create `guidelines/INDEX.md` when any guideline becomes active.
13. When legacy or reference docs contain explicit phased planning, epic tracking, or execution-map detail that should stay active, create or update the relevant files under `docs/project-docs/phases/`, including `phases/INDEX.md`, and register the active optional doc in `docs/project-docs/INDEX.md`.

### Review Sequence

1. Read the change summary.
2. Read the owning project docs.
3. Read `docs/project-docs/INDEX.md` and `docs/project-docs/guidelines/INDEX.md` when present.
4. Read clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` when the repo is migrating from another documentation format.
5. Decide whether any legacy material should be promoted into active optional docs such as `guidelines/` or `phases/` instead of staying reference-only.
6. Read the relevant guideline docs when the change touches technical rules or implementation conventions.
7. Identify impacted dependent docs.
8. Refresh the owning docs first.
9. Refresh summary or index docs second.
10. Run a consistency pass.

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
- documentation-system migration from legacy docs → active owner docs under `docs/project-docs/` first, with `docs-legacy/`, `docs-old/`, or other clearly named archive/reference folders used only as source material
- legacy technical-guidance promotion → `docs/project-docs/guidelines/*.md`, `guidelines/INDEX.md`, and any summarizing core docs that now depend on those active guidelines
- legacy phased-planning promotion → `docs/project-docs/phases/INDEX.md`, the relevant phase or epic docs, `STATUS.md`, and `docs/project-docs/INDEX.md`

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
