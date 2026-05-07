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
- mirrored rule files now defer canonical documentation structure to `TEMPLATE_CONTRACT.md` instead of carrying a duplicated tree
- `GETTING_STARTED.md` now stays an orientation surface while `ADOPTION_GUIDE.md` owns adopter workflow and `TEMPLATE_MAINTENANCE.md` owns maintainer workflow
- `TESTING.md` now defines an explicit template maintenance audit sequence for contract, rule, skill, reusable prompt, and onboarding changes
- template-owned wording now avoids unnecessary named stack or product examples

### Removed

- embedded sample products and sample-specific project docs from the active template tree
- historical example snapshots that were not part of the reusable template surface
