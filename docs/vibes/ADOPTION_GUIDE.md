# Template Adoption Guide

Last updated: 2026-05-07

---

## Purpose

Use this guide when you want to copy this template into a new repository and keep rules, skills, reusable prompts, and project documentation aligned.

This guide is for adopters. If you are changing the template itself, use `docs/project-docs/TEMPLATE_MAINTENANCE.md` for maintainer workflow, lifecycle, and deprecation decisions.

Normal work starts from the user's prompt, then the agent reads the contract and relevant project docs, uses a skill only when helpful, and produces the output; reusable prompts are reserved for bootstrap, refresh, and consistency-audit workflows.

The key operating rule is simple:

- keep rules generic
- keep skills procedural
- put project-specific truth in `docs/project-docs/`

When a project changes stacks, frameworks, test runners, or architecture, update the owning project docs first instead of rewriting the rules or skills.

---

## Template Surfaces

Treat the template as four surfaces with different jobs:

- `docs/project-docs/` is the active contract layer
- `docs/vibes/` is the reusable asset layer
- `.github/instructions/` and `.claude/rules/` are mirrored platform instruction surfaces
- any clearly named archive or reference path is non-contract by default

If you want a static starter scaffold in addition to the prompt-based workflow, use `docs/vibes/project-docs-template/` as a reusable asset. Do not treat it as an active contract layer for this repository.

---

## Which Mode Am I In?

| If the request sounds like... | Mode | Default path |
| --- | --- | --- |
| build, create, fix, test, review, or analyze a feature or code path | Normal work | User prompt -> instructions -> project docs -> optional skill -> output |
| bootstrap docs, refresh docs, audit consistency, or update template structure | Template or doc maintenance | Reusable prompt or maintenance workflow -> contract or docs update |

Reusable prompts are maintenance-only. For routing examples, precedence, fallback, and output-by-mode rules, use `docs/project-docs/TEMPLATE_CONTRACT.md`.

---

## What To Copy

Copy the active template surfaces, including:

- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Optional reusable starter asset:

- `docs/vibes/project-docs-template/` when you want a static project-doc scaffold in addition to the reusable prompt workflow

Short chooser:

- copy the starter pack when you want a visible blank scaffold to edit manually
- run bootstrap when you want the first owner docs generated from a project brief

Do not trim the template before the required docs are populated. Most of the agent behavior depends on the contract and reusable prompt system already being present.
If a repository keeps archival or reference material, keep it outside the active contract and label it clearly.

---

## Minimum Adoption Workflow

1. Copy the template into the new repository.
2. Open `docs/project-docs/TEMPLATE_CONTRACT.md` and confirm the required doc set for the repo.
3. Populate `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md` first.
4. Add optional docs only when they carry durable project truth, such as `GETTING_STARTED.md`, `CHANGELOG.md`, `phases/`, or `guidelines/API.md`.
5. Run a consistency pass so reusable prompts, rules, and skills all point back to the new project docs instead of stale sample facts.

---

## Adoption Scenarios

Use the same template surfaces in each scenario, but choose a different first workflow depending on how much project truth already exists.

### Scenario 1 — Brand-New Repository

Use this path when the repository is effectively empty and the template is your starting capital.

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

This is the cleanest adoption path. The project docs become the first durable source of truth before code grows around them.

### Scenario 2 — Partially Started Repository

Use this path when the repository already has some folders, code, notes, or documentation, but the contract layer is missing or incomplete.

How to work:

1. Copy the full template surfaces into the repository.
2. Inventory the existing sources of truth: README, existing docs, code structure, test commands, roadmap notes, and active workflows.
3. Map those facts into the contract owners in `docs/project-docs/`.
4. Choose the first reusable prompt based on the state of the existing material:
   - use bootstrap if the current docs are weak, scattered, or missing and you need a first clean contract
   - use refresh if the current docs already mostly match the contract and just need owner-based updates
   - use consistency audit first if the existing docs, code, or summaries disagree about important facts
5. Update owner docs first, then refresh summary docs, then run a consistency pass.

What matters most here is not preserving every old file. What matters is establishing one clear owner for each durable fact so rules and skills stop guessing.

### Scenario 3 — Mature Existing Repository

Use this path when the project is already established and you want the template to support ongoing work such as feature delivery, bug fixing, refactoring, API changes, and documentation maintenance.

How to work:

1. Copy the full template surfaces into the repository.
2. Run or simulate a read-only consistency audit first to identify contradictions, stale summaries, duplicated ownership, and historical artifacts.
3. Decide which current docs will become the contract owners under `docs/project-docs/`.
4. Refresh only the owner docs that need to change, then refresh summaries and indexes.
5. Once the contract layer is aligned, use normal work mode for day-to-day development and return to refresh or consistency audit only when the project changes materially.

This path is less about generating a project from scratch and more about giving an existing repository a stable operating model for future work.

#### Scenario 3 Sub-Variant — Mature Repository With Its Own Strong Documentation System

Treat this as a Scenario 3 variant, not a separate adoption model.

The workflow shape stays the same:

1. audit current truth first
2. identify contract owners
3. refresh only the owners that need change
4. start normal work once the owner layer is clear

The difference is the main risk.

For a weak mature repository, the risk is missing or stale project truth.
For a strong mature repository with its own documentation system, the risk is competing ownership between the existing doc system and the contract introduced by this template.

How to work:

1. Inventory the existing doc system before changing filenames or headings.
2. Map each durable fact to a single owner: goals, architecture, testing, status, quick reference, and domain-specific rules.
3. Run consistency audit first when the existing doc system is strong but differently structured.
4. Use refresh second to update only the owner docs that need to align with the contract.
5. Avoid keeping two active owners for the same fact just because both systems are well written.

If the existing docs are already close to the contract, this variant becomes an easier Scenario 3. If they are strong but differently structured, treat the adoption as an ownership-mapping exercise before treating it as a documentation rewrite.

---

## Reusable Prompt Decision Guide

Choose the first reusable prompt based on the state of the repository, not on habit.

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
