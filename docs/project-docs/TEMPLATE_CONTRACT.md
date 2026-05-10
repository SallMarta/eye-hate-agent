# Project Documentation Contract

Last updated: 2026-05-09

---

## Purpose

This document defines the **canonical project-doc contract** for repositories that use this template.

Its job is to keep three layers aligned:

1. **Instructions / rules** stay generic and reusable.
2. **Skills** stay procedural and reusable.
3. **Project docs** hold the project-specific truth about stack, commands, architecture, testing, workflow, and scope.

If a repository changes stacks, runtime models, or framework choices, the required adjustment should happen primarily in the project docs defined here — not by rewriting the core rules or skills.

---

## Operating Model

### Rules and instructions

- Rules enforce behavior, guardrails, and quality expectations.
- Rules must **not** hardcode stack-specific commands or framework assumptions when that information belongs in project docs.
- Rules should read the relevant files in `docs/project-docs/` directly.

### Skills

- Skills define reusable procedures such as testing, analysis, API design, auditing, or documentation refresh.
- Skills should begin by reading the relevant project docs before applying their generic procedure.
- Skills may include examples, but examples must not become hidden project-specific requirements.

### Reusable prompts

- In this repository, `prompt` means the user's live request.
- `Reusable prompt` means a reusable workflow file under `docs/vibes/reusable-prompts/`.
- Reusable prompts create and refresh the project docs.
- Reusable prompts should follow the file responsibilities and stable headings defined in this contract.
- Reusable prompts may be split into bootstrap, refresh, and consistency-audit families.

### Runtime Modes

Use two operating modes.

| Mode | Typical request | Default path | Reusable prompts |
| --- | --- | --- | --- |
| Normal work | build, create, fix, test, review, or analyze a feature, bug, or code path | user prompt -> instructions -> contract and relevant project docs -> optional skill -> output | No |
| Template or doc maintenance | bootstrap docs, refresh docs after a material change, audit consistency, or update template structure | maintenance request -> reusable prompt or maintenance workflow -> contract or docs update | Yes, when bootstrap, refresh, or consistency-audit is the task |

### Request Routing Examples

