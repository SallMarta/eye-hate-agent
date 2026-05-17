# Changelog — Eye Hate Agent

All notable changes to Eye Hate Agent are documented here.

---

## [1.11.0] - 2026-05-18

### Added

- Added `## 7. Contract Essentials` section to all three mirrored agent rule files (`.claude/rules/agent-rules.md`, `.github/instructions/agent-rules.instructions.md`, `.agents/rules/agent.md`). Extracts four critical behavioral rules from the contract that agents need on every task: skill invocation override, decision precedence order, core fallback behaviors, and completion requirements. This ensures agents follow these rules even when they don't open the full contract.

### Changed

- Refined all three agent rule files: tightened wording for knowledge preservation, format precedence, approach description, and merged scattered verification rules into a single completion bullet in § 7.

### Removed

- Removed redundant contract file-reading trigger (line 43) from all rule files — § 7 Contract Essentials now covers what agents would find there.
- Removed template-maintainer guidance ("Keep reusable rules free of stack-specific commands...") from always-on rules — this belongs in the contract's authoring section, not in agent behavior rules.

---

## [1.10.0] - 2026-05-16

### Added in 1.10.0

- Added explicit rules and guidance across the contract, reusable prompts, and agent rules for preserving valuable project-specific knowledge from legacy documentation (e.g., 'Decision Rationale') even if it lacks a standard template heading. Agents are now instructed to evaluate whether such information should become a new custom section in an existing document or a new separate file, and to ask the user if the best approach is ambiguous.
- Added explicit rules for codebase-only knowledge discovery during documentation bootstrap and refresh. When no legacy docs exist, agents now inspect code, comments, configs, tests, and repository structure for valuable domain knowledge and surface it as custom sections or files, marking codebase-inferred facts with lower confidence until the user confirms them.

---

## [1.9.0] - 2026-05-15

### Changed in 1.9.0

- Renamed the `consistency-audit` workflow family to `parity` across the reusable prompt, matching skill, routing docs, README guidance, and verification guidance so the user-facing and internal names stay aligned.
- Retired the old `00-project-docs-consistency-audit.md` and `docs/vibes/skills/consistency-audit/` paths so only the canonical parity surfaces remain in the active template.

---

## [1.8.0] - 2026-05-15

### Changed in 1.8.0

- Expanded the consistency-audit prompt and related contract and skill surfaces so audits can inspect current implementation evidence when code and docs disagree, and require an ask-the-user pause when authority between docs and code is not explicit.
- Tightened `00-project-docs-refresh.md` so legacy or reference folders such as `docs-old/` and `docs-legacy/` can promote still-valid optional docs, active guideline sets, and phased-planning docs into `docs/project-docs/` instead of being left stranded in reference-only paths.
- Clarified README Step 3 with explicit migration guidance and example prompts for promoting legacy `guidelines/` and `phases/` material during refresh-oriented adoption.
- Added a narrow contract-level migration rule so reusable prompts promote justified legacy optional docs into the active owner-doc set and update the relevant registries.
- Refined the contract, refresh prompt, consistency-audit prompt, and README so legacy docs are mapped by governed concern and content rather than by legacy folder or filename.
- Added representative semantic-normalization examples such as `epic` or `roadmap` mapping to phased-planning owners and `protocol` or `standard` mapping to guideline owners when their content matches those concerns.
- Added an explicit ask-the-user fallback pattern for ambiguous legacy mappings so agents do not silently guess when a legacy label may need to be preserved or may map to multiple active owners.

---

## [1.7.0] - 2026-05-13

### Added in 1.7.0

- Added a README `Legend` section that defines repo-specific terms in plain language for adopters and maintainers.

### Changed in 1.7.0

- Made legacy-doc migration explicit across the README, contract, and reusable prompts by treating clearly named folders such as `docs-legacy/` as reference input instead of active owner docs.
- Condensed README Step 3 into a smaller scenario guide and migration checklist that is easier for both humans and agents to scan.
- Simplified more README wording outside the Legend so the main guide uses less contract-heavy language.
- Merged the README navigation and registry-extension guidance into one shorter `Key Paths` section and removed redundant file-summary sections.
- Rephrased the README explanation of regular docs versus guidelines with simpler language and clearer examples.
- Reworked README Step 3 into a shorter tutorial-style flow with one explicit procedure for new repos, existing docs, and legacy-doc migration.

