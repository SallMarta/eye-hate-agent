# Project Docs Refresh Reusable Prompt

Refresh, migrate, or create project documentation by combining the **codebase** and any **existing documentation** (active SDD docs, legacy docs, or non-SDD markdown).

## Goal

Update **only the docs that own the changed information** while keeping the documentation set consistent. When creating docs for the first time from existing material, combine codebase evidence with legacy/existing content to produce accurate SDD-compliant documentation.

## Step 0: Doc State Detection

Before refreshing, classify the repository's documentation state:

| State | Condition | Action Path |
| :--- | :--- | :--- |
| **Active SDD** | `docs/project-docs/` exists with SDD-format files (stable headings, 4-layer taxonomy) | Standard refresh: update owning docs, sync dependents |
| **Legacy Only** | `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` exist, but no `docs/project-docs/` | Migration refresh: create SDD docs from legacy content + codebase |
| **Non-SDD Docs** | `docs/` exists with unstructured markdown (no stable headings, no taxonomy) | Conversion refresh: treat as legacy input, create SDD docs from content + codebase |
| **Mixed** | `docs/project-docs/` exists AND legacy/reference folders also exist | Hybrid refresh: update active SDD docs + migrate unmapped legacy content + codebase |

*Note: For Active SDD and Mixed states, also check for the existence of `foundation/phases/` directory and `foundation/changelog.md` to determine if they need active refreshment.*

For **Legacy Only** and **Non-SDD Docs** states, auto-detect the Taxonomy Tier:

- Examine the breadth and depth of the existing documentation + codebase complexity.
- If content covers only core concerns (identity, architecture, status) → Tier 1 (Lite).
- If content includes testing, API, database, or CI/CD concerns → Tier 2 (Standard).
- If content includes governance, security, compliance, observability, i18n, or structured cross-cutting technical conventions (e.g., API rules, error catalogs, logging standards, design-pattern catalogs) → Tier 3 (Enterprise).
- When uncertain, choose the lower tier and note what would trigger upgrade.
- State the auto-detected tier in your output so the user can override it if needed.

**Dynamic Generation from Registry:** Use the master registry embedded below to obtain the universal stable headings schema and the unique domain-specific headings for each document type within the detected or applicable tier. Generate each document dynamically using this structural mapping.

{{REGISTRY:project-docs-template/index.md}}

Proceed to the applicable action path.

## Required Behavior

