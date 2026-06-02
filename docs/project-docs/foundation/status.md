# Status

Last update: 2026-06-02

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
EHA has reached `1.0.8` stability. The codebase has fully migrated to a robust nested domain taxonomy (`docs/templates/skills/`), has been streamlined under a Single Master Registry structure, uses NPM Provenance via OIDC for deployment, consolidates doc-lifecycle workflows from 5 commands to 4, and fully supports multi-agent setups, targeted single-agent removals (Option B), and a streamlined "All Agents" CLI installation menu.

## 8. Recent Accomplishments
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
- Refined success logs to print non-deterministic, friendly instruction headers and documented local development testing options (npm link, direct Node execution, local file dependencies) in `maintaining.md`.
- Rewrote Lite Mode (Rule 3.2) to support contextual auto-recognition of micro-tasks without requiring a magic prefix.
- Removed redundant README files for Claude and Antigravity, eliminating the unused `.agents/commands/` directory.
- Redesigned development phases to use a conditional `foundation/phases/` folder structure (index and individual files) dynamically offered based on active development signals during bootstrap and refresh.
- Added step 0.5 greenfield detection in bootstrap to prompt empty repos to start with discussion first.
- Added support for descriptive phase filename suffixes (`phase-{N}[-description].md` / `phase-P{N}[-description].md`).

## 9. Upcoming Focus
Refining additional IDE adapters as needed and tracking ecosystem adoption.

## 10. Key Metrics Health
- NPM Version: 1.0.8
- Registry Size: 3 templates files (Single Master Registry `index.md`, Guidelines registry `technical-guidelines/index.md`).
- Workflow Commands: 4 (bootstrap, refresh, discuss, execute).
- Reusable Prompts: 4 files (2 doc-lifecycle + 2 SDD-lifecycle).

## 11. Roadmap
| Workstream | Status | Notes |
| --- | --- | --- |
| Template Parity | Completed | Aligned EHA internal docs to new Single Registry and modern taxonomy |
| Agent Support | Live | Claude, Copilot, Antigravity |

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
