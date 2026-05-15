# Project Documentation Contract

## Purpose

This document defines the **canonical project-doc contract** for repositories that use this template.

Its job is to keep three layers aligned:

1. **Instructions / rules** stay generic and reusable.
2. **Skills** stay procedural and reusable.
3. **Project docs** hold the project-specific truth about stack, commands, architecture, testing, workflow, and scope.

If a repository changes stacks, runtime models, or framework choices, the required adjustment should happen primarily in the owning project docs under `docs/project-docs/` rather than by rewriting the core rules or skills.

---

## Operating Model

### Rules and instructions

- Rules enforce behavior, guardrails, and quality expectations.
- Rules must **not** hardcode stack-specific commands or framework assumptions when that information belongs in project docs.
- This repository intentionally keeps the context-compaction trigger of roughly 65% in the mirrored rule files as an agent-operating threshold. Treat it as a deliberate exception to the general preference for principle-based reusable rules.
- Rules should read `docs/eyehateagent-contract.md` and the relevant files in `docs/project-docs/` directly.

### Skills

- Skills define reusable expert-role procedures such as testing, analysis, API design, auditing, or documentation refresh.
- Skills should begin by reading `docs/eyehateagent-contract.md` and the relevant project docs before applying their reusable expert procedure.
- Skills may include examples, but examples must not become hidden project-specific requirements.

### Reusable prompts

- In this repository, `prompt` means the user's live request.
- `Reusable prompt` means a reusable workflow file under `docs/vibes/reusable-prompts/`.
- Reusable prompts create and refresh the project docs.
- Reusable prompts should follow the file responsibilities and stable headings defined in this contract.
- Reusable prompts may be split into bootstrap, refresh, and parity families.

### Runtime Modes

Use two operating modes.

| Mode | Typical request | Default path | Reusable prompts |
| --- | --- | --- | --- |
| Normal work | build, create, fix, test, review, or analyze a feature, bug, or code path | user prompt -> instructions -> `docs/eyehateagent-contract.md` and relevant project docs -> optional skill -> output | No |
| Template or doc maintenance | bootstrap docs, refresh docs after a material change, run parity, or update template structure | maintenance request -> reusable prompt or maintenance workflow -> contract or docs update | Yes, when bootstrap, refresh, or parity is the task |

### Request Routing Examples

| User request | Mode | Read first | Skill | Expected output |
| --- | --- | --- | --- | --- |
| "create evaluation feature api" | Normal work | `docs/eyehateagent-contract.md`, `architecture.md`, `project.md`, `status.md`, and any relevant API docs | Optional, usually `api-design` only if the boundary is non-trivial | Implemented API change or design-ready boundary update |
| "test evaluation feature api" | Normal work | `docs/eyehateagent-contract.md`, `testing.md`, `architecture.md`, and relevant feature docs | Usually `test-authoring` | Verification strategy, recommended checks, and tests when needed |
| "verify this feature against the docs, contract, and code" | Normal work | `docs/eyehateagent-contract.md`, `testing.md`, `architecture.md`, `project.md`, `status.md`, and relevant guidelines or feature docs | Usually `full-verification` | Routed verification path, selected specialist skill, and checks or findings |
| "analyze why evaluation api is flaky" | Normal work | `docs/eyehateagent-contract.md`, `architecture.md`, `testing.md`, `status.md`, and runtime evidence | Usually `analysis` or `code-audit` | Findings, likely cause, and next action |
| "what should we improve before this workflow is production-ready" | Normal work | `docs/eyehateagent-contract.md`, `project.md`, `status.md`, `architecture.md`, `testing.md`, and relevant workflow docs | Usually `project-elevation` | Prioritized improvement roadmap grounded in current scope and maturity |
| "refresh docs after architecture change" | Template or doc maintenance | `docs/eyehateagent-contract.md`, `architecture.md`, and the owning docs | Optional | Updated docs only, usually through the refresh reusable prompt workflow |
| "audit reusable prompt and skill drift" | Template or doc maintenance | `docs/eyehateagent-contract.md`, rule files, reusable prompt files, skill files, and summary docs | Usually `parity` | Drift report and ownership-level fixes |

