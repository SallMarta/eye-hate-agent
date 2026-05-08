# Template Adoption Guide

Last updated: 2026-05-08

---

## Purpose

Use this guide when you want to adopt this template into another repository and keep the rules, skills, prompts, and project docs aligned.

This guide is for adopters. If you are changing the template itself, use `docs/project-docs/TEMPLATE_MAINTENANCE.md` instead.

Normal work starts from the user's prompt. Reusable prompts are for bootstrap, refresh, and consistency-audit workflows.

The key operating rule is simple:

- keep rules generic
- keep skills procedural
- put project-specific truth in `docs/project-docs/`

When a project changes stacks, frameworks, test runners, or architecture, update the owning project docs first instead of rewriting the rules or skills.

---

## Fast Start

If you only need the first move, use this section.

### Fast Start: New Project

Use this when the target repo is still mostly empty.

1. Copy the template surfaces into the target repo.
2. Keep `TEMPLATE_CONTRACT.md`.
3. Remove `TEMPLATE_MAINTENANCE.md`.
4. Then choose one path:
   run bootstrap if you want docs generated from a brief
   use the starter pack if you want blank docs to fill manually

### Fast Start: Active Project

Use this when the target repo already has active code or partial docs.

1. Copy the template surfaces into the target repo.
2. Keep `TEMPLATE_CONTRACT.md`.
3. Remove `TEMPLATE_MAINTENANCE.md`.
4. Keep the project truth that is still correct.
5. Refresh the docs that should become the active owners.

### Fast Start: Mature Project

Use this when the target repo is already mature and mostly documented.

1. Copy the template surfaces into the target repo.
2. Keep `TEMPLATE_CONTRACT.md`.
3. Remove `TEMPLATE_MAINTENANCE.md`.
4. Run consistency audit first if ownership is unclear.
5. Refresh only the owner docs that actually need to change.

Then continue with the matching detailed section below.

---

## What Belongs Where

The template has four main surfaces:

- `docs/project-docs/` is the active contract layer
- `docs/vibes/` is the reusable asset layer
- `.github/instructions/` and `.claude/rules/` are mirrored platform instruction surfaces
- any clearly named archive or reference path is non-contract by default

If you want blank starter docs in addition to the prompt workflow, use `docs/vibes/project-docs-template/`. Do not treat it as an active contract layer for this repository.

Keep this split in mind:

- `docs/project-docs/` in this repository documents the template repository and how it works
- `docs/vibes/project-docs-template/` is only a downstream starter scaffold for adopted repositories
- `TEMPLATE_CONTRACT.md` and `TEMPLATE_MAINTENANCE.md` stay in the active contract layer because they describe how the template system works, not the truth of one adopted project

---

## Normal Work vs Doc Work

| Request type | Use |
| --- | --- |
| build, fix, test, review, or analyze a code path | normal work |
| bootstrap docs, refresh docs, audit consistency, or update template structure | reusable prompts or template-maintenance workflow |

Reusable prompts are maintenance-only. For the full routing rules, use `docs/project-docs/TEMPLATE_CONTRACT.md`.

---

## What To Copy

Copy the active template surfaces, including:

- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Optional starter asset:

- `docs/vibes/project-docs-template/` when you want a static project-doc scaffold in addition to the reusable prompt workflow

Short chooser:

- copy the starter pack when you want a visible blank scaffold to edit manually
- run bootstrap when you want the first owner docs generated from a project brief

Do not trim the template before the required docs are populated.
Most of the agent behavior depends on the contract and reusable prompt system already being present.
If a repository keeps archival or reference material, keep it outside the active contract and label it clearly.

---

## Keep, Replace, Or Remove In `docs/project-docs/`

When you copy this template into another repository, do not delete `docs/project-docs/`.

Use this rule instead:

- keep `docs/project-docs/TEMPLATE_CONTRACT.md`
- remove `docs/project-docs/TEMPLATE_MAINTENANCE.md` from the adopted repository
- replace the project-specific docs so they describe the adopted repository, not this template repository

Usually replace these files with the adopted repository's truth:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

Replace optional docs only when the adopted repository needs them:

- `GETTING_STARTED.md`
- `CHANGELOG.md`
- `PRD.md`
- `PRODUCTION_RUNBOOK.md`
- `phases/`
- `guidelines/`

Why:

- `TEMPLATE_CONTRACT.md` explains how the project-doc contract works
- `TEMPLATE_MAINTENANCE.md` is governance for maintaining this template repo
- the rest of `docs/project-docs/` should become the adopted repository's own source of truth

