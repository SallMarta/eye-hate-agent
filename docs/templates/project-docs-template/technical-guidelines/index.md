# Guidelines Registry

Last update: 2026-06-01

Status: Live

---

## 1. Description
This registry is the authoritative catalog and schema definition for all active technical guideline documents inside the repository. While core project documents explain the repository generally, technical guidelines document the durable, cross-cutting coding and design conventions that developers and AI agents must follow during implementation.

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
Covers the active guideline categories, ownership tracking, review triggers, and standard heading rules for technical guidelines.

## 5. Goals
Standardize the coding and architectural rules across the codebase, preventing design-pattern divergence and ensuring high code quality.

## 6. Non Goals
Does not document general project setup, business logic, or operational procedures (refer to the master project docs registry `index.md`).

## 7. Active Guidelines Registry

| Guideline | Domain | Purpose | Owner | Review Trigger |
| :--- | :--- | :--- | :--- | :--- |
| `technical-guidelines/api.md` | API | Request or response contracts, versioning rules, and integration boundaries | TBD | API contract or integration changes |
| `technical-guidelines/database.md` | Database | Schema, migration, naming, and persistence rules | TBD | Schema or storage changes |
| `technical-guidelines/logging.md` | Logging | Event naming, log levels, redaction, and correlation rules | TBD | Logging policy or observability changes |
| `technical-guidelines/error-handling.md` | Error handling | Error taxonomy, propagation, user-safe messages, and fallback rules | TBD | Error model or operational changes |
| `technical-guidelines/json.md` | JSON | Serialization, naming, nullability, and payload-shape rules | TBD | Payload or contract changes |
| `technical-guidelines/code-style.md` | Code style | Repo-specific style rules beyond formatter and linter defaults | TBD | Tooling or style-policy changes |
| `technical-guidelines/design-patterns.md` | Design patterns | Preferred design patterns, boundary patterns, and forbidden coupling | TBD | Architecture or module-boundary changes |
| `technical-guidelines/internationalization.md` | i18n/l10n | Rules for i18n keys, fallbacks, and adding new languages | TBD | i18n tooling or language changes |
| `technical-guidelines/testing.md` | Testing | Rules for writing tests, naming conventions, mocking, and coverage | TBD | Testing framework or coverage changes |
| `technical-guidelines/ui-ux.md` | UI/UX | Rules for UI components, accessibility standards, and design system usage | TBD | Design system or component library changes |
| `technical-guidelines/[custom-guideline].md` | [Domain] | [Durable technical rules and conventions for custom domain] | TBD | [Review trigger, e.g. "API or schema changes"] |

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
AI agents and developers can easily reference, follow, and validate cross-cutting code standard compliance during changes.

## 11. Related Documents
- [Master Project Registry](../index.md) - The active document catalog.

## 12. Open Questions
None.