### Skill Invocation Rule

- Read the relevant contract and project docs first.
- Act directly when the task is local, obvious after reading the docs, and primarily implementation, editing, or straightforward verification.
- Use a skill when the task benefits from a reusable expert-role method, deeper reasoning, boundary-specific design, expert auditing, or expert verification planning.
- If the user explicitly requests a skill, treat that as a stronger signal than automatic judgment and use the skill unless it is clearly irrelevant or unnecessary for the task.
- Treat attached skill context as a relevance hint, not an automatic requirement.
- If a requested or attached skill is clearly unnecessary, say so briefly and proceed directly unless the user insists.
- Use `full-verification` when the user asks for broad verification against project docs, contract, guidelines, code, or repository state and the dominant specialist check is not obvious up front.
- Prefer the single most relevant skill instead of chaining multiple skills by default.
- Skills support execution; they do not replace project docs as the source of truth.

### Skill Selection Matrix

Use this matrix when multiple skills sound plausible.

| If the user mainly wants... | Usually choose | Choose this over... | Expected outcome |
| --- | --- | --- | --- |
| Broad verification against project docs, contract, code, guidelines, or repository state | `full-verification` | a specialist skill when the user wants one broad entry point and the best verification mode is not yet clear | Routed specialist skill, verification plan, and checks or findings |
| Root-cause explanation, trade-off judgment, or architecture reasoning | `analysis` | `project-elevation` when the question is about current behavior or decision quality rather than future improvements | Findings, reasoning, recommendation, and confidence |
| Correctness review of existing code, logic, or boundary safety | `code-audit` | `analysis` when the task is inspecting an implemented artifact for bugs, dead paths, or boundary violations | Severity-ranked findings and corrective direction |
| Contract or boundary shape for an API, service, repository, adapter, or event | `api-design` | `analysis` when the primary deliverable is a contract or interface shape rather than a broad judgment memo | Proposed boundary design, validation rules, and verification strategy |
| Verification boundary, check type, commands, and whether tests should be added | `test-authoring` | `code-audit` when the question is how to verify a change, not whether the implementation is correct | Verification strategy and tests when needed |
| Forward-looking improvements, missing capabilities, or what to do next | `project-elevation` | `analysis` when the task is prioritizing realistic next improvements rather than explaining existing behavior | Prioritized improvement roadmap |
| Drift, contradiction, or ownership mismatches across docs, rules, skills, and prompts | `parity` | `analysis` when the problem is repository-wide disagreement rather than local technical reasoning | Classified drift findings with ownership-level fixes |

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
- If code, tests, configs, or runtime-facing artifacts conflict with active docs and the repository does not explicitly define which side is authoritative for that fact, do not guess; surface the conflict, cite the evidence, and ask the user before choosing the fix path.
- If the repository clearly establishes authority for that fact, state the governing evidence explicitly and proceed using the owning surface.
- When mapping legacy or reference docs into the active owner-doc set, classify them by the durable concern they govern rather than by the legacy folder or filename; legacy names are hints, not the source-of-truth ownership model.
- If legacy or reference docs show that a still-valid optional doc, guideline set, or phased-planning surface should be active under `docs/project-docs/`, promote it into the active owner-doc set and update the relevant registries instead of leaving it only in reference folders.
- If legacy or reference docs contain valuable project-specific information (such as 'Decision Rationale') that does not fit into standard template headings, do not discard it. Evaluate its value and decide whether it should become a new custom section in an existing document or if it warrants a new separate file. If ambiguous, ask the user before discarding the knowledge.
- When no project docs or legacy docs exist and the codebase is the only source of truth, inspect code, comments, commit messages, configs, tests, and repository structure for valuable domain knowledge that goes beyond standard template headings. Surface these findings and decide whether each should become a new custom section in an existing document, a new separate file, or should be confirmed with the user first. Mark codebase-derived facts with lower confidence than doc-derived facts until the user confirms them.
- If the user requests a skill that is clearly unnecessary or mismatched, say so briefly and proceed directly unless the user insists.
- If attached context is outdated or conflicts with active docs, prefer the active docs and treat the attachment as reference only.
- If no suitable skill exists, continue through the direct path using the contract, project docs, and the strongest applicable non-skill method.
- If no stronger validation exists, follow the fallback rules in `testing.md` and state the limitation explicitly.

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

