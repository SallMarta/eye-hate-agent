# Project Docs Index

Last updated: YYYY-MM-DD

---

## Summary

Use this index to list the optional and conditional regular project docs that are active for a repository.
The always-required core docs are defined by the contract and do not need registry entries to exist.
This index is the authoritative registry for optional and conditional regular docs; starter template files are recommended references, not the activation mechanism.

## Core Required Docs

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

## Optional And Conditional Docs

| File | Purpose | Status | Owner | Creation trigger |
| --- | --- | --- | --- | --- |
| `CHANGELOG.md` | Release or milestone change history | conditional | TBD | When changes need release or milestone tracking |
| `GETTING_STARTED.md` | Setup, onboarding, and first-run guidance | conditional | TBD | When setup or onboarding needs a dedicated owner doc |
| `FEATURE_INVENTORY.md` | Detailed feature catalog | conditional | TBD | When the feature surface is large enough to need inventory-level tracking |
| `PRD.md` | Detailed requirements, flows, and acceptance criteria | conditional | TBD | When the project relies on formal requirements or flow-level acceptance criteria |
| `PRODUCTION_RUNBOOK.md` | Release, rollback, smoke-check, and recovery guidance | conditional | TBD | Before production operation needs a dedicated runbook |
| `phases/INDEX.md` | Multi-phase planning or epic registry | conditional | TBD | When roadmap work needs explicit phase tracking |
| `YOUR_NEW_DOC.md` | State the purpose of the next optional regular doc here | conditional | TBD | State the creation trigger for the next optional regular doc here |

Use status values such as `active`, `conditional`, `deprecated`, or `archived`.
Add a new row in the `## Optional And Conditional Docs` table above for each additional optional regular doc type that the repo activates.

## Registry Rules

- Add a new row in the `## Optional And Conditional Docs` table above when an optional or conditional regular doc becomes part of the repo's active documentation set.
- A row in this index activates a known optional doc type for bootstrap, refresh, and consistency-audit behavior.
- If no starter template file exists for a listed doc type, use the stable headings or ownership rules defined in the contract.
- Keep this index aligned with the files that actually exist under `docs/project-docs/`.
- If a listed doc is deprecated or archived, update its status rather than silently removing its history.
