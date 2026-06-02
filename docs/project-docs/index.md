# Index

Last update: 2026-05-30

Status: Live

---

## 1. Description
This index is the active registry and map for the **Eye Hate Agent (EHA)** repository's Spec-Driven Development (SDD) documentation. EHA is a meta-tool, meaning we use EHA to maintain EHA itself.

## 2. Important
Do not modify EHA source code without consulting the PRD and Architecture documents linked below.

## 3. Table of Contents
- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Goals](#5-goals)
- [6. Non Goals](#6-non-goals)
- [7. How to Use This Documentation](#7-how-to-use-this-documentation)
- [8. Documentation Ownership](#8-documentation-ownership)
- [9. Foundational Required Docs](#9-foundational-required-docs)
- [10. Optional And Conditional Docs](#10-optional-and-conditional-docs)
- [11. Registry Rules](#11-registry-rules)
- [12. Success Metrics](#12-success-metrics)
- [13. Related Documents](#13-related-documents)
- [14. Open Questions](#14-open-questions)

## 4. Scope
Covers the structural definitions, architectural decisions, and operational tracking for the EHA meta-tool.

## 5. Goals
Ensure all AI agents operating in this repository adhere strictly to EHA's operational models and don't deviate from the established registry patterns.

## 6. Non Goals
Does not document end-user onboarding or usage instructions (these are in the root `README.md`).

## 7. How to Use This Documentation
AI agents should start by reading `prd.md` to understand the overarching rules and vision, then `architecture.md` to understand how the template engine injects context.

## 8. Documentation Ownership
The sole maintainer owns all documentation in this repository.

## 9. Foundational Required Docs
- `getting-started.md`
- `foundation/prd.md`
- `foundation/architecture.md`
- `development/testing.md`
- `foundation/workflow.md`
- `foundation/status.md`
- `operations/ci-cd.md`

## 10. Optional And Conditional Docs
| File | Purpose | Status | Owner | Creation trigger |
| --- | --- | --- | --- | --- |
| `changelog.md` | Release or milestone change history | active | Maintainer | Maintained for NPM releases |
| `technical-guidelines/index.md` | Technical guidelines index | active | Maintainer | Used to registry code rules |

Use status values such as `active`, `conditional`, `deprecated`, or `archived`. Add a new row in the `## 10. Optional And Conditional Docs` table above for each additional optional regular doc type that the repo activates.

## 11. Registry Rules
- Add a new row in the `## 10. Optional And Conditional Docs` table above when an optional or conditional regular doc becomes part of the repo's active documentation set.
- A row in this index activates a known optional doc type for bootstrap, refresh, and parity behavior.
- If no starter template file exists for a listed doc type, use the stable headings or ownership rules defined in the contract.
- Keep this index aligned with the files that actually exist under `docs/project-docs/`.
- If a listed doc is deprecated or archived, update its status rather than silently removing its history.

## 12. Success Metrics
AI Agents can navigate EHA's codebase and modify it reliably without causing recursive template injection bugs.

## 13. Related Documents
- [README.md](../../README.md) - End-user consumption guide.
- [maintaining.md](../../maintaining.md) - Legacy pointers and release operations.

## 14. Open Questions
None.