Use the repository in five categories.

| Category | Primary paths | Role |
| --- | --- | --- |
| Platform instruction surfaces | `.github/instructions/`, `.claude/rules/` | Agent-platform specific entry points that enforce generic behavior and point back to the contract and project docs |
| Docs anchors | `docs/eyehateagent-contract.md`, `docs/eyehateagent-maintenance.md` | Documentation-level routing, governance, and template-maintainer anchors |
| Active project docs | `docs/project-docs/` | Canonical project-specific truth for scope, architecture, testing, workflow, and conventions |
| Reusable template assets | `docs/vibes/` | Reusable prompts, skills, and starter assets that operate from the active contract |
| Reference or archive material | explicit non-contract paths such as `archive/`, `reference/`, `docs-legacy/`, `docs-old/`, or other clearly named folders | Historical, migrated, or example material that may inform work but must not override active contract truth |

`docs/eyehateagent-contract.md` plus the owning docs under `docs/project-docs/` form the active contract layer.
Project-specific facts still belong in `docs/project-docs/`.
When present, `docs/eyehateagent-maintenance.md` remains template-repo-only governance and must not become the owner of adopted-repository facts.
When adopting Eye Hate Agent into a repo that already has another documentation format, move the old docs you want to preserve into a clearly non-owner reference folder such as `docs-legacy/`, `docs-old/`, or `archive/legacy-docs/` before refresh.
Reusable prompts may read those folders as reference input during migration, but `docs/project-docs/` remains the only active owner-doc surface.

---

## Supported Adoption Topologies

This contract formally supports two adoption topologies.

| Topology | Status | Contract rule |
| --- | --- | --- |
| Scenario 1 — distributed self-contained repos | Supported default | each adopted repo keeps its own contract, project docs, rule surfaces, and reusable template assets |
| Scenario 2 — shared template repo with local project docs | Supported alternative | each adopted repo keeps its own contract and project docs, while one shared template repo may own reusable assets for multiple adopted repos |
| Scenario 3 — centralized portfolio-doc repo | Not supported by this contract | possible only as a redesign, because it moves project-specific truth out of each adopted repo |

Rules that stay true in both supported topologies:

- each adopted repo keeps its own `docs/eyehateagent-contract.md`
- each adopted repo keeps its own local `docs/project-docs/` as the owner of repo-specific truth
- `docs/eyehateagent-maintenance.md` remains template-repo-only governance
- reusable prompts, reusable skills, and starter assets may be local in each repo or centralized in one shared template repo
- platform instruction surfaces may be centralized only when the agent platform can reliably consume them there; otherwise keep local mirrors that point back to the same contract

Scenario 3 is intentionally outside this contract because it changes the ownership model rather than only changing asset placement.

---

## Required Document Set