You have two safe ways to replace the project-specific docs:

1. run `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` from a project brief
2. copy starter docs from `docs/vibes/project-docs-template/` into `docs/project-docs/` and fill them manually

For a mature or already running repository, do not wipe everything blindly. Keep `TEMPLATE_CONTRACT.md`, remove `TEMPLATE_MAINTENANCE.md`, inventory the current truth, then replace or refresh only the docs that should become the active owners.

---

## Minimum Adoption Workflow

1. Copy the template into the new repository.
2. Open `docs/project-docs/TEMPLATE_CONTRACT.md` and confirm the required docs.
3. Fill the core owner docs first: `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md`.
4. Add optional docs only when they carry real project truth.
5. Run a consistency pass so prompts, rules, and skills point back to the new project docs.

---

## Adoption Scenarios

Use the same template surfaces in each case, but choose a different first workflow depending on how much project truth already exists.

### New Project

Use this when the target repository is still mostly empty.

How to work:

1. Copy the full template surfaces into the repository.
2. Confirm the required doc set in `docs/project-docs/TEMPLATE_CONTRACT.md`.
3. Prepare a project brief before running bootstrap.
4. Run `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` to create the initial project-doc contract.
5. Review the generated owner docs, resolve any `TBD`, `Assumption`, or `Open Question` markers that materially block implementation, and then begin normal work.

Minimum starting inputs:

- repository name or working title
- problem statement and goals
- non-goals or out-of-scope areas
- intended users, stakeholders, or operators
- known stack preferences or constraints, if any
- known delivery or quality constraints, if any

This is the cleanest adoption path. The project docs become the first durable source of truth before the code grows around them.

### Active Project

Use this when the repository already has code, notes, or partial docs, but the contract layer is missing or incomplete.

How to work:

1. Copy the full template surfaces into the repository.
2. Inventory the existing sources of truth: README, existing docs, code structure, test commands, roadmap notes, and active workflows.
3. Map those facts into the contract owners in `docs/project-docs/`.
4. Choose the first reusable prompt based on the state of the existing material:
   - use bootstrap if the current docs are weak, scattered, or missing and you need a first clean contract
   - use refresh if the current docs already mostly match the contract and just need owner-based updates
   - use consistency audit first if the existing docs, code, or summaries disagree about important facts
5. Update owner docs first, then refresh summary docs, then run a consistency pass.

What matters most here is not preserving every old file. What matters is establishing one clear owner for each durable fact.

### Mature Project

Use this when the project is already established and you want the template to support ongoing work without creating ownership confusion.

How to work:

1. Copy the full template surfaces into the repository.
2. Run or simulate a read-only consistency audit first to identify contradictions, stale summaries, duplicated ownership, and historical artifacts.
3. Decide which current docs will become the contract owners under `docs/project-docs/`.
4. Refresh only the owner docs that need to change, then refresh summaries and indexes.
5. Once the contract layer is aligned, use normal work mode for day-to-day development and return to refresh or consistency audit only when the project changes materially.

This path is less about generating a project from scratch and more about giving an existing repository a stable operating model for future work.

#### Mature Project With Its Own Strong Documentation System

Treat this as a mature-project variant, not a separate adoption model.

The workflow shape stays the same:

1. audit current truth first
2. identify contract owners
3. refresh only the owners that need change
4. start normal work once the owner layer is clear

The main difference is the risk.

- for a weak mature repository, the risk is missing or stale project truth
- for a strong mature repository with its own documentation system, the risk is competing ownership between the existing doc system and the contract introduced by this template

How to work:

1. Inventory the existing doc system before changing filenames or headings.
2. Map each durable fact to a single owner: goals, architecture, testing, status, quick reference, and domain-specific rules.
3. Run consistency audit first when the existing doc system is strong but differently structured.
4. Use refresh second to update only the owner docs that need to align with the contract.
5. Avoid keeping two active owners for the same fact just because both systems are well written.

If the existing docs are already close to the contract, this variant is easier. If they are strong but differently structured, treat the adoption as an ownership-mapping exercise before treating it as a documentation rewrite.

---

## Reusable Prompt Decision Guide

Choose the first reusable prompt based on the state of the repository.

