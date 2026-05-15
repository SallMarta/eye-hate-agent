# API Guideline

Last updated: YYYY-MM-DD

---

## Summary

Document the durable API rules for the repository: boundary ownership, versioning expectations, request and response shapes, and compatibility rules.

## Scope

- APIs covered by this repository
- Public versus internal API boundaries
- Versioning or compatibility expectations

## Rules

- Define request and response shapes in one consistent way.
- State naming, pagination, filtering, and error-envelope expectations.
- State authentication, authorization, and idempotency rules when relevant.
- State when breaking changes are allowed and how they are communicated.

## Preferred Patterns

- Prefer explicit request and response contracts over implicit conventions.
- Prefer stable error shapes and predictable status handling.
- Prefer cross-references to architecture or integration docs rather than duplicating broad system context.

## Anti-Patterns

- Do not mix public and internal contract rules without labeling the boundary.
- Do not redefine the same payload rules in multiple feature docs.
- Do not bury breaking-change policy inside implementation notes.

## Related Docs

- `architecture.md`
- `prd.md` when request or response behavior is user-facing
- `guidelines/json.md`
- `guidelines/error-handling.md`

## Open Questions

- Which API surfaces are contract-sensitive?
- What compatibility window must the repo support?