| File | Required | Purpose |
| --- | --- | --- |
| `docs/eyehateagent-contract.md` | Yes | Docs anchor for routing, ownership, precedence, stable structures, and adoption rules |
| `project.md` | Yes | Product or service intent, goals, scope, stakeholders, non-goals, success metrics |
| `architecture.md` | Yes | Stack, runtime model, boundaries, integration patterns, dependency rules, core commands |
| `testing.md` | Yes | Verification matrix, commands, quality gates, test layers, manual-check fallback |
| `status.md` | Yes | Roadmap, phases, epic/task status, sequencing, current implementation state |
| `quick-reference.md` | Yes | High-signal commands, paths, conventions, glossary, fast lookup |
| `index.md` | Conditional | Required when optional or conditional regular project docs are active; inventories optional and extended regular doc types for the repo |
| `changelog.md` | Recommended | What changed, by release or milestone |
| `getting-started.md` | Recommended | Setup, local run, environment bootstrap |
| `docs/eyehateagent-maintenance.md` | Optional for template repositories | Template-repo-only governance, lifecycle, deprecation, and maintainer workflow |
| `feature-inventory.md` | Optional | Detailed feature catalog when product scope is large |
| `prd.md` | Optional | Detailed requirements, flows, acceptance criteria, and requirement-level assumptions when `project.md` remains summary-level |
| `production-runbook.md` | Optional | Production environment setup, release, rollback, smoke-check, and recovery guidance when operations need a dedicated owner |
| `phases/index.md` | Optional | Epic registry when phased planning exists |
| `guidelines/index.md` | Conditional | Required when any guideline docs exist; serves as the authoritative registry for active guideline types in the repo |
| `guidelines/*` | Recommended when relevant | Domain-specific technical rules such as API, database, logging, error handling, JSON, code style, and design patterns |

Use optional files only when they add durable value. Do not create them as placeholders without a real purpose.

Use the core project docs in `docs/project-docs/` to describe the repository generally: product intent, scope, architecture, testing, roadmap, and operating context.
Use guideline docs under `docs/project-docs/guidelines/` to capture durable technical direction for a specific domain: conventions, implementation rules, preferred patterns, anti-patterns, and boundary-specific decisions that humans and agents should follow while doing work in that repo.

### Registry Policy

- Keep the always-required core docs explicit in this contract. Do not use a registry to replace `project.md`, `architecture.md`, `testing.md`, `status.md`, or `quick-reference.md`.
- Use `docs/project-docs/index.md` as the authoritative registry for optional and conditional regular project docs in a repo.
- Use `docs/project-docs/guidelines/index.md` as the authoritative registry for active guideline types in a repo.
- A registry entry activates a known optional doc type or guideline type for bootstrap, refresh, and parity behavior even if no starter template file exists.
- Starter template files under `docs/vibes/project-docs-template/` are recommended references, not the activation mechanism.
- Registry entries for regular docs should capture at least file path, purpose, status, owner, and creation trigger.
- Registry entries for guideline docs should capture at least file path, domain, purpose, owner, and review trigger.
- If a brand-new regular doc type should be scaffolded without a starter template file, define its stable headings or equivalent structure in this contract first.

If you want to add your own known optional regular doc type to the template system, add a row to `docs/vibes/project-docs-template/index.md` first.
If you want to add your own known guideline type to the template system, add a row to `docs/vibes/project-docs-template/guidelines/index.md` first.
If the new doc class needs a new stable heading pattern or new ownership rule, update this contract before relying on bootstrap to scaffold it.

### Guideline Policy

- Keep guidelines focused on technical guidance, not on broad project summary; if a fact is general repository truth, it belongs in the core project docs.
- A target repo is fully documented when the core project docs describe the repository generally and the active guidelines describe the durable technical rules that recurring work should follow.
- Create a guideline only when a domain has durable cross-cutting rules that would otherwise be repeated across tasks, reviews, or features.
- When any guideline files exist, create and maintain `guidelines/index.md` as the authoritative registry for the active guideline set.
- Keep one primary domain per guideline file so ownership stays clear.
- Avoid placeholder guideline files; omit a domain until the repository has real guidance worth preserving.
- Avoid copying the same rules into `project.md`, `architecture.md`, `testing.md`, or `prd.md`; instead, cross-reference the owning guideline.
- For a fully documented target repo, the baseline recommended starter set is: API, database, logging, error handling, JSON, code style, and design patterns.
- Add other guideline domains only when the project needs them, such as UI, security, observability, performance, AI, configuration, or migrations.

