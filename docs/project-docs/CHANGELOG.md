# Changelog — Template Repository

All notable template changes are documented here.

---

## [Unreleased]

No unreleased template changes yet.

---

## [1.0.0] - 2026-05-11

### Added

- canonical project-documentation contract in `TEMPLATE_CONTRACT.md`
- template maintenance governance doc in `TEMPLATE_MAINTENANCE.md`
- template-level testing and verification baseline in `TESTING.md`
- reusable prompts for project-doc bootstrap, refresh, and consistency audit
- reusable skills that begin from project-doc inputs
- static starter scaffold under `docs/vibes/project-docs-template/`, including optional `GETTING_STARTED.md` and `CHANGELOG.md` starter docs

### Changed

- `README.md` is now the main operator entry point and adoption guide for humans and agents
- adoption now reads as a chained Step 1 / Step 2 / Step 3 flow: choose topology, choose target project category, then run the relevant starter reusable prompt
- `TEMPLATE_CONTRACT.md` now formally supports Scenario 2 as a shared-template-repo topology while keeping Scenario 3 explicitly outside the contract
- `TEMPLATE_CONTRACT.md` and `TEMPLATE_MAINTENANCE.md` moved to the repository root as a breaking template migration, and live references were retargeted accordingly
- human-facing adoption guidance was consolidated into the root `README.md`, replacing removed guide surfaces and duplicate first-read material
- mirrored rule files are now leaner, keep only durable agent behavior, and defer canonical routing, precedence, and documentation structure to `TEMPLATE_CONTRACT.md`
- the template repository now documents itself rather than a sample product, and template-owned wording now avoids unnecessary stack or product examples
- verification returned to a document-first, human-reviewed model with explicit maintenance-audit guidance in `TESTING.md`
- starter-pack and adopter guidance now clearly separate active template docs from downstream starter docs, and reusable optional docs such as `PRD.md` and `PRODUCTION_RUNBOOK.md` are now recognized in the contract

### Removed

- embedded sample products and sample-specific project docs from the active template tree
- historical example snapshots that were not part of the reusable template surface
- standalone adoption-guide and reusable-prompt README surfaces that are now absorbed into the root `README.md`
