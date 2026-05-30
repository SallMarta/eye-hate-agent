# Index

Last update: YYYY-MM-DD

Status: [Proposed | Draft | Live | Deprecated | Archived]

---

## 1. Description
Use this index to list the optional and conditional regular project docs that are active for a repository. The always-required core docs are defined by the contract and do not need registry entries to exist. This index is the authoritative registry for optional and conditional regular docs; starter template files are recommended references, not the activation mechanism.

## 2. Important
Notes of important findings or critical constraints. Can be empty.

## 3. Table of Contents
[Generate a hyperlinked table of contents here containing ALL headings in this file (1 through N). Use standard markdown links, e.g., - [1. Description](#1-description)]

## 4. Scope
The boundaries of what this document covers.

## 5. Goals
What we aim to achieve with this specific document.

## 6. Non Goals
What is explicitly excluded from the scope of this document.

## 7. How to Use This Documentation
A guide for new developers on where to start reading.

## 8. Documentation Ownership
Who is responsible for keeping specific files up to date (e.g., "Backend team owns `api-contract.md`").

## 9. Foundational Required Docs
- `prd.md`
- `architecture.md`
- `testing.md`
- `workflow.md`
- `status.md`

## 10. Optional And Conditional Docs
| File | Purpose | Status | Owner | Creation trigger |
| --- | --- | --- | --- | --- |
| `changelog.md` | Release or milestone change history | conditional | TBD | When changes need release or milestone tracking |
| `getting-started.md` | Setup, onboarding, and first-run guidance | conditional | TBD | When setup or onboarding needs a dedicated owner doc |
| `feature-inventory.md` | Detailed feature catalog | conditional | TBD | When the feature surface is large enough to need inventory-level tracking |
| `production-runbook.md` | Release, rollback, smoke-check, and recovery guidance | conditional | TBD | Before production operation needs a dedicated runbook |
| `phases/index.md` | Multi-phase planning or epic registry | conditional | TBD | When roadmap work needs explicit phase tracking |
| `YOUR_NEW_DOC.md` | State the purpose of the next optional regular doc here | conditional | TBD | State the creation trigger for the next optional regular doc here |

Use status values such as `active`, `conditional`, `deprecated`, or `archived`. Add a new row in the `## 10. Optional And Conditional Docs` table above for each additional optional regular doc type that the repo activates.

## 11. Registry Rules
- Add a new row in the `## 10. Optional And Conditional Docs` table above when an optional or conditional regular doc becomes part of the repo's active documentation set.
- A row in this index activates a known optional doc type for bootstrap, refresh, and parity behavior.
- If no starter template file exists for a listed doc type, use the stable headings or ownership rules defined in the contract.
- Keep this index aligned with the files that actually exist under `docs/project-docs/`.
- If a listed doc is deprecated or archived, update its status rather than silently removing its history.

## 12. Success Metrics
How we measure if the goals of this document are achieved.

## 13. Related Documents
[Link to related document](path) - Short brief note about why it's related.

## 14. Open Questions
Any unresolved questions or assumptions. Can be empty.