---

## Stable Headings Agents Can Depend On

These headings should remain stable across projects whenever the file exists. The list of stable headings is a minimum baseline. You may preserve valuable project-specific knowledge from legacy docs or from codebase analysis as new custom headings (e.g., `## Decision Rationale`) alongside these stable headings.

### `project.md`

- `## Summary` or `## Executive Summary`
- `## Problem`
- `## Goals`
- `## Non-Goals`
- `## Stakeholders` or `## Personas`
- `## Success Metrics`

### `architecture.md`

- `## Stack Overview`
- `## Architecture Pattern`
- `## Dependency Rules`
- `## Integrations`
- `## Data / Storage`
- `## Commands` or `## Build and Run`
- `## Testing Stack` (or cross-reference `testing.md`)

### `testing.md`

- `## Verification Policy`
- `## Verification Matrix`
- `## Commands`
- `## Test Layers` or `## Test Types`
- `## Naming and File Conventions`
- `## CI / Release Gates`
- `## Manual Checks`

### `status.md`

- `## Current State`
- `## Roadmap` or `## Execution Map`
- `## Epics` or `## Workstreams`
- `## Risks / Blockers` if tracked

### `quick-reference.md`

- `## Commands`
- `## Paths`
- `## Conventions`
- `## Troubleshooting` or `## Gotchas`

### `index.md` (if present)

- `## Summary`
- `## Core Required Docs`
- `## Optional And Conditional Docs`
- `## Registry Rules`

### `prd.md` (if present)

- `## Summary`
- `## Requirements Scope`
- `## User Journeys` or `## Key Flows`
- `## Functional Requirements`
- `## Non-Functional Requirements`
- `## Acceptance Criteria`
- `## Open Questions` or `## Assumptions`

### `production-runbook.md` (if present)

- `## Summary`
- `## Environment Overview`
- `## Prerequisites and Access`
- `## Release / Deployment Procedure`
- `## Verification / Smoke Checks`
- `## Rollback / Recovery`
- `## Operational Notes` or `## Troubleshooting`

### `docs/eyehateagent-maintenance.md` (if present)

- `## Summary`
- `## Scope`
- `## Ownership Boundaries`
- `## Change Classes`
- `## Compatibility And Breaking Changes`
- `## Deprecation Policy`
- `## Maintainer Workflow`

### `guidelines/index.md` (if present)

- `## Summary`
- `## When To Add A Guideline`
- `## Active Guidelines`
- `## Ownership And Review`

### `guidelines/*.md` (if present)

- `## Summary`
- `## Scope`
- `## Rules`
- `## Preferred Patterns` or `## Approved Patterns`
- `## Anti-Patterns` or `## Avoid`
- `## Related Docs`
- `## Open Questions` or `## Exceptions`

If a project uses different headings, keep a clear cross-reference at the top of the file so agents can still find the equivalent sections quickly.

---

## Naming And Surface Rules

- Keep the anchor filenames stable inside `docs/`: `eyehateagent-contract.md` and `eyehateagent-maintenance.md`.
- Keep the canonical project-doc filenames stable inside `docs/project-docs/`: `project.md`, `architecture.md`, `testing.md`, `status.md`, `quick-reference.md`.
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
- Treat `docs/project-docs/index.md` and `docs/project-docs/guidelines/index.md` as the authoritative inventories for optional regular docs and guideline types when they exist.
- When a fact changes, update the owning project doc first, then update any dependent rules, skills, or reusable prompts that quote or summarize it.
- Mirror platform instruction metadata where the platform supports the same field set.

---

## Ownership Rules

