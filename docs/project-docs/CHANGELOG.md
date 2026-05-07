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

- repo-level project docs now describe the template repository itself rather than a sample product
- adoption guidance now assumes a template-only repository with no embedded examples
- `ADOPTION_GUIDE.md` now explains scenario-based adoption for empty, partial, and mature repositories, plus a reusable-prompt decision guide and readiness checklist
- `ADOPTION_GUIDE.md` now also documents the Scenario 3 sub-variant where a mature repository already has a strong documentation system and adoption is mainly an ownership-mapping problem
- `docs/vibes/reusable-prompts/README.md` now includes a compact scenario decision summary that points back to `ADOPTION_GUIDE.md` for the full adoption workflow
- `docs/vibes/project-docs-template/` now provides a static starter scaffold for manual project-doc adoption without creating a second active contract tree
- the static starter scaffold now also includes optional `GETTING_STARTED.md` and `CHANGELOG.md` starter docs, and `ADOPTION_GUIDE.md` now includes a short chooser between copying the starter pack and running bootstrap
- the contract and starter-pack guidance now explicitly explain the split between active template docs and downstream starter docs, and `PRD.md` plus `PRODUCTION_RUNBOOK.md` are now recognized reusable optional docs
- mirrored rule files now defer canonical documentation structure to `TEMPLATE_CONTRACT.md` instead of carrying a duplicated tree
- `GETTING_STARTED.md` now stays an orientation surface while `ADOPTION_GUIDE.md` owns adopter workflow and `TEMPLATE_MAINTENANCE.md` owns maintainer workflow
- `TESTING.md` now defines an explicit template maintenance audit sequence for contract, rule, skill, reusable prompt, and onboarding changes
- template-owned wording now avoids unnecessary named stack or product examples

### Removed

- embedded sample products and sample-specific project docs from the active template tree
- historical example snapshots that were not part of the reusable template surface
