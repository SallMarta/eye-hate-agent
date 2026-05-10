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

- mirrored rule files now define a lightweight default live-response shape for general requests, while `TEMPLATE_CONTRACT.md` now documents that explicit user formats, mode-specific agent files, and skill or reusable-prompt output contracts take precedence
- mirrored rule files now share a leaner 5-section body that keeps only durable agent behavior and defers routing, precedence, and documentation structure to `TEMPLATE_CONTRACT.md`
- repo-level project docs now describe the template repository itself rather than a sample product
- adoption guidance now assumes a template-only repository with no embedded examples
- `ADOPTION_GUIDE.md` now explains scenario-based adoption for empty, partial, and mature repositories, plus a reusable-prompt decision guide and readiness checklist
- `ADOPTION_GUIDE.md` now also documents the Scenario 3 sub-variant where a mature repository already has a strong documentation system and adoption is mainly an ownership-mapping problem
- `ADOPTION_GUIDE.md` now explains when to add new optional docs manually versus through refresh or consistency audit
- `ADOPTION_GUIDE.md` now explicitly documents the downstream keep, replace, and remove rule for `docs/project-docs/`, including keeping `TEMPLATE_CONTRACT.md` and removing `TEMPLATE_MAINTENANCE.md` from normal adopted repositories
- `docs/vibes/reusable-prompts/README.md` now includes a compact scenario decision summary that points back to `ADOPTION_GUIDE.md` for the full adoption workflow
- `docs/vibes/project-docs-template/` now provides a static starter scaffold for manual project-doc adoption without creating a second active contract tree
- the static starter scaffold now also includes optional `GETTING_STARTED.md` and `CHANGELOG.md` starter docs, and `ADOPTION_GUIDE.md` now includes a short chooser between copying the starter pack and running bootstrap
- the contract and starter-pack guidance now explicitly explain the split between active template docs and downstream starter docs, and `PRD.md` plus `PRODUCTION_RUNBOOK.md` are now recognized reusable optional docs
- a new repository root `README.md` now explains step-by-step guide setup and downstream adoption flow, including what to keep, replace, and remove inside `docs/project-docs/`
- the repository root `README.md` now shortens the first-read experience further by centering the decision on repo type and using more natural labels: new project, active project, and mature project
- `GETTING_STARTED.md` now focuses on orientation inside the template repository itself, while the repository root README and `ADOPTION_GUIDE.md` own adopter entry flow
- `ADOPTION_GUIDE.md` now uses plainer opening language and aligns its scenario labels with the README: new project, active project, and mature project
- `ADOPTION_GUIDE.md` now also simplifies several middle sections so the body matches the plainer opening and repo-type framing
- `ADOPTION_GUIDE.md` now shortens the normal-work vs doc-work guidance and the minimum adoption workflow so the top half scans faster
- `ADOPTION_GUIDE.md` now includes a fast-start section near the top so adopters can choose new, active, or mature project and know the first move immediately
- `TEMPLATE_CONTRACT.md` now owns the reusable extension rules for adding skills, rule points, project-doc owners, and contract changes, so downstream repositories keep those rules after removing `TEMPLATE_MAINTENANCE.md`
- `TEMPLATE_MAINTENANCE.md` now focuses on template-repo-only workflow, while `QUICK_REFERENCE.md` points maintainers to the correct owner docs instead of repeating the change map
- template verification now returns to a document-first, human-reviewed model with explicit manual maintenance audit guidance instead of the removed checker command
- mirrored rule files now defer canonical documentation structure to `TEMPLATE_CONTRACT.md` instead of carrying a duplicated tree
- `GETTING_STARTED.md` now stays an orientation surface while `ADOPTION_GUIDE.md` owns adopter workflow and `TEMPLATE_MAINTENANCE.md` owns maintainer workflow
- `TESTING.md` now defines an explicit template maintenance audit sequence for contract, rule, skill, reusable prompt, and onboarding changes
- template-owned wording now avoids unnecessary named stack or product examples

### Removed

- embedded sample products and sample-specific project docs from the active template tree
- historical example snapshots that were not part of the reusable template surface