| Type of information | Owning location |
| --- | --- |
| Contract routing, precedence, stable structures, and adoption rules | `docs/eyehateagent-contract.md` |
| Product goals, scope, stakeholders | `project.md` |
| Detailed requirements, flows, and acceptance criteria | `prd.md` if present |
| Stack and architecture decisions | `architecture.md` |
| Production environment operation, release, rollback, and smoke checks | `production-runbook.md` if present |
| Verification commands and quality gates | `testing.md` |
| Execution plan and progress | `status.md` and `phases/` |
| Fast command lookup and conventions | `quick-reference.md` |
| Optional and conditional regular project-doc inventory | `index.md` when present |
| Template governance, lifecycle, and deprecation | `docs/eyehateagent-maintenance.md` if present |
| Guideline inventory, guideline scope, and review ownership | `guidelines/index.md` when present |
| Domain-specific technical rules, implementation conventions, and preferred patterns | `guidelines/*` |
| Reusable prompt behavior | `docs/vibes/reusable-prompts/` in the adopted repo or in the shared template repo chosen by the topology |
| Skill procedure behavior | `docs/vibes/skills/` in the adopted repo or in the shared template repo chosen by the topology |

Do not duplicate the same rule across multiple files unless one file is explicitly a summary or index of the owning document.
In Scenario 2, only reusable assets may centralize. Project-specific facts must remain local to the adopted repo.

---

## How Agents Should Use This Contract

### When writing or updating rules

- Keep the rule generic.
- Point the rule at `docs/eyehateagent-contract.md` and the relevant project docs.
- Preserve the normal-work versus template-maintenance distinction defined in the operating model.
- If a rule defines a default live-response shape, keep it short and treat it as a baseline rather than a universal override.
- Avoid embedding concrete stack-specific commands directly unless the repository has intentionally chosen to keep them in the rule.

### When writing or updating skills

- State the **required project-doc inputs** near the top of the skill.
- Use a stable top-level section model: `Required Project Inputs`, `When To Use`, `Procedure`, `Output Contract`, `Quality Checks`, `Anti-Patterns`, and `Example Requests`.
- Keep skill-specific tables, matrices, and checklists inside those sections instead of inventing new top-level structure for each skill.
- Describe a reusable expert-role procedure that adapts after reading those docs.
- Make the boundary against neighboring skills explicit when routing confusion is likely.
- Avoid binding the skill to one stack, one framework, or one package set unless the skill itself is intentionally stack-specific.

### When writing or updating reusable prompts