| Repository state | Start with | Why |
| --- | --- | --- |
| Empty or nearly empty repository with only a brief | `00-project-docs-bootstrap.md` | You need the first project-doc contract before normal work begins |
| Existing repository where owner docs already exist but are outdated | `00-project-docs-refresh.md` | The contract exists and needs owner-based updates, not a rebuild |
| Existing repository with contradictions, stale summaries, or unclear owners | `00-project-docs-consistency-audit.md` | You need to classify drift before deciding what to update |
| Mature repository with a strong pre-existing documentation system | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | The main task is mapping ownership cleanly before updating the aligned owner docs |
| Existing repository with scattered notes and no reliable contract layer | `00-project-docs-bootstrap.md`, then `00-project-docs-consistency-audit.md` if needed | Bootstrap creates the first clean owner docs; audit helps reconcile leftovers |

After bootstrap:

- use refresh after a material change in scope, stack, workflow, testing policy, or product behavior
- use consistency audit before repo handoff, after major restructuring, or when documentation trust drops

---

## Adding New Optional Docs

When a repository needs a new optional doc such as `PRD.md`, `PRODUCTION_RUNBOOK.md`, `FEATURE_INVENTORY.md`, or a domain-specific guideline, choose the smallest safe path.

Add the new doc manually when:

- the new owner is obvious
- the change is local to one or two docs
- you are not reshaping ownership across the doc set

Use `00-project-docs-refresh.md` when:

- the new doc introduces a durable concern that affects several owner or summary docs
- you need to move detail out of an existing owner into a better owner
- you want the new doc and its dependent summaries updated together

Use `00-project-docs-consistency-audit.md` first when:

- the current docs already overlap or conflict
- you are not sure which doc should own the new truth
- the repository has a mature but differently structured documentation system

The rule is simple: manual for small obvious additions, refresh for coordinated owner updates, consistency audit first when ownership is unclear.

---

## Safe To Start Normal Work

Do not treat the adoption as complete just because the files were copied.

Normal work is ready when:

1. `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md` all exist and reflect the repository's actual state.
2. The owning docs for stack, commands, goals, and progress are clear enough that rules and skills do not need to guess.
3. The repo has either resolved or explicitly marked any material `TBD`, `Assumption`, or `Open Question` that would change implementation behavior.
4. Mirrored rule files still agree with each other.
5. No stale sample-project facts remain in active template-owned surfaces.
6. A consistency pass has been completed after the initial adoption or migration work.

If those conditions are not true yet, stay in bootstrap, refresh, or audit mode rather than assuming the project-doc contract is ready.

---

## Reusable Prompt Workflow

Use the reusable prompt family in this order:

1. `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md`
2. `docs/vibes/reusable-prompts/00-project-docs-refresh.md` after material project changes
3. `docs/vibes/reusable-prompts/00-project-docs-consistency-audit.md` before major template edits or repo handoff

The bootstrap reusable prompt creates the initial shape. The refresh reusable prompt updates only the owning docs. The consistency-audit reusable prompt prevents long-term drift.

If an adopted repository needs a specialized one-off reusable prompt, add it there instead of expanding the template reusable prompt catalog by default.

---

## Ownership Rules

Use these defaults when deciding where information belongs:

| Information type | Owning document |
| --- | --- |
| Product or service goals | `PROJECT.md` |
| Stack and architecture | `ARCHITECTURE.md` |
| Verification commands and gates | `TESTING.md` |
| Sequencing and implementation progress | `STATUS.md` |
| High-signal commands and paths | `QUICK_REFERENCE.md` |
| Domain-specific constraints | `guidelines/*` |

If the same fact appears in multiple files, one file must clearly be the owner and the others should remain summaries.

---

## How To Change A Project Safely

When a project changes materially:

1. Update the owning project doc first.
2. Update any summary doc that quotes it.
3. Update reusable prompts only if the contract or expected output shape changed.
4. Update skills or rules only if the procedure changed across projects, not because one repo picked a new stack.
5. Run the consistency-audit reusable prompt.

Examples:

- a runtime or framework change usually belongs in `ARCHITECTURE.md`, `TESTING.md`, and `QUICK_REFERENCE.md`
- an API boundary change usually belongs in `ARCHITECTURE.md`, any relevant `guidelines/*` doc, and `STATUS.md`
- a new test runner or CI gate belongs in `TESTING.md` first

---

## Template Hygiene Rule

This repository intentionally stays template-only.

- do not keep live sample products in the active template tree
- do not let historical project snapshots become default guidance
- if you keep reference material nearby, place it in an explicitly named non-contract path

If a file starts reading like product requirements for one specific app or service, it no longer belongs in the template repository.
