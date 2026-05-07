# Prompt System

Last updated: 2026-05-07

---

## Purpose

This folder contains reusable prompts for repositories that use the **project-aware agent template**.

The prompts in this folder should support one of three jobs:

1. **Bootstrap** a new project's documentation set
2. **Refresh** only the affected docs after a change
3. **Audit consistency** across docs, rules, skills, and prompts

The prompts should not become the long-term home for project-specific truth. They should create or update the project docs that hold that truth.

---

## Source-of-Truth Model

Use this ownership model consistently:

- **Project-specific facts** live in `docs/project-docs/`
- **Reusable procedures** live in `docs/vibes/skills/`
- **Reusable generation / refresh workflows** live in `docs/vibes/prompt/`
- **Automatic guardrails** live in rule or instruction files

Every reusable prompt should read `docs/project-docs/TEMPLATE_CONTRACT.md` before deciding what docs to create or update.

---

## Core Prompt Set

| Prompt | Purpose |
| --- | --- |
| `00-project-docs-bootstrap.md` | Create the initial project documentation set for a new repository |
| `00-project-docs-refresh.md` | Update only the affected docs after a scope, stack, or behavior change |
| `00-project-docs-consistency-audit.md` | Find drift between project docs, rules, skills, prompts, and workflow docs |

These `00-*` prompts are the entire reusable baseline for this template repository.

---

## Naming

- Reserve the `00-` prefix for the small canonical project-doc prompt baseline.
- Keep prompt base names semantic, so the job is visible from the filename.
- Add another numbered prompt only when it belongs to the same ordered baseline and the contract documents that sequence.
- Put one-off or repo-specific prompt experiments in the adopted repository, not in this template.

---

## Shared Rules For All Reusable Prompts

1. Read `docs/project-docs/TEMPLATE_CONTRACT.md` first.
2. Write project-specific truth into the correct project docs.
3. Preserve stable headings whenever possible.
4. Update only the docs that actually own the changed information.
5. Mark unknowns explicitly instead of inventing details.
6. Prefer fewer, stronger docs over many overlapping notes.
7. If a prompt changes architecture, testing, workflow, or scope, run or recommend a consistency audit.

---

## Recommended Workflow

### New repository

1. Run the bootstrap prompt.
2. Review the generated project docs.
3. Lock or refine `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md`.
4. Let rules and skills operate from those docs.

### Existing repository

1. Run the refresh prompt after a meaningful project change.
2. Update only the docs whose ownership changed.
3. Run the consistency-audit prompt if the change touched stack, workflow, architecture, or verification policy.

---

## Prompt Hygiene

Keep the prompt layer small.

- add a new template prompt only when it is broadly reusable across adopted repositories
- put project-specific prompt experiments in the adopted repository, not in the template
- prefer improving the three core prompts over growing a large prompt catalog
