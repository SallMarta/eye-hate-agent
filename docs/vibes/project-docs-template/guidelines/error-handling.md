# Error Handling Guideline

Last updated: YYYY-MM-DD

---

## Summary

Document the durable error-handling rules for the repository: error categories, propagation rules, retry boundaries, and user-safe communication.

## Scope

- Application errors, domain errors, validation errors, and integration failures
- Propagation boundaries between layers or services
- Retry, fallback, and escalation rules when relevant

## Rules

- Define the error categories the repository uses and what each one means.
- Define when errors should be wrapped, translated, retried, surfaced, or suppressed.
- Define user-facing versus operator-facing message rules.
- Define how errors are logged, traced, or attached to alerts.

## Preferred Patterns

- Prefer consistent error shapes and categories over ad hoc exception handling.
- Prefer explicit fallback behavior where silent recovery is allowed.
- Prefer cross-references to testing docs for failure-case verification.

## Anti-Patterns

- Do not leak internal details into user-facing errors.
- Do not mix retryable and terminal errors without labeling the distinction.
- Do not duplicate transport-specific error rules in unrelated feature docs.

## Related Docs

- `testing.md`
- `production-runbook.md` when incident response depends on error classes
- `guidelines/logging.md`
- `guidelines/api.md` when errors cross API boundaries

## Open Questions

- Which failures are retryable?
- Which failures must trigger alerts or operator intervention?
