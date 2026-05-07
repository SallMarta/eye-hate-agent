# Project Documentation Contract

Last updated: 2026-05-07

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

### Prompts

- Prompts create and refresh the project docs.
- Prompts should follow the file responsibilities and stable headings defined in this contract.
- Prompts may be split into bootstrap, refresh, and consistency-audit families.

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
Rules, skills, prompts, and any archive material must defer to that layer when project-specific facts are needed.

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
| `FEATURE_INVENTORY.md` | Optional | Detailed feature catalog when product scope is large |
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
- Put the **durable truth** in project docs, not in prompt text or skill text.
- When a fact changes, update the owning project doc first, then update any dependent rules, skills, or prompts that quote or summarize it.
- Mirror platform instruction metadata where the platform supports the same field set.

---

## Ownership Rules

| Type of information | Owning location |
| --- | --- |
| Product goals, scope, stakeholders | `PROJECT.md` |
| Stack and architecture decisions | `ARCHITECTURE.md` |
| Verification commands and quality gates | `TESTING.md` |
| Execution plan and progress | `STATUS.md` and `phases/` |
| Fast command lookup and conventions | `QUICK_REFERENCE.md` |
| Domain-specific rules | `guidelines/*` |
| Prompt system behavior | `docs/vibes/prompt/` |
| Skill procedure behavior | `docs/vibes/skills/` |

Do not duplicate the same rule across multiple files unless one file is explicitly a summary or index of the owning document.

---

## How Agents Should Use This Contract

### When writing or updating rules

- Keep the rule generic.
- Point the rule at the relevant project docs.
- Avoid embedding concrete stack-specific commands directly unless the repository has intentionally chosen to keep them in the rule.

### When writing or updating skills

- State the **required project-doc inputs** near the top of the skill.
- Use a stable top-level section model: `Required Project Inputs`, `When To Use`, `Procedure`, `Output Contract`, `Quality Checks`, `Anti-Patterns`, and `Example Requests`.
- Keep skill-specific tables, matrices, and checklists inside those sections instead of inventing new top-level structure for each skill.
- Describe a reusable procedure that adapts after reading those docs.
- Avoid binding the skill to one stack, one framework, or one package set unless the skill itself is intentionally stack-specific.

### When writing or updating prompts

- Use this contract to decide which docs to generate or refresh.
- Keep output structure stable.
- Update only the affected docs on refresh prompts.
- Add a consistency pass when changing architecture, testing, or workflow-related docs.

---

## Adoption Checklist For New Repositories

1. Copy the template into the repository.
2. Populate `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md` first.
3. Add optional docs only when the project actually needs them.
4. Review rules and skills only for template-level changes, not project-specific facts.
5. Use prompts to create or refresh docs instead of editing many scattered files by hand.

---

## Change Policy

If this contract changes:

1. Update this file first.
2. Update the rule files that reference it.
3. Update any skill or prompt that depends on the old contract.
4. Run a consistency review so the template does not drift.
