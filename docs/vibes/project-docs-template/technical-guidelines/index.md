# Guidelines Index

Last update: YYYY-MM-DD

Status: [Proposed | Draft | Live | Deprecated | Archived]

---

## 1. Summary
> [!NOTE] Use this index to list the active technical guideline documents for the repository. Core project docs explain the repository generally. Guidelines explain the durable technical rules that recurring implementation and review work should follow. This index is the authoritative registry for active guideline types; starter template files are recommended references, not the activation mechanism.

## 2. When To Add A Guideline
- Add a guideline when a technical domain has cross-cutting rules that would otherwise be repeated across tasks.
- Do not create a guideline as a placeholder.
- Keep one primary domain per guideline file.
- If a rule is broad project truth, keep it in the core project docs and reference that doc here instead.
- Add a new row in the `## 3. Active Guidelines` table below when activating a known guideline type, even if no starter template file exists for it yet.

## 3. Active Guidelines
| Guideline | Domain | Purpose | Owner | Review trigger |
| --- | --- | --- | --- | --- |
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
| `technical-guidelines/your-new-guideline.md` | State the domain of the next guideline here | State the purpose of the next guideline here | TBD | State the review trigger for the next guideline here |

> [!NOTE] Remove rows for inactive domains and add a new row in the `## 3. Active Guidelines` table above for any other active guideline files.

## 4. Ownership And Review
- Keep this index aligned with the files that actually exist under `technical-guidelines/`.
- A row in this index activates a known guideline type for bootstrap, refresh, and parity behavior.
- If no starter template file exists for a listed guideline type, use the stable guideline headings from the contract.
- Update the relevant row whenever a guideline changes owner, scope, or review trigger.
- Cross-reference owning project docs such as `architecture.md` or `testing.md` when a guideline depends on them.

## 5. Stable Headings
> [!NOTE] New guideline files must include the standard numbered headings below to keep all rulebooks consistent. Feel free to add extra domain-specific headings if needed.

1. **`## 1. Summary`**: A brief overview of what rules this guideline documents.
2. **`## 2. Scope`**: The explicit boundaries of what these rules cover (and don't cover).
3. **`## 3. Rules`**: The hard rules that must be followed.
4. **`## 4. Preferred Patterns`**: Examples or guidelines of the *best* way to do something.
5. **`## 5. Anti-Patterns`**: Examples of what *not* to do.
6. **`## 6. Related Docs`**: Links to `technical/` docs or other guidelines.
7. **`## 7. Open Questions`**: Any unresolved rules or edge cases.
