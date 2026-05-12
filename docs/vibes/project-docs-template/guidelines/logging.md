# Logging Guideline

Last updated: YYYY-MM-DD

---

## Summary

Document the durable logging rules for the repository: event naming, levels, correlation fields, redaction, and operator-facing expectations.

## Scope

- Application logs, audit logs, and operational events as relevant
- Required metadata and correlation fields
- Redaction and privacy expectations

## Rules

- Define the approved log levels and when each should be used.
- Define required context fields such as request identifiers, actor identifiers, and workflow identifiers.
- Define redaction rules for secrets, tokens, personal data, or payload excerpts.
- Define which events must be logged and which should stay silent.

## Preferred Patterns

- Prefer structured logs over ad hoc free-text logging when machine parsing matters.
- Prefer stable event names that survive refactors.
- Prefer cross-references to operational docs for shipping, storage, or alerting setup.

## Anti-Patterns

- Do not log secrets or sensitive payloads.
- Do not use inconsistent event names for the same class of event.
- Do not treat debug printouts as durable logging policy.

## Related Docs

- `ARCHITECTURE.md`
- `PRODUCTION_RUNBOOK.md` when log delivery or retention matters
- `guidelines/error-handling.md`

## Open Questions

- Which events are required for support and incident response?
- Which fields need explicit retention or masking rules?