### Removed in 1.7.0

- Removed one more redundant recap from README Step 3 so the prompt-selection flow reads more directly.
- Removed two advanced Legend terms and shortened the README guideline example list so the guide stays lighter for first-time readers.

---

## [1.6.0] - 2026-05-12

### Added in 1.6.0

- Added explicit maintainer-facing anchors for where to register new optional regular doc types and guideline types.
- Added a registry-driven extension model for optional regular docs and guideline types.
- Added a starter `docs/vibes/project-docs-template/index.md` registry and retuned reusable prompts to treat registries as inventory sources of truth.
- Added a local `docs/project-docs/testing.md` owner doc for template-maintenance validation rules.
- Added a recommended starter guideline pack and a required `guidelines/index.md` when guideline files exist.
- Added starter guideline templates and updated reusable prompts and maintainer docs to keep guideline guidance consistent.
- Added a central skill-selection matrix in `docs/eyehateagent-contract.md` to separate analysis, audit, design, verification, elevation, and consistency work more clearly.
- Added a new `full-verification` skill as the broad verification entry point for code, docs, contracts, architecture, quality, and project-health checks.

### Changed in 1.6.0

- Refreshed `README.md` with a table of contents, a clearer file index, and more explicit registry-driven extension entry points.
- Clarified the contract split between core project docs and technical guideline docs.
- Tightened `project-elevation` so it is explicitly forward-looking rather than a generic analysis wrapper.
- Clarified `test-authoring` as a verification-strategy-first skill that chooses the right checks before writing tests.
- Updated the contract and overlapping specialist skills so broad verification requests route cleanly to `full-verification` before choosing a single best specialist path.

---

## [1.5.0] - 2026-05-12

### Added in 1.5.0

- Added a repository index to `README.md` and refreshed the adoption examples to show the new contract layout.

### Changed in 1.5.0

- Moved the canonical template anchors under `docs/` as `docs/eyehateagent-contract.md` and `docs/eyehateagent-maintenance.md`.
- Retargeted the mirrored rules, reusable prompts, skills, and changelog references to the new docs-anchor paths.
- Refined the contract and maintenance wording to match the new docs-anchor model while preserving the 65% context-compaction exception.

---

## [1.4.0] - 2026-05-11

### Added in 1.4.0

- Added template governance through `docs/eyehateagent-maintenance.md`.

### Changed in 1.4.0

- Moved the contract anchors to the repository root and retargeted live references.
- Formalized Scenario 2 support in `docs/eyehateagent-contract.md` while keeping Scenario 3 outside the contract.
- Turned `README.md` into the main operator guide with a chained adoption flow: topology, target project category, and starter reusable prompt.

### Removed in 1.4.0

- Removed standalone adoption-guide surfaces that are now absorbed into the root `README.md`.

---

## [1.3.0] - 2026-05-10

### Changed in 1.3.0

- Simplified the mirrored rule files and clarified response-shape precedence through `docs/eyehateagent-contract.md`.
- Shifted template verification back to a document-first, human-reviewed maintenance flow.

### Removed in 1.3.0

- Removed outdated sample-oriented docs from the active template tree.

---

## [1.2.0] - 2026-05-09

### Changed in 1.2.0

- Refined contract, testing, quick-reference, and maintenance docs for clearer ownership and consistency.
- Updated `README.md` and mirrored rules to better match the template workflow and terminology.

---

## [1.1.0] - 2026-05-08

### Added in 1.1.0

- Added the root `README.md` as the first human-facing adoption guide.
- Added optional starter docs for `prd.md` and `production-runbook.md`.

### Changed in 1.1.0

- Clarified keep, replace, and remove rules for copying the template into target repositories.
- Tightened starter-pack and reusable-prompt guidance for downstream doc management.

---

## [1.0.0] - 2026-05-07

### Added in 1.0.0

- Initial release of the template foundation with project-doc owner files, mirrored agent rules, reusable prompts, and reusable skills.
- Added the first downstream adoption guide and the starter scaffold under `docs/vibes/project-docs-template/`.
- Added starter `getting-started.md` and `changelog.md` for the scaffold.

### Changed in 1.0.0

- Elevated reusable prompts as a first-class template surface and standardized skill documentation for clearer guidance.
