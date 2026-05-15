# Project Docs Refresh Reusable Prompt

Read `docs/eyehateagent-contract.md` first.

Refresh the existing project documentation after a change in scope, stack, workflow, architecture, testing policy, or product behavior.

## Goal

Update **only the docs that own the changed information** while keeping the documentation set consistent.

## Required Behavior

1. Read the current project docs before editing anything.
2. Use `docs/eyehateagent-contract.md` to identify which files own the changed information.
3. Read `docs/project-docs/index.md` and `docs/project-docs/guidelines/index.md` when present and treat them as the authoritative inventories for optional docs and guideline docs.
4. When clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` exist, read them as migration input only and do not treat them as owner-doc paths.
5. Update only the affected docs and any documents that summarize them.
6. Preserve stable headings wherever possible.
7. Avoid rewriting unrelated sections.
8. If the change introduces a new durable concern, create the smallest justified new doc.
9. If the change affects an optional regular doc or its metadata, update `docs/project-docs/index.md` when present.
10. If the change affects domain-specific technical guidance, update the owning guideline and `guidelines/index.md` when present.
11. When legacy or reference docs are being mapped into the active owner-doc set, classify them by the durable concern they govern rather than by the legacy folder or filename; legacy names are hints only.
12. Normalize non-standard legacy labels by meaning when they map cleanly to an active owner. For example, `epic`, `milestone`, or `roadmap` material may map to `docs/project-docs/phases/`, while `protocol`, `procedure`, `policy`, or `standard` material may map to `docs/project-docs/guidelines/` when the content is domain-specific technical guidance.
13. When legacy or reference docs show that a justified optional doc should become active under `docs/project-docs/`, promote it into the active owner-doc set instead of leaving it stranded in reference-only folders.
14. When legacy or reference docs contain domain-specific technical guidance that is still valid, create or update the relevant files under `docs/project-docs/guidelines/` and create `guidelines/index.md` when any guideline becomes active.
15. When legacy or reference docs contain explicit phased planning, epic tracking, or execution-map detail that should stay active, create or update the relevant files under `docs/project-docs/phases/`, including `phases/index.md`, and register the active optional doc in `docs/project-docs/index.md`.
16. If a legacy artifact could plausibly map to more than one active owner, or if preserving the legacy label may be intentional, ask the user for direction instead of guessing.
17. Preserve valuable legacy sections (e.g., 'Decision Rationale') that do not exist in the starter templates. Decide whether this information belongs as a new custom section in an existing document or warrants a new separate file entirely. Ask the user if the best approach is ambiguous. Do not discard domain-specific knowledge just because it lacks a standard template heading.
18. When asking for that direction, prefer a concise question that states the inferred owner and the fallback choices. Example: `I found legacy "protocol" docs that look like technical guidance. Should I 1. skip them, 2. migrate them into active guideline docs, or 3. preserve "protocol" as a project-specific doc type?`
19. When docs are being created for the first time against an existing codebase with no prior documentation, inspect code, comments, configs, tests, and repository structure for valuable domain knowledge that goes beyond standard template headings. Surface these findings as new custom sections or new files where justified. Mark codebase-inferred facts as `Inferred from code` or `Open Question` until the user confirms them.

### Review Sequence

1. Read the change summary.
2. Read the owning project docs.
3. Read `docs/project-docs/index.md` and `docs/project-docs/guidelines/index.md` when present.
4. Read clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` when the repo is migrating from another documentation format.
5. Decide whether any legacy material should be promoted into active optional docs such as `guidelines/` or `phases/` instead of staying reference-only, using content and governed concern as the primary signal rather than legacy names.
6. Read the relevant guideline docs when the change touches technical rules or implementation conventions.
7. Identify impacted dependent docs.
8. Refresh the owning docs first.
9. Refresh summary or index docs second.
10. Run a consistency pass.

## Ownership Examples

- stack or dependency changes → `architecture.md`, `testing.md`, `quick-reference.md`
- feature scope changes → `project.md`, `feature-inventory.md`, `status.md`
- detailed requirements or acceptance changes → `prd.md`, `project.md`, `status.md`
- workflow or roadmap changes → `status.md`, `phases/index.md`, workflow docs if present
- validation / CI changes → `testing.md`, `quick-reference.md`, `getting-started.md`
- production environment, rollout, rollback, or smoke-check changes → `production-runbook.md`, `architecture.md`, `testing.md`, `quick-reference.md`
- API or integration changes → relevant API / integration docs plus `architecture.md`
- optional or conditional doc inventory changes → `docs/project-docs/index.md` plus the affected optional owner docs
- cross-cutting technical conventions or implementation rules → relevant `guidelines/*.md`, `guidelines/index.md`, and any summarizing core docs that reference them
- documentation-system migration from legacy docs → active owner docs under `docs/project-docs/` first, with `docs-legacy/`, `docs-old/`, or other clearly named archive/reference folders used only as source material
- semantic legacy-name normalization → map legacy names by content, for example `epic` or `roadmap` material to `phases/` and `protocol` or `standard` material to `guidelines/` when their governed concern matches those owners
- legacy technical-guidance promotion → `docs/project-docs/guidelines/*.md`, `guidelines/index.md`, and any summarizing core docs that now depend on those active guidelines
- legacy phased-planning promotion → `docs/project-docs/phases/index.md`, the relevant phase or epic docs, `status.md`, and `docs/project-docs/index.md`

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
3. no stale summary remains in `quick-reference.md`, `status.md`, `docs/project-docs/index.md`, `guidelines/index.md`, or other index docs

## Inputs

Use the change summary, affected artifacts, and current project docs provided below.
