# Status

Last update: 2026-08-27

Status: Live

---

## 1. Description

This dashboard provides a high-level overview of the current maturity and health of the EHA repository. (Note: This dashboard is updated automatically by the EHA agent).

## 2. Important

Ensure this document is updated when major refactoring or releases occur.

## 3. Table of Contents

- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Goals](#5-goals)
- [6. Non Goals](#6-non-goals)
- [7. Current State](#7-current-state)
- [8. Recent Accomplishments](#8-recent-accomplishments)
- [9. Upcoming Focus](#9-upcoming-focus)
- [10. Key Metrics Health](#10-key-metrics-health)
- [11. Roadmap](#11-roadmap)
- [12. Epics](#12-epics)
- [13. Risks / Blockers](#13-risks--blockers)
- [14. Success Metrics](#14-success-metrics)
- [15. Related Documents](#15-related-documents)
- [16. Open Questions](#16-open-questions)

## 4. Scope

High-level repository health and status.

## 5. Goals

Serve as a quick dashboard to see the state of EHA.

## 6. Non Goals

Does not track granular tasks.

## 7. Current State

EHA stands at `1.5.0` with **16 skills** governed by a **Skill Naming Standard** — a closed verb taxonomy (`design`/`build`/`generate`/`analyze`/`audit`/`test`/`refactor`), object rules (narrowest scope, no language/framework names), and CI enforcement via the N1 test. Skills carry real one-line descriptions that adapters propagate to generated files. `eha remove` / `eha uninstall` sweep EHA namespaces to clean up files orphaned by past skill/workflow renames, while preserving user files and sentinel content.

## 8. Recent Accomplishments

- Overhauled **removal hygiene** in `eha remove` / `eha uninstall`: removal now sweeps each adapter's namespace roots (`projectSweepRoots` / `deviceSweepRoots`) for `eha-`-prefixed entries in addition to manifest-listed files, healing orphans left behind whenever a renamed skill/workflow dropped out of the manifest (e.g. `build-observability` → `build-logging`). Also fixed three removal bugs: full project remove deleted user content in sentinel-managed root files (`GEMINI.md`/`HERMES.md`/`AGENTS.md`) instead of stripping only the EHA block; targeted `eha remove` for gemini/hermes/opencode crashed on a missing import; and a targeted gemini uninstall stripped the shared `~/.gemini/GEMINI.md` block while antigravity was still installed. Sentinel filename checks are now centralized in `SENTINEL_FILENAMES` (shared.js). (v1.5.0)
- Established the **Skill Naming Standard**: closed verb taxonomy (`design`/`build`/`generate`/`analyze`/`audit`/`test`/`refactor`), object rules (narrowest scope, no language/framework names), namespace boundaries, and a frontmatter description minimum — documented as Recipe 1 Step 0 in the Maintainer Reference and enforced by a new N1 test in CI. Adapters now propagate real skill descriptions to generated files (previously a stub), with five skills' placeholder descriptions backfilled. (v1.4.1)
- Replaced **`build-observability`** with the narrower **`build-logging`** skill (logs only — metrics/tracing out of scope, language-agnostic: factual flow tracing, pipe-delimited format, one-exit failure log, layered PII masking) and added the new **`generate-task-tracker`** skill (evidence-driven task tracker tables from git history + optional project docs, every row traces to a commit/diff/doc line). Skill count is now 16. Also backfilled the `/eha-help` skill list with `analyze-design`, `generate-api-contract`, and `generate-fsd` (pre-existing gap from v1.4.0). (v1.4.1)
- Applied **verb-first naming convention** to all 15 skills (breaking change): every skill name now follows `<verb>-<object>` (`design-api`, `audit-code`, `analyze-system`, `generate-fsd`, `test-system`, `build-ci-cd`, etc.). Two new skills added: `analyze-design` (design → business analysis), `generate-fsd` (source doc → FSD). Renamed subagent `wraps:` references, the `/eha-help` workflow, and all 56 test assertions accordingly. (v1.4.0)
- Added **OpenCode** as the sixth supported agent target. Workflows and skills map to `.opencode/commands/eha-<name>.md` slash commands, subagents land in `.opencode/agents/`, and rules are sentinel-injected into `AGENTS.md` (project) and written to `~/.opencode/rules/eha-agent-rules.md` (device). Also added the language-agnostic **`generate-api-contract`** skill for documenting existing API endpoints, and extended sentinel cleanup to cover `AGENTS.md` (and the previously missing `HERMES.md`) on uninstall. (v1.3.0)
- Added **Hermes** (by Nous Research) as the fifth supported agent target. Workflows and skills map to auto-registered `~/.hermes/skills/eha-<name>/SKILL.md` slash commands, subagents land in `.hermes/agents/`, and rules are sentinel-injected into `HERMES.md` (project) and `~/.hermes/SOUL.md` (device). (v1.2.0)
- Implemented the `/eha-execute-phase` workflow to execute specific project phases from `docs/project-docs/foundation/phases/`. It features a phase readiness check gate, interactive discuss-style spec enrichment for thin phases, menu-based task selection, and automatic status updates written back to the phase sprint tracker. (v1.1.1)
- Renamed the `researcher` subagent to `analyst` (`eha-analyst`) and updated registry definitions, tests, and documentation. (v1.1.1)
- Added **subagents** as a fourth artifact type: isolated specialist agents (`eha-security`, `eha-tester`, `eha-parity`, `eha-analyst`) that wrap existing skills, generated across Claude, Copilot, Antigravity, and Gemini CLI in both project and device scopes.
- Closed the `technical-guidelines/` taxonomy gap: bootstrap now generates the Tier 3 registry and runs a codebase-scanning interview to produce real guidelines (never stubs); refresh now runs its own Technical Guidelines Discovery & Interview to surface **and create** guidelines from codebase conventions, and sdd-execute surfaces candidates for refresh/bootstrap to formalize.
- Implemented **Gemini CLI** support via `.gemini/` adapter and sentinel boundaries for `GEMINI.md`.
- Restored the interactive auto-updater so users can upgrade EHA globally directly from the CLI prompt without manually running `npm install`.
- Refined Antigravity local workflow path generation to target flat `.md` files instead of nested `SKILL.md` objects.
- Expanded PRD references to comprehensively document output paths for all supported agents (Antigravity, Copilot, Claude, Gemini CLI).
- Corrected device-level paths for Antigravity (`~/.gemini/config/skills/`) and Copilot (`~/.copilot/skills/` and `~/.copilot/instructions/eha-agent-rules.instructions.md`).
- Implemented a unified interactive CLI wizard running from bare `eha`, replacing separate setup commands.
- Added support for device-level (global/user) configuration scopes (`~/.claude/`, `~/.copilot/`, `~/.gemini/`).
- Designed and implemented sentinel marker management (`<!-- EHA:START -->` / `<!-- EHA:END -->`) for safely maintaining the shared Antigravity rules file (`GEMINI.md`). Claude uses a dedicated modular rules file (`~/.claude/rules/eha-agent-rules.md`).
- Added an `eha uninstall` CLI command for device-level configuration cleanup.
- Replaced Gemini with Antigravity natively, relocating rules to dedicated `.agents/rules/` directory.
- Streamlined templates directory under a Single Master Registry catalog index (`index.md`) and guidelines catalog index, completely removing redundant boilerplate files.
- Globally renamed EHA 4-layer taxonomy's third layer from `technical/` to `development/` across engine rules, templates, specialist skills, workflow prompts, tests, and EHA's internal docs.
- Consolidated high-overlap specialist skills and documents (observability/error-handling, security/compliance, phases/feature-inventory) under Tier 3.
- Clarified that humans and AI agents are fully authorized to append custom domain-specific headings during documentation generation tasks to accurately capture codebase realities.
- Automated GitHub Actions publishing pipeline.
- Consolidated doc-lifecycle prompts from 3 (bootstrap, parity, refresh) to 2 (bootstrap, refresh). Retired `/eha-parity` command; upgraded `parity-audit` skill to absorb all behavioral rules. Rewrote Refresh with mandatory codebase cross-referencing and user-prompted drift resolution.
- Upgraded EHA configuration and manifests to accumulate multiple installed agents simultaneously.
- Implemented targeted uninstallation supporting `eha remove [agent]`, preserving other agents' files.
- Added a numbered selection menu with a stabilized default option and a new "All Agents" initialization command.
- Refined success logs to print non-deterministic, friendly instruction headers and documented local development testing options (npm link, direct Node execution, local file dependencies) in `MAINTAINER-README.md`.
- Rewrote Lite Mode (Rule 3.2) to support contextual auto-recognition of micro-tasks without requiring a magic prefix.
- Removed redundant README files for Claude and Antigravity, eliminating the unused `.agents/commands/` directory.
- Redesigned development phases to use a conditional `foundation/phases/` folder structure (index and individual files) dynamically offered based on active development signals during bootstrap and refresh.
- Added step 0.5 greenfield detection in bootstrap to prompt empty repos to start with discussion first.
- Added support for descriptive phase filename suffixes (`phase-{N}[-description].md` / `phase-P{N}[-description].md`).
- Hardened phases detection with mandatory Rule 24 language, 4 concrete signal checks with specific commands/thresholds, a Phases Detection Gate in the Review Sequence, and safety nets in Final Pass and Output Contract for both refresh and bootstrap templates.
- Changed phases detection from silent-skip to always-visible reporting, ensuring agent decisions about phases are transparent to the user.

## 9. Upcoming Focus

Refining additional IDE adapters as needed and tracking ecosystem adoption.

## 10. Key Metrics Health

- NPM Version: 1.5.0
- Supported Agents: 6 (Claude, Copilot, Antigravity, Gemini CLI, Hermes, OpenCode).
- Skills: 16 (design-api, design-db-schema, design-ui-ux, design-wireframe, analyze-design, analyze-system, audit-code, audit-parity, audit-security, generate-api-contract, generate-fsd, generate-task-tracker, test-system, build-ci-cd, build-logging, refactor).
- Registry Size: 3 templates files (Single Master Registry `index.md`, Guidelines registry `technical-guidelines/index.md`).
- Workflow Commands: 5 (bootstrap, refresh, discuss, sdd-execute, execute-phase).
- Reusable Prompts: 6 files (1 help + 2 doc-lifecycle + 3 execution-lifecycle).
- Subagents: 4 (security, tester, parity, analyst).

## 11. Roadmap

| Workstream | Status | Notes |
| --- | --- | --- |
| Template Parity | Completed | Aligned EHA internal docs to new Single Registry and modern taxonomy |
| Agent Support | Live | Claude, Copilot, Antigravity, Gemini CLI, Hermes, OpenCode; subagents generated for all six |

## 12. Epics

None.

## 13. Risks / Blockers

None.

## 14. Success Metrics

Accurate reflection of the repository state.

## 15. Related Documents

- [Changelog](changelog.md) - History of completed phases.

## 16. Open Questions

None.
