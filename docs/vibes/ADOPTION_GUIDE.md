# Template Adoption Guide

Last updated: 2026-05-07

---

## Purpose

Use this guide when you want to copy this template into a new repository and keep rules, skills, prompts, and project documentation aligned.

Normal work starts from the user's prompt, then the agent reads the contract and relevant project docs, uses a skill only when helpful, and produces the output; reusable prompt assets are reserved for bootstrap, refresh, and consistency-audit workflows.

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

---

## Which Mode Am I In?

| If the request sounds like... | Mode | Default path |
| --- | --- | --- |
| build, create, fix, test, review, or analyze a feature or code path | Normal work | User prompt -> instructions -> project docs -> optional skill -> output |
| bootstrap docs, refresh docs, audit consistency, or update template structure | Template or doc maintenance | Reusable prompt asset or maintenance workflow -> contract or docs update |

Use a skill when the task benefits from a reusable method, deeper reasoning, boundary-specific design, structured audit, or verification planning. Explicit user requests to use a skill are stronger than automatic judgment, while attached skill context is only a relevance hint. If the path is already obvious after reading the relevant docs, act directly.

---

## What To Copy

Copy the active template surfaces, including:

- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/prompt/`
- `docs/vibes/skills/`

Do not trim the template before the required docs are populated. Most of the agent behavior depends on the contract and prompt system already being present.
If a repository keeps archival or reference material, keep it outside the active contract and label it clearly.

---

## Minimum Adoption Workflow

1. Copy the template into the new repository.
2. Open `docs/project-docs/TEMPLATE_CONTRACT.md` and confirm the required doc set for the repo.
3. Populate `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md` first.
4. Add optional docs only when they carry durable project truth, such as `GETTING_STARTED.md`, `CHANGELOG.md`, `phases/`, or `guidelines/API.md`.
5. Run a consistency pass so prompts, rules, and skills all point back to the new project docs instead of stale sample facts.

---

## Prompt Workflow

Use the prompt family in this order:

1. `docs/vibes/prompt/00-project-docs-bootstrap.md`
2. `docs/vibes/prompt/00-project-docs-refresh.md` after material project changes
3. `docs/vibes/prompt/00-project-docs-consistency-audit.md` before major template edits or repo handoff

The bootstrap prompt creates the initial shape. The refresh prompt updates only the owning docs. The consistency prompt prevents long-term drift.

If an adopted repository needs a specialized one-off prompt, add it there instead of expanding the template prompt catalog by default.

---

## Quick Routing Examples

| Request | Mode | Likely skill | Reusable prompt asset |
| --- | --- | --- | --- |
| "create evaluation feature api" | Normal work | Optional, usually `api-design` only when the boundary is non-trivial | No |
| "test evaluation feature api" | Normal work | Usually `test-authoring` | No |
| "analyze why evaluation api is flaky" | Normal work | Usually `analysis` or `code-audit` | No |
| "refresh docs after architecture change" | Template or doc maintenance | Optional | Yes, usually the refresh prompt |
| "audit prompt and skill drift" | Template or doc maintenance | Usually `consistency-audit` | Yes, usually the consistency-audit prompt |

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
3. Update prompts only if the contract or expected output shape changed.
4. Update skills or rules only if the procedure changed across projects, not because one repo picked a new stack.
5. Run the consistency audit prompt.

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