| User request | Mode | Read first | Skill | Expected output |
| --- | --- | --- | --- | --- |
| "create evaluation feature api" | Normal work | `TEMPLATE_CONTRACT.md`, `ARCHITECTURE.md`, `PROJECT.md`, `STATUS.md`, and any relevant API docs | Optional, usually `api-design` only if the boundary is non-trivial | Implemented API change or design-ready boundary update |
| "test evaluation feature api" | Normal work | `TEMPLATE_CONTRACT.md`, `TESTING.md`, `ARCHITECTURE.md`, and relevant feature docs | Usually `test-authoring` | Tests, verification plan, or test update |
| "analyze why evaluation api is flaky" | Normal work | `TEMPLATE_CONTRACT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and runtime evidence | Usually `analysis` or `code-audit` | Findings, likely cause, and next action |
| "refresh docs after architecture change" | Template or doc maintenance | `TEMPLATE_CONTRACT.md`, `ARCHITECTURE.md`, and the owning docs | Optional | Updated docs only, usually through the refresh reusable prompt workflow |
| "audit reusable prompt and skill drift" | Template or doc maintenance | `TEMPLATE_CONTRACT.md`, rule files, reusable prompt files, skill files, and summary docs | Usually `consistency-audit` | Drift report and ownership-level fixes |

### Skill Invocation Rule

- Read the relevant contract and project docs first.
- Act directly when the task is local, obvious after reading the docs, and primarily implementation, editing, or straightforward verification.
- Use a skill when the task benefits from a reusable method, deeper reasoning, boundary-specific design, structured auditing, or verification planning.
- If the user explicitly requests a skill, treat that as a stronger signal than automatic judgment and use the skill unless it is clearly irrelevant or unnecessary for the task.
- Treat attached skill context as a relevance hint, not an automatic requirement.
- If a requested or attached skill is clearly unnecessary, say so briefly and proceed directly unless the user insists.
- Prefer the single most relevant skill instead of chaining multiple skills by default.
- Skills support execution; they do not replace project docs as the source of truth.

### Decision Precedence

Resolve routing and behavior decisions in this order:

1. the user's requested goal and output
2. the user's explicit constraints or preferences, including an explicit request to use a specific skill
3. the active contract and the owning project docs
4. attached context such as skill files, notes, or examples, treated as relevance hints unless the user made them mandatory
5. automatic agent judgment

If a higher-precedence signal conflicts with a lower one, follow the higher signal unless it is impossible, unsafe, or clearly irrelevant; explain the conflict briefly when that affects the outcome.

### Failure And Fallback Rules

- If a required project doc is missing, note the gap explicitly, create or update the smallest owning doc that unblocks the task, and limit confidence until the gap is resolved.
- If project docs conflict, treat the contract and the owning doc as the source of truth, classify the mismatch as drift, and update the owner or ask the user when ownership is still unclear.
- If the user requests a skill that is clearly unnecessary or mismatched, say so briefly and proceed directly unless the user insists.
- If attached context is outdated or conflicts with active docs, prefer the active docs and treat the attachment as reference only.
- If no suitable skill exists, continue through the direct path using the contract, project docs, and the strongest applicable non-skill method.
- If no stronger validation exists, follow the fallback rules in `TESTING.md` and state the limitation explicitly.

### Output By Mode

| Mode | Must end with |
| --- | --- |
| Normal work | The requested output, the narrowest applicable validation or an explicit limitation, and a documentation-sync update or check when ownership changed |
| Template or doc maintenance | Updated docs, rules, skills, or reusable prompts, a consistency validation step, and any unresolved drift or follow-up items |

These are completion requirements, not a universal response template.

When a repository defines a default live-response shape in its mirrored rule files, treat that shape as a lightweight baseline only.
If multiple output-shape signals apply, use this precedence:

1. the user's explicit format request
2. the active mode or mode-specific agent file
3. the active skill or reusable prompt `Output Contract`
4. the mirrored rule-file default live-response shape
5. the agent's local judgment

---

## Repository Taxonomy

Use the repository in four categories.

| Category | Primary paths | Role |
| --- | --- | --- |
| Platform instruction surfaces | `.github/instructions/`, `.claude/rules/` | Agent-platform specific entry points that enforce generic behavior and point back to project docs |
| Active contract docs | `docs/project-docs/` | Canonical repository truth for scope, architecture, testing, workflow, and conventions |
| Reusable template assets | `docs/vibes/` | Reusable prompts, skills, and adoption guidance that operate from the active contract |
| Reference or archive material | explicit non-contract paths such as `archive/`, `reference/`, or other clearly named folders | Historical or example material that may inform work but must not override active contract truth |

Only `docs/project-docs/` is the active contract layer.
Rules, skills, reusable prompts, and any archive material must defer to that layer when project-specific facts are needed.

---

## Required Document Set

| File | Required | Purpose |
| --- | --- | --- |
| `PROJECT.md` | Yes | Product or service intent, goals, scope, stakeholders, non-goals, success metrics |
| `ARCHITECTURE.md` | Yes | Stack, runtime model, boundaries, integration patterns, dependency rules, core commands |
| `TESTING.md` | Yes | Verification matrix, commands, quality gates, test layers, manual-check fallback |
| `STATUS.md` | Yes | Roadmap, phases, epic/task status, sequencing, current implementation state |
| `QUICK_REFERENCE.md` | Yes | High-signal commands, paths, conventions, glossary, fast lookup |
| `CHANGELOG.md` | Recommended | What changed, by release or milestone |
| `GETTING_STARTED.md` | Recommended | Setup, local run, environment bootstrap |
| `TEMPLATE_MAINTENANCE.md` | Optional for template repositories | Template governance, lifecycle, deprecation, and maintainer workflow |
| `FEATURE_INVENTORY.md` | Optional | Detailed feature catalog when product scope is large |
| `PRD.md` | Optional | Detailed requirements, flows, acceptance criteria, and requirement-level assumptions when `PROJECT.md` remains summary-level |
| `PRODUCTION_RUNBOOK.md` | Optional | Production environment setup, release, rollback, smoke-check, and recovery guidance when operations need a dedicated owner |
| `phases/INDEX.md` | Optional | Epic registry when phased planning exists |
| `guidelines/*` | Optional | Domain-specific rules such as UI, data model, API, AI, security, brand |

Use optional files only when they add durable value. Do not create them as placeholders without a real purpose.

---

## Stable Headings Agents Can Depend On

These headings should remain stable across projects whenever the file exists.

### `PROJECT.md`

- `## Summary` or `## Executive Summary`
- `## Problem`
- `## Goals`
- `## Non-Goals`
- `## Stakeholders` or `## Personas`
- `## Success Metrics`

### `ARCHITECTURE.md`

- `## Stack Overview`
- `## Architecture Pattern`
- `## Dependency Rules`
- `## Integrations`
- `## Data / Storage`
- `## Commands` or `## Build and Run`
- `## Testing Stack` (or cross-reference `TESTING.md`)

### `TESTING.md`

- `## Verification Policy`
- `## Verification Matrix`
- `## Commands`
- `## Test Layers` or `## Test Types`
- `## Naming and File Conventions`
- `## CI / Release Gates`
- `## Manual Checks`

### `STATUS.md`

- `## Current State`
- `## Roadmap` or `## Execution Map`
- `## Epics` or `## Workstreams`
- `## Risks / Blockers` if tracked

### `QUICK_REFERENCE.md`

- `## Commands`
- `## Paths`
- `## Conventions`
- `## Troubleshooting` or `## Gotchas`

### `PRD.md` (if present)

- `## Summary`
- `## Requirements Scope`
- `## User Journeys` or `## Key Flows`
- `## Functional Requirements`
- `## Non-Functional Requirements`
- `## Acceptance Criteria`
- `## Open Questions` or `## Assumptions`

### `PRODUCTION_RUNBOOK.md` (if present)

- `## Summary`
- `## Environment Overview`
- `## Prerequisites and Access`
- `## Release / Deployment Procedure`
- `## Verification / Smoke Checks`
- `## Rollback / Recovery`
- `## Operational Notes` or `## Troubleshooting`

### `TEMPLATE_MAINTENANCE.md` (if present)

- `## Summary`
- `## Scope`
- `## Ownership Boundaries`
- `## Change Classes`
- `## Compatibility And Breaking Changes`
- `## Deprecation Policy`
- `## Maintainer Workflow`

If a project uses different headings, keep a clear cross-reference at the top of the file so agents can still find the equivalent sections quickly.

---

## Naming And Surface Rules

- Keep the canonical project-doc filenames stable: `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, `QUICK_REFERENCE.md`, `TEMPLATE_CONTRACT.md`.
- Name reusable assets by job and scope, not by one adopted project's product name or stack.
- Keep mirrored instruction files aligned by base name and meaning, even when platform-specific extensions or frontmatter fields differ.
- Use numeric prefixes only when a surface is intentionally ordered as a small canonical sequence.
- Prefer semantic names such as `project-docs-refresh` or `code-audit` over vague labels that hide the asset's purpose.
- If a path is reference-only, label it clearly so it cannot be mistaken for active workflow or contract state.

---

## Machine-Readable Conventions

- Keep filenames stable.
- Use explicit headings instead of burying key rules in prose.
- Prefer summary tables for commands, stack, or decision matrices.
- Put the **durable truth** in project docs, not in reusable prompt text or skill text.
- When a fact changes, update the owning project doc first, then update any dependent rules, skills, or reusable prompts that quote or summarize it.
- Mirror platform instruction metadata where the platform supports the same field set.

---

## Ownership Rules

| Type of information | Owning location |
| --- | --- |
| Product goals, scope, stakeholders | `PROJECT.md` |
| Detailed requirements, flows, and acceptance criteria | `PRD.md` if present |
| Stack and architecture decisions | `ARCHITECTURE.md` |
| Production environment operation, release, rollback, and smoke checks | `PRODUCTION_RUNBOOK.md` if present |
| Verification commands and quality gates | `TESTING.md` |
| Execution plan and progress | `STATUS.md` and `phases/` |
| Fast command lookup and conventions | `QUICK_REFERENCE.md` |
| Template governance, lifecycle, and deprecation | `TEMPLATE_MAINTENANCE.md` if present |
| Domain-specific rules | `guidelines/*` |
| Reusable prompt behavior | `docs/vibes/reusable-prompts/` |
| Skill procedure behavior | `docs/vibes/skills/` |

Do not duplicate the same rule across multiple files unless one file is explicitly a summary or index of the owning document.

---

## How Agents Should Use This Contract

### When writing or updating rules

- Keep the rule generic.
- Point the rule at the relevant project docs.
- Preserve the normal-work versus template-maintenance distinction defined in the operating model.
- If a rule defines a default live-response shape, keep it short and treat it as a baseline rather than a universal override.
- Avoid embedding concrete stack-specific commands directly unless the repository has intentionally chosen to keep them in the rule.

### When writing or updating skills

- State the **required project-doc inputs** near the top of the skill.
- Use a stable top-level section model: `Required Project Inputs`, `When To Use`, `Procedure`, `Output Contract`, `Quality Checks`, `Anti-Patterns`, and `Example Requests`.
- Keep skill-specific tables, matrices, and checklists inside those sections instead of inventing new top-level structure for each skill.
- Describe a reusable procedure that adapts after reading those docs.
- Avoid binding the skill to one stack, one framework, or one package set unless the skill itself is intentionally stack-specific.

### When writing or updating reusable prompts

- Use this contract to decide which docs to generate or refresh.
- Use a stable top-level section model: `Goal`, `Required Behavior`, `Output Contract`, `Final Pass`, and `Inputs`.
- Use optional top-level sections only when needed, such as `Scope`, `Minimum Outputs`, `Constraints`, or `Ownership Examples`.
- Keep review sequences, category examples, and file-by-file expectations inside those sections instead of inventing unrelated top-level structure.
- Keep output structure stable.
- Update only the affected docs on refresh reusable prompts.
- Add a consistency pass when changing architecture, testing, or workflow-related docs.

---

## Extension Rules That Must Survive Adoption

These rules belong in the contract because downstream repositories may remove `TEMPLATE_MAINTENANCE.md`.

| If you are adding or changing... | Update first | Usually also update | Core rule |
| --- | --- | --- | --- |
| a reusable skill | the skill file in `docs/vibes/skills/` | `TEMPLATE_CONTRACT.md` if the expected skill structure or inputs changed; summaries such as `QUICK_REFERENCE.md` only if discovery changes | keep the skill procedural and start from project docs |
| a rule or instruction point | both mirrored rule files in the same change | `TEMPLATE_CONTRACT.md` if routing, precedence, fallback, output-by-mode, or ownership changed; `TESTING.md` if verification expectations changed | keep the rule generic and point back to project docs |
| a project-doc owner or reusable optional doc | the owning doc first; if it becomes template-wide, update `TEMPLATE_CONTRACT.md` first | `docs/vibes/project-docs-template/` if adopters should get a starter version; onboarding or adoption docs if discovery changes | if only one adopted repository needs it, keep it local to that repository instead of promoting it into the template |
| the contract itself | `TEMPLATE_CONTRACT.md` | mirrored rules, affected skills, reusable prompts, onboarding docs, summaries, and `CHANGELOG.md` | contract changes are highest-impact and should be treated as template-level changes |

Notes:

- Downstream repositories should still be able to follow these rules after `TEMPLATE_MAINTENANCE.md` is removed.
- Template-repo-only workflow remains in `TEMPLATE_MAINTENANCE.md`.

---

## Adoption Checklist For New Repositories

1. Copy the template into the repository.
2. Populate `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md` first.
3. Add optional docs only when the project actually needs them.
4. Review rules and skills only for template-level changes, not project-specific facts.
5. Use reusable prompts to create or refresh docs instead of editing many scattered files by hand.

---

## Change Policy

If this contract changes:

1. Update this file first.
2. Update the rule files that reference it.
3. If one mirrored rule file changes, update the other mirror in the same change unless divergence is intentional and documented.
4. Update any skill or reusable prompt that depends on the old contract.
5. Run a consistency review so the template does not drift.
