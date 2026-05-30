# Index

Last update: 2026-05-30

Status: Live

---

## 1. Description
This index is the active registry and map for the **Eye Hate Agent (EHA)** repository's Spec-Driven Development (SDD) documentation. EHA is a meta-tool, meaning we use EHA to maintain EHA.

## 2. Important
Do not modify EHA source code without consulting the PRD and Architecture documents linked below.

## 3. Table of Contents
1. Foundational Required Docs
> 2. Optional And Conditional Docs
> 3. Registry Rules

## 4. Scope
Covers the structural definitions, architectural decisions, and operational tracking for the EHA meta-tool.

## 5. Goals
Ensure all AI agents operating in this repository adhere strictly to EHA's operational models and don't deviate from the established registry patterns.

## 6. Non Goals
Does not document end-user onboarding or usage instructions (these are in the root `README.md`).

## 7. How to Use This Documentation
AI agents should start by reading `prd.md` to understand the overarching rules and vision, then `architecture.md` to understand how the template engine injects context.

## 8. Documentation Ownership
Sulyadee (Sole Maintainer) owns all documentation in this repository.

## 9. Foundational Required Docs
- `prd.md`
- `architecture.md`
- `testing.md`
- `workflow.md`
- `status.md`

## 10. Optional And Conditional Docs
| File | Purpose | Status | Owner | Creation trigger |
| --- | --- | --- | --- | --- |
| `changelog.md` | Release or milestone change history | active | Sulyadee | Maintained for NPM releases |
| `feature-inventory.md` | Detailed feature catalog | active | Sulyadee | Used to track registry capabilities |
| `phases.md` | Multi-phase planning or epic registry | active | Sulyadee | Used to roadmap future agents or workflows |

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
> - [MAINTAINING.md](../../MAINTAINING.md) - Legacy pointers and release operations.

## 14. Open Questions
None.
