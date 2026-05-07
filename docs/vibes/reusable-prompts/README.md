# Reusable Prompt System

Last updated: 2026-05-07

---

## Purpose

This folder contains reusable prompts for repositories that use the **project-aware agent template**.

In this repository, `prompt` means the user's live request.
`Reusable prompt` means the reusable workflow files in this folder.

The reusable prompts in this folder should support one of three jobs:

1. **Bootstrap** a new project's documentation set
2. **Refresh** only the affected docs after a change
3. **Audit consistency** across docs, rules, skills, and reusable prompts

Reusable prompts should not become the long-term home for project-specific truth. They should create or update the project docs that hold that truth.

---

## Source-of-Truth Model

Use this ownership model consistently:

- **Project-specific facts** live in `docs/project-docs/`
- **Reusable procedures** live in `docs/vibes/skills/`
- **Reusable generation / refresh workflows** live in `docs/vibes/reusable-prompts/`
- **Automatic guardrails** live in rule or instruction files

Every reusable prompt should read `docs/project-docs/TEMPLATE_CONTRACT.md` before deciding what docs to create or update.

---

## Core Reusable Prompt Set

| Reusable prompt | Purpose |
| --- | --- |
| `00-project-docs-bootstrap.md` | Create the initial project documentation set for a new repository |
| `00-project-docs-refresh.md` | Update only the affected docs after a scope, stack, or behavior change |
| `00-project-docs-consistency-audit.md` | Find drift between project docs, rules, skills, reusable prompts, and workflow docs |

These `00-*` reusable prompts are the entire reusable baseline for this template repository.

---

## Naming

- Reserve the `00-` prefix for the small canonical project-doc reusable prompt baseline.
- Keep reusable prompt base names semantic, so the job is visible from the filename.
- Add another numbered reusable prompt only when it belongs to the same ordered baseline and the contract documents that sequence.
- Put one-off or repo-specific reusable prompt experiments in the adopted repository, not in this template.

---

## Structure

Every reusable prompt should use these top-level sections:

1. `Goal`
2. `Required Behavior`
3. `Output Contract`
4. `Final Pass`
5. `Inputs`

Add optional top-level sections only when the reusable prompt genuinely needs them, such as `Scope`, `Minimum Outputs`, `Constraints`, or `Ownership Examples`.

---

## Shared Rules For All Reusable Prompts

1. Read `docs/project-docs/TEMPLATE_CONTRACT.md` first.
2. Write project-specific truth into the correct project docs.
3. Preserve stable headings whenever possible.
4. Update only the docs that actually own the changed information.
5. Mark unknowns explicitly instead of inventing details.
6. Prefer fewer, stronger docs over many overlapping notes.
7. If a reusable prompt changes architecture, testing, workflow, or scope, run or recommend a consistency audit.

---

## Recommended Workflow

### Scenario decision summary

Use this quick routing summary when choosing the first reusable prompt. For the full adopter workflow, use `docs/vibes/ADOPTION_GUIDE.md`.

| Repository state | Start with | Why |
| --- | --- | --- |
| Brand-new repository with only a brief or starting facts | `00-project-docs-bootstrap.md` | You need the first project-doc contract before normal work begins |
| Existing repository where owner docs already exist but are outdated | `00-project-docs-refresh.md` | The contract exists and needs owner-based updates rather than regeneration |
| Existing repository with contradictions, stale summaries, or unclear ownership | `00-project-docs-consistency-audit.md` | You need to classify drift before deciding what to update |
| Existing repository with scattered notes and no reliable contract layer | `00-project-docs-bootstrap.md`, then `00-project-docs-consistency-audit.md` if needed | Bootstrap creates the first clean owner docs; audit helps reconcile leftovers |

### New repository

1. Run the bootstrap reusable prompt.
2. Review the generated project docs.
3. Lock or refine `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md`.
4. Let rules and skills operate from those docs.

### Existing repository

1. Run the refresh reusable prompt after a meaningful project change.
2. Update only the docs whose ownership changed.
3. Run the consistency-audit reusable prompt if the change touched stack, workflow, architecture, or verification policy.

---

## Reusable Prompt Hygiene

Keep the reusable prompt layer small.

- add a new template reusable prompt only when it is broadly reusable across adopted repositories
- put project-specific reusable prompt experiments in the adopted repository, not in the template
- prefer improving the three core reusable prompts over growing a large reusable prompt catalog
