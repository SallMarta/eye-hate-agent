# Changelog — Template Repository

All notable template changes are documented here.

---

## [Unreleased]

### Added

- canonical project-documentation contract in `TEMPLATE_CONTRACT.md`
- template maintenance governance doc in `TEMPLATE_MAINTENANCE.md`
- template-level testing and verification baseline in `TESTING.md`
- reusable prompts for project-doc bootstrap, refresh, and consistency audit
- reusable skills that begin from project-doc inputs

### Changed

- `README.md` now removes low-value first-read sections, moves file navigation into `Purpose`, promotes `Main Files And Their Jobs`, and merges topology choice plus adoption flow into one shorter operator-oriented guide
- `TEMPLATE_CONTRACT.md` now formally supports Scenario 2 as a shared-template-repo topology where reusable assets may stay centralized while each adopted repo still keeps its own contract and local `docs/project-docs/`
- `README.md` now documents the three topology shapes with shorter operator-oriented wording and simple ASCII tree diagrams, while keeping Scenario 3 explicitly outside the current contract
- `README.md` now uses a tighter repository-map plus adoption-workflow structure so humans and agents can find the template surfaces, adoption rules, and starting paths with less repeated guidance
- the starter-pack instructions that lived in `docs/vibes/project-docs-template/README.md` now live in the root `README.md`, while the starter-pack folder remains as the reusable manual scaffold
- `TEMPLATE_CONTRACT.md` and `TEMPLATE_MAINTENANCE.md` now live at the repository root, and the contract taxonomy plus live references have been retargeted to the new root-level anchors as a breaking template migration
- `README.md` now absorbs the human-facing adoption guidance that previously lived in `ADOPTION_GUIDE.md` and `docs/vibes/reusable-prompts/README.md`, which have been removed from the active template surface
- mirrored rule files now define a lightweight default live-response shape for general requests, while `TEMPLATE_CONTRACT.md` now documents that explicit user formats, mode-specific agent files, and skill or reusable-prompt output contracts take precedence
- mirrored rule files now share a leaner 5-section body that keeps only durable agent behavior and defers routing, precedence, and documentation structure to `TEMPLATE_CONTRACT.md`
- repo-level project docs now describe the template repository itself rather than a sample product
- adoption guidance now assumes a template-only repository with no embedded examples
- the removed adoption-guide and reusable-prompt README content now survives only through the root `README.md`, which owns scenario-based adoption, prompt selection, and readiness guidance
- `docs/vibes/project-docs-template/` now provides a static starter scaffold for manual project-doc adoption without creating a second active contract tree
- the static starter scaffold now also includes optional `GETTING_STARTED.md` and `CHANGELOG.md` starter docs, and the root `README.md` now includes the chooser between copying the starter pack and running bootstrap
- the contract and starter-pack guidance now explicitly explain the split between active template docs and downstream starter docs, and `PRD.md` plus `PRODUCTION_RUNBOOK.md` are now recognized reusable optional docs
- a new repository root `README.md` now explains step-by-step guide setup and downstream adoption flow, including what to keep, replace, and remove inside `docs/project-docs/`
- the repository root `README.md` now shortens the first-read experience further by centering the decision on repo type and using more natural labels: new project, active project, and mature project
- `GETTING_STARTED.md` now focuses on orientation inside the template repository itself, while the repository root README owns adopter entry flow
- `TEMPLATE_CONTRACT.md` now owns the reusable extension rules for adding skills, rule points, project-doc owners, and contract changes, so downstream repositories keep those rules after removing `TEMPLATE_MAINTENANCE.md`
- `TEMPLATE_MAINTENANCE.md` now focuses on template-repo-only workflow, while `QUICK_REFERENCE.md` points maintainers to the correct owner docs instead of repeating the change map
- template verification now returns to a document-first, human-reviewed model with explicit manual maintenance audit guidance instead of the removed checker command
- mirrored rule files now defer canonical documentation structure to `TEMPLATE_CONTRACT.md` instead of carrying a duplicated tree
- `GETTING_STARTED.md` now stays an orientation surface while the root `README.md` owns adopter workflow and `TEMPLATE_MAINTENANCE.md` owns maintainer workflow
- `TESTING.md` now defines an explicit template maintenance audit sequence for contract, rule, skill, reusable prompt, and onboarding changes
- template-owned wording now avoids unnecessary named stack or product examples

### Removed

- embedded sample products and sample-specific project docs from the active template tree
- historical example snapshots that were not part of the reusable template surface