1. Read the current project docs before editing anything.
2. Use the EHA Project Doc Rules above to identify which files own the changed information.
3. Read `docs/project-docs/index.md` and `docs/project-docs/technical-guidelines/index.md` when present and treat them as the authoritative inventories for optional docs and guideline docs.
4. When clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` exist, read them as migration input only and do not treat them as owner-doc paths.
5. Update only the affected docs and any documents that summarize them.
6. Preserve stable headings wherever possible.
7. Avoid rewriting unrelated sections.
8. If the change introduces a new durable concern, create the smallest justified new doc.
9. If the change affects an optional regular doc or its metadata, update `docs/project-docs/index.md` when present.
10. If the change affects domain-specific technical guidance, update the owning guideline and `technical-guidelines/index.md` when present.
11. When legacy or reference docs are being mapped into the active owner-doc set, classify them by the durable concern they govern rather than by the legacy folder or filename; legacy names are hints only.
12. Normalize non-standard legacy labels by meaning when they map cleanly to an active owner. For example, `epic`, `milestone`, or `roadmap` material may map to `docs/project-docs/foundation/phases/`, while `protocol`, `procedure`, `policy`, or `standard` material may map to `docs/project-docs/technical-guidelines/` when the content is domain-specific technical guidance.
13. When legacy or reference docs show that a justified optional doc should become active under `docs/project-docs/`, promote it into the active owner-doc set instead of leaving it stranded in reference-only folders.
14. When legacy or reference docs contain domain-specific technical guidance that is still valid, create or update the relevant files under `docs/project-docs/technical-guidelines/` and create `technical-guidelines/index.md` when any guideline becomes active.
15. When legacy or reference docs contain explicit phased planning, epic tracking, or execution-map detail that should stay active, create or update `docs/project-docs/foundation/phases/` and register the active optional doc directory in `docs/project-docs/index.md`.
16. If a legacy artifact could plausibly map to more than one active owner, or if preserving the legacy label may be intentional, ask the user for direction instead of guessing.
17. Preserve valuable legacy sections (e.g., 'Decision Rationale') that do not exist in the starter templates. Decide whether this information belongs as a new custom section in an existing document or warrants a new separate file entirely. Ask the user if the best approach is ambiguous. Do not discard domain-specific knowledge just because it lacks a standard template heading.
18. When asking for that direction, prefer a concise question that states the inferred owner and the fallback choices. Example: `I found legacy "protocol" docs that look like technical guidance. Should I 1. skip them, 2. migrate them into active guideline docs, or 3. preserve "protocol" as a project-specific doc type?`
19. When docs are being created for the first time against an existing codebase with no prior documentation, inspect code, comments, configs, tests, and repository structure for valuable domain knowledge that goes beyond standard template headings. Surface these findings as new custom sections or new files where justified. Mark codebase-inferred facts as `Inferred from codebase` or `Open Question` until the user confirms them.
20. **Always cross-reference the codebase.** When creating or updating any SDD document, inspect the relevant source code, configs, tests, package manifests, CI/CD pipelines, and runtime artifacts to verify and enrich the documentation. Do not rely solely on existing docs or legacy material — the codebase is evidence.
21. **When codebase evidence contradicts existing documentation or legacy material, do NOT silently choose one side.** Instead, prompt the user with a concise question and option selection. Example: `I found a drift between the codebase and the docs: [describe the conflict]. Which is correct? 1. The codebase (update the docs to match), 2. The docs (flag the code as needing a fix), or 3. Both are intentionally different (document the exception).` Always present at least these three options. Do not proceed until the user resolves the conflict.
22. When creating SDD docs from legacy + codebase, actively mine:
    - `package.json` / dependency manifests → architecture, stack, testing frameworks
    - CI/CD configs (`.github/workflows/`, `Dockerfile`, etc.) → operations/ci-cd
    - Test directories and test runners → development/testing
    - Database schemas, migrations, ORM configs → development/database
    - API route definitions, controllers, middleware → development/api-contract
    - Environment variables, secrets management → operations/production-runbook
    - Error handling patterns, logging setup → operations/observability-error-handling
    - Auth/RBAC implementations → operations/security-compliance
    - i18n config, locale files → development/internationalization
    - README, inline comments, decision rationale → foundation/prd, architecture
    - Recurring cross-cutting implementation conventions (response envelope, query-builder usage, ID-stripping, caching, error catalog, naming/auth patterns) → `docs/project-docs/technical-guidelines/*.md` via the Technical Guidelines Discovery & Interview step; register in `technical-guidelines/index.md`.
23. Mark all codebase-inferred facts as `Inferred from codebase` until the user confirms them.
24. **Active Development & Phases Detection (MANDATORY).** When refreshing a project that does not yet have `foundation/phases/`, you **MUST** check all four active development signals before proceeding to doc refresh. Do NOT skip this step. The signals are:

    1. **Recent commits** — run `git log --oneline -20` or equivalent; if there are commits within the last 14 days, OR 10+ commits within the last 30 days, this signal is positive.
    2. **Sprint/feature branches** — run `git branch -a` and look for naming patterns like `sprint/`, `phase/`, `release/`, `feature/`, `feat/`, `dev/`.
    3. **Planning artifacts** — check for `TODO.md`, `ROADMAP.md`, `.github/ISSUE_TEMPLATE/`, issue tracker references in recent commits (e.g., `#123`, `fixes #`, `closes #`), or project board configs.
    4. **TODO density** — grep the codebase for `TODO`, `FIXME`, `HACK` comments; if count ≥ 5, this signal is positive.

    If **any one** signal is positive, you **MUST** prompt the user:
    "This project shows active development signals ([list which signals were positive and what was found]).
    Would you like to set up `foundation/phases/` to track your development cycles?
    If yes, describe the current and upcoming phases (or I can infer from your codebase)."

    If the user agrees, create `foundation/phases/index.md` and individual phase files using brownfield naming (`phase-P{N}[-description].md`, e.g., `phase-P1-refactor.md`).
    If the user declines, skip phases creation entirely — but still report the detection outcome in the Output Contract.
    If all four signals are negative, skip the phases prompt but note in your output that all four active development signals were negative and no phases were offered.
25. **Phases Update Workflow.** When `foundation/phases/` already exists, treat it as a living operational document:
    - Update sprint tracker in the active phase file when sprint-related changes are detected.
    - Mark completed phases by updating their status.
    - If the user requests a new phase, create the next numbered phase file and update the index.
    - Cross-reference `foundation/status.md` epics/roadmap with phase progress.

### Review Sequence

1. Run Step 0 (Doc State Detection).
2. Read the change summary (if provided) or the user's intent.
3. **Scan the codebase** — inspect source code, configs, tests, CI/CD pipelines, and package manifests for current truth. This step is NOT optional.
4. **Phases Detection Gate** — If `foundation/phases/` does not exist, execute Rule 24 (Active Development & Phases Detection) now. Run all four signal checks using the codebase data from step 3. If any signal is positive, prompt the user about setting up phases before continuing. If `foundation/phases/` already exists, proceed to step 5.
5. Read the owning project docs (if Active SDD or Mixed state).
6. Read `docs/project-docs/index.md` and `docs/project-docs/technical-guidelines/index.md` when present.
7. Read legacy/reference folders when present.
8. Read relevant guideline docs when the change touches technical rules.
9. **Technical Guidelines Discovery & Interview.** Building on the codebase scan, identify **durable cross-cutting implementation conventions** that are (a) NOT already documented under `docs/project-docs/technical-guidelines/`, and (b) referenced across **multiple features or domains** (not owned by a single standard doc). Examples: API response envelope shape, error-handling/error-constant discipline, logging conventions, naming schemes, dynamic query-builder usage, in-memory cache patterns, public/private response transformation, authentication/identity conventions. For each candidate note: the convention, why it is durable + cross-cutting, and a codebase evidence citation (`file:line`). Then present the candidates to the user and ask which (if any) to formalize:

   - **User approves one or more** → generate `technical-guidelines/<convention>.md` for each using the **Guideline Stable Headings** baseline (`## 1. Summary`, `## 2. Scope`, `## 3. Rules`, `## 4. Preferred Patterns`, `## 5. Anti-Patterns`, `## 6. Related Docs`, `## 7. Open Questions`), with **real rules inferred from the codebase — never placeholder stubs**; consult the guidelines registry embedded below for extended domain-specific headings. Register each new file in `technical-guidelines/index.md` and link it from `docs/project-docs/index.md`.

{{REGISTRY:project-docs-template/technical-guidelines/index.md}}
   - **User declines** → skip creation; still record the surfaced candidates in the Output Contract.
   - **No candidates found** → skip silently (do not prompt).

   This mirrors `eha-bootstrap`'s "Technical Guidelines Interview" so behavior is consistent across both commands.
10. Identify impacted dependent docs.
11. Cross-reference codebase findings against doc/legacy claims — resolve conflicts by prompting the user (see rule 21).
12. Refresh/create the owning docs first (using combined codebase + docs evidence).
13. Refresh summary or index docs second.
14. Run a consistency pass.

## Ownership Examples

For each mapping below, also inspect the corresponding codebase artifacts (source files, configs, tests) to verify and enrich the documentation.

- stack or dependency changes → `foundation/architecture.md`, `development/testing.md`
- feature scope changes → `foundation/prd.md`, `foundation/status.md`
- detailed requirements or acceptance changes → `foundation/prd.md`, `foundation/status.md`
- workflow or roadmap changes → `foundation/status.md`, `foundation/phases/` index/phase files, workflow docs if present
- validation / CI changes → `development/testing.md`, `getting-started.md`
- production environment, rollout, rollback, or smoke-check changes → `operations/production-runbook.md`, `foundation/architecture.md`, `development/testing.md`
- API or integration changes → relevant API / integration docs plus `foundation/architecture.md`
- security or compliance changes → `operations/security-compliance.md`
- observability, logging, or error-handling changes → `operations/observability-error-handling.md`
- optional or conditional doc inventory changes → `docs/project-docs/index.md` plus the affected optional owner docs
- cross-cutting technical conventions or implementation rules → relevant `technical-guidelines/*.md`, `technical-guidelines/index.md`, and any summarizing core docs that reference them
- codebase-derived cross-cutting conventions (not only legacy-derived ones) surfaced during refresh → `docs/project-docs/technical-guidelines/*.md` via the Technical Guidelines Discovery & Interview step, registered in `technical-guidelines/index.md`
- documentation-system migration from legacy docs → active owner docs under `docs/project-docs/` first, with `docs-legacy/`, `docs-old/`, or other clearly named archive/reference folders used only as source material
- semantic legacy-name normalization → map legacy names by content, for example `epic` or `roadmap` material to `foundation/phases/` and `protocol` or `standard` material to `technical-guidelines/` when their governed concern matches those owners
- legacy technical-guidance promotion → `docs/project-docs/technical-guidelines/*.md`, `technical-guidelines/index.md`, and any summarizing core docs that now depend on those active guidelines
- legacy phased-planning promotion → `docs/project-docs/foundation/phases/`, `foundation/status.md`, and `docs/project-docs/index.md`

## Output Contract

Your result should state:

1. which docs were updated or created
2. why each doc was updated or created
3. which docs were intentionally left unchanged
4. any remaining consistency risks or open questions
5. which codebase-vs-doc conflicts were resolved and how (per user direction)
6. the auto-detected tier (for Legacy Only / Non-SDD states), if applicable
7. whether active development signals were detected, which signals were positive/negative, and whether the user was prompted about `foundation/phases/` setup (include the user's response: accepted, declined, or not yet answered)
8. **Technical Guidelines Discovery outcome:** any durable cross-cutting conventions surfaced (each with evidence), which the user approved for guideline creation, and which guideline files were created/registered (or "none surfaced / user declined").

## Final Pass

Before finishing, check that:

1. the updated docs still match the EHA Project Doc Rules above
2. platform instruction surfaces and skills would now read the correct project-specific truth
3. no stale summary remains in `foundation/status.md`, `docs/project-docs/index.md`, `technical-guidelines/index.md`, or other index docs
4. codebase-inferred facts are clearly marked and do not silently override user-confirmed truths
5. the auto-detected tier (for Legacy Only / Non-SDD states) is stated in the output so the user can override it if needed
6. if `foundation/phases/` did not exist at the start of this refresh and any active development signal was positive, confirm that the user was prompted about setting up phases — if this prompt was skipped, **stop and prompt the user now before finishing**
7. if the Technical Guidelines Discovery & Interview surfaced candidates, confirm the user was prompted and the outcome (created / declined / none) is reported in the Output Contract.

## Inputs

Use the change summary, affected artifacts, current project docs, legacy/reference docs, AND the current codebase (source code, configs, tests, CI/CD, package manifests) provided below.
