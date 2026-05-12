# Changelog — Eye Hate Agent

All notable changes to Eye Hate Agent are documented here.

---

## [Unreleased]

- Added a local `docs/project-docs/TESTING.md` owner doc for template-maintenance validation rules.
- Clarified the contract split between core project docs and technical guideline docs.
- Added a recommended starter guideline pack and a required `guidelines/INDEX.md` when guideline files exist.
- Added starter guideline templates and updated reusable prompts and maintainer docs to keep guideline guidance consistent.
- Added a central skill-selection matrix in `docs/eyehateagent-contract.md` to separate analysis, audit, design, verification, elevation, and consistency work more clearly.
- Tightened `project-elevation` so it is explicitly forward-looking rather than a generic analysis wrapper.
- Clarified `test-authoring` as a verification-strategy-first skill that chooses the right checks before writing tests.
- Added a new `full-verification` skill as the broad verification entry point for code, docs, contracts, architecture, quality, and project-health checks.
- Updated the contract and overlapping specialist skills so broad verification requests route cleanly to `full-verification` before choosing a single best specialist path.

---

## [2.0.0] - 2026-05-12

- Moved the canonical template anchors under `docs/` as `docs/eyehateagent-contract.md` and `docs/eyehateagent-maintenance.md`.
- Retargeted the mirrored rules, reusable prompts, skills, and changelog references to the new docs-anchor paths.
- Added a repository index to `README.md` and refreshed the adoption examples to show the new contract layout.
- Refined the contract and maintenance wording to match the new docs-anchor model while preserving the 65% context-compaction exception.

---

## [1.0.4] - 2026-05-11

- Added template governance through `docs/eyehateagent-maintenance.md`.
- Moved the contract anchors to the repository root and retargeted live references.
- Formalized Scenario 2 support in `docs/eyehateagent-contract.md` while keeping Scenario 3 outside the contract.
- Turned `README.md` into the main operator guide with a chained adoption flow: topology, target project category, and starter reusable prompt.
- Removed standalone adoption-guide surfaces that are now absorbed into the root `README.md`.

---

## [1.0.3] - 2026-05-10

- Simplified the mirrored rule files and clarified response-shape precedence through `docs/eyehateagent-contract.md`.
- Shifted template verification back to a document-first, human-reviewed maintenance flow.
- Removed outdated sample-oriented docs from the active template tree.

---

## [1.0.2] - 2026-05-09

- Refined contract, testing, quick-reference, and maintenance docs for clearer ownership and consistency.
- Updated `README.md` and mirrored rules to better match the template workflow and terminology.

---

## [1.0.1] - 2026-05-08

- Added the root `README.md` as the first human-facing adoption guide.
- Added optional starter docs for `PRD.md` and `PRODUCTION_RUNBOOK.md`.
- Clarified keep, replace, and remove rules for copying the template into target repositories.
- Tightened starter-pack and reusable-prompt guidance for downstream doc management.

---

## [1.0.0] - 2026-05-07

- Initial release of the template foundation with project-doc owner files, mirrored agent rules, reusable prompts, and reusable skills.
- Added the first downstream adoption guide and the starter scaffold under `docs/vibes/project-docs-template/`.
- Added starter `GETTING_STARTED.md` and `CHANGELOG.md` for the scaffold.
- Elevated reusable prompts as a first-class template surface and standardized skill documentation for clearer guidance.
