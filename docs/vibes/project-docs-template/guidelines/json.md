# JSON Guideline

Last updated: YYYY-MM-DD

---

## Summary

Document the durable JSON rules for the repository: field naming, nullability, serialization format, compatibility expectations, and schema boundaries.

## Scope

- JSON sent over APIs, jobs, events, configs, or persistence boundaries as relevant
- Naming and casing rules
- Compatibility and schema evolution rules

## Rules

- Define the canonical casing and field-naming rules.
- Define nullability, optional-field, and default-value expectations.
- Define date, time, identifier, enum, and numeric serialization rules.
- Define how unknown fields, deprecated fields, and schema evolution are handled.

## Preferred Patterns

- Prefer one consistent naming strategy across JSON surfaces unless a third-party contract requires otherwise.
- Prefer explicit schema notes for payloads that outlive one request cycle.
- Prefer cross-references to API docs for transport-specific behavior.

## Anti-Patterns

- Do not mix naming conventions without documenting the boundary.
- Do not rely on implicit serializer defaults when compatibility matters.
- Do not redefine the same payload rules in multiple places.

## Related Docs

- `guidelines/api.md`
- `ARCHITECTURE.md`
- `TESTING.md`

## Open Questions

- Which JSON surfaces are contract-stable?
- Which fields need versioning or deprecation rules?