- Use this contract to decide which docs to generate or refresh.
- Treat `docs/project-docs/index.md` and `docs/project-docs/guidelines/index.md` as the inventory source of truth for optional regular docs and guideline types when they exist.
- When clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` exist, treat them as secondary migration input only and not as owner docs.
- When mapping legacy artifacts to active docs, use the document's governed concern and content as the primary signal. Do not assume a legacy name must be preserved just because it does not match template terminology.
- When those reference folders contain still-valid optional-doc, guideline, or phased-planning material, promote the justified docs into the active owner-doc set and update the relevant registries instead of leaving the material reference-only.
- Evaluate valuable information from legacy docs or codebase analysis that lacks a standard template heading. Do not discard it; instead, decide whether it should become a new custom section in an existing document or a new separate file, and ask the user if the best approach is ambiguous.
- Use a stable top-level section model: `Goal`, `Required Behavior`, `Output Contract`, `Final Pass`, and `Inputs`.
- Use optional top-level sections only when needed, such as `Scope`, `Minimum Outputs`, `Constraints`, or `Ownership Examples`.
- Keep review sequences, category examples, and file-by-file expectations inside those sections instead of inventing unrelated top-level structure.
- Keep output structure stable.
- Update only the affected docs on refresh reusable prompts.
- Add a consistency pass when changing architecture, testing, or workflow-related docs.

---

## Extension Rules That Must Survive Adoption

These rules belong in the contract because downstream repositories may remove `docs/eyehateagent-maintenance.md`.

| If you are adding or changing... | Update first | Usually also update | Core rule |
| --- | --- | --- | --- |
| a reusable skill | the owning skill file in `docs/vibes/skills/` for the chosen topology | `docs/eyehateagent-contract.md` if the expected skill structure or inputs changed; summaries such as `quick-reference.md` only if discovery changes | keep the skill procedural, expert-role, and start from project docs |
| a rule or instruction point | the mirrored rule files in the owning template surface | `docs/eyehateagent-contract.md` if routing, precedence, fallback, output-by-mode, or ownership changed; `testing.md` if verification expectations changed; local mirrors if a platform requires repo-local instruction loading | keep the rule generic and point back to project docs |
| a project-doc owner or reusable optional doc | the owning doc first; if it becomes template-wide, update `docs/eyehateagent-contract.md` first | `docs/vibes/project-docs-template/` if adopters should get a starter version; onboarding or adoption docs if discovery changes | if only one adopted repository needs it, keep it local to that repository instead of promoting it into the template |
| the contract itself | `docs/eyehateagent-contract.md` | mirrored rules, affected skills, reusable prompts, onboarding docs, summaries, and `changelog.md` | contract changes are highest-impact and should be treated as template-level changes |

Notes:

- Downstream repositories should still be able to follow these rules after `docs/eyehateagent-maintenance.md` is removed.
- Template-repo-only workflow remains in `docs/eyehateagent-maintenance.md`.
- In Scenario 2, the shared template repo is the owner of reusable assets, but not of adopted-repository project facts.
- Registry entries activate known optional doc types and guideline types in a repo; contract updates are needed only when introducing a new doc class, a new stable heading pattern, or a new ownership model.

---

## Adoption Checklists For Supported Topologies

### Scenario 1 — Distributed Self-Contained Repos

1. Copy the template into the adopted repository.
2. Keep `docs/eyehateagent-contract.md`.
3. Populate `project.md`, `architecture.md`, `testing.md`, `status.md`, and `quick-reference.md` under `docs/project-docs/` first.
4. If optional or conditional regular docs are active, declare them in `docs/project-docs/index.md`.
5. If guideline docs are active, declare them in `docs/project-docs/guidelines/index.md`.
6. Remove `docs/eyehateagent-maintenance.md` from the adopted repository.
7. Review rules and skills only for template-level changes, not project-specific facts.
8. Use reusable prompts to create or refresh docs instead of editing many scattered files by hand.

### Scenario 2 — Shared Template Repo With Local Project Docs

1. Keep the shared template repo available in the same workspace or other agent-visible context.
2. Copy `docs/eyehateagent-contract.md` into each adopted repository.
3. Populate `project.md`, `architecture.md`, `testing.md`, `status.md`, and `quick-reference.md` under each adopted repo's local `docs/project-docs/` path.
4. If optional or conditional regular docs are active, declare them in each adopted repo's local `docs/project-docs/index.md`.
5. If guideline docs are active, declare them in each adopted repo's local `docs/project-docs/guidelines/index.md`.
6. Keep reusable prompts, reusable skills, and starter assets in the shared template repo unless a local copy is intentionally needed.
7. Keep local instruction mirrors only when an agent platform requires repo-local instruction loading.
8. Remove `docs/eyehateagent-maintenance.md` from adopted repositories.
9. Do not move adopted-repository project facts into the shared template repo.
10. Run reusable prompts against the adopted repo's local owner docs, not against centralized portfolio summaries.

---

## Change Policy

If this contract changes:

1. Update this file first.
2. Update the rule files that reference it.
3. If one mirrored rule file changes, update the other mirror in the same change unless divergence is intentional and documented.
4. Update any skill or reusable prompt that depends on the old contract.
5. Run a consistency review so the template does not drift.
