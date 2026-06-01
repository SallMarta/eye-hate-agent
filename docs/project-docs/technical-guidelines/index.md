# Guidelines Registry

Last update: 2026-06-01

Status: Live

---

## 1. Description
This registry is the authoritative catalog and schema definition for all active technical guideline documents inside the Eye Hate Agent (EHA) repository. While core project documents explain EHA generally, technical guidelines document the durable, cross-cutting coding and design conventions that developers and AI agents must follow during implementation.

## 2. Important
Guidelines are durable, codebase-level rulebooks. They must never be created as simple placeholders. A guideline is officially activated in bootstrap, refresh, and parity loops only when it has an active row registered in the Active Guidelines table below.

## 3. Table of Contents
- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Goals](#5-goals)
- [6. Non Goals](#6-non-goals)
- [7. Active Guidelines Registry](#7-active-guidelines-registry)
- [8. Registry Rules & Ownership](#8-registry-rules--ownership)
- [9. Guideline Stable Headings](#9-guideline-stable-headings)
- [10. Success Metrics](#10-success-metrics)
- [11. Related Documents](#11-related-documents)
- [12. Open Questions](#12-open-questions)

## 4. Scope
Covers the active guideline categories, ownership tracking, review triggers, and standard heading rules for EHA technical guidelines.

## 5. Goals
Standardize the coding and architectural rules across the EHA codebase, preventing design-pattern divergence and ensuring high code quality.

## 6. Non Goals
Does not contain general EHA project onboarding or workflow documentation (refer to the master project docs registry `index.md`).

## 7. Active Guidelines Registry
Currently, EHA's `technical-guidelines/` layer is **intentionally empty**. The EHA CLI engine and registry codebase are extremely lightweight and compact. As a result, standard JavaScript styling standards, standard Node.js practices, and EHA compact rules are sufficient, and no extra guideline documentation is active.

| Guideline | Domain | Purpose | Owner | Review Trigger |
| :--- | :--- | :--- | :--- | :--- |
| None | None | Intentionally Empty | Maintainer | N/A |

Remove rows for inactive domains and add a new row in the `## 7. Active Guidelines Registry` table above for any other active guideline files.

## 8. Registry Rules & Ownership
- Keep this index aligned with the files that actually exist under `technical-guidelines/`.
- A row in this index activates a known guideline type for bootstrap, refresh, and parity behavior.
- If no starter template file exists for a listed guideline type, use the Stable Headings schema defined below.
- Update the relevant row whenever a guideline changes owner, scope, or review trigger.
- Cross-reference owning project docs such as `architecture.md` or `testing.md` when a guideline depends on them.

## 9. Guideline Stable Headings
New guideline files must include the standard numbered headings below to keep all rulebooks consistent. When documenting a guideline, both developers and AI agents are **NOT** limited to this baseline schema; they must actively append additional, custom domain-specific headings (for example, under Section 3 or as subheadings) to capture the unique technical standards, tooling, and constraints of the codebase.

1. **`## 1. Summary`**: A brief overview of what rules this guideline documents.
2. **`## 2. Scope`**: The explicit boundaries of what these rules cover (and don't cover).
3. **`## 3. Rules`**: The hard rules that must be followed.
4. **`## 4. Preferred Patterns`**: Examples or guidelines of the *best* way to do something.
5. **`## 5. Anti-Patterns`**: Examples of what *not* to do.
6. **`## 6. Related Docs`**: Links to active core project documents or other guidelines.
7. **`## 7. Open Questions`**: Any unresolved rules or edge cases.

## 10. Success Metrics
AI agents and developers can easily reference, follow, and validate EHA code standard compliance during changes.

## 11. Related Documents
- [Index](../index.md) - Master EHA project documentation index.
- [Testing](../development/testing.md) - EHA diagnostic testing guidelines.

## 12. Open Questions
None.
