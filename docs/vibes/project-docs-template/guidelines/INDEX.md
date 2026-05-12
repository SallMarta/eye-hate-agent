# Guidelines Index

Last updated: YYYY-MM-DD

---

## Summary

Use this index to list the active technical guideline documents for the repository.
Core project docs explain the repository generally.
Guidelines explain the durable technical rules that recurring implementation and review work should follow.

## When To Add A Guideline

- Add a guideline when a technical domain has cross-cutting rules that would otherwise be repeated across tasks.
- Do not create a guideline as a placeholder.
- Keep one primary domain per guideline file.
- If a rule is broad project truth, keep it in the core project docs and reference that doc here instead.

## Active Guidelines

| Guideline | Domain | Purpose | Owner | Review trigger |
| --- | --- | --- | --- | --- |
| `guidelines/api.md` | API | Request or response contracts, versioning rules, and integration boundaries | TBD | API contract or integration changes |
| `guidelines/database.md` | Database | Schema, migration, naming, and persistence rules | TBD | Schema or storage changes |
| `guidelines/logging.md` | Logging | Event naming, log levels, redaction, and correlation rules | TBD | Logging policy or observability changes |
| `guidelines/error-handling.md` | Error handling | Error taxonomy, propagation, user-safe messages, and fallback rules | TBD | Error model or operational changes |
| `guidelines/json.md` | JSON | Serialization, naming, nullability, and payload-shape rules | TBD | Payload or contract changes |
| `guidelines/code-style.md` | Code style | Repo-specific style rules beyond formatter and linter defaults | TBD | Tooling or style-policy changes |
| `guidelines/design-patterns.md` | Design patterns | Preferred design patterns, boundary patterns, and forbidden coupling | TBD | Architecture or module-boundary changes |

Remove rows for inactive domains and add rows for any other active guideline files.

## Ownership And Review

- Keep this index aligned with the files that actually exist under `guidelines/`.
- Update the relevant row whenever a guideline changes owner, scope, or review trigger.
- Cross-reference owning project docs such as `ARCHITECTURE.md` or `TESTING.md` when a guideline depends on them.
