# Design Patterns Guideline

Last updated: YYYY-MM-DD

---

## Summary

Document the preferred design patterns, boundary patterns, and coupling rules that the repository expects contributors to use.

## Scope

- Architectural and module-level patterns that repeat across the repo
- Approved collaboration patterns between layers or services
- Forbidden coupling or shortcut patterns

## Rules

- Define the patterns that are preferred for composing features, modules, or workflows.
- Define which coupling directions are allowed and which are forbidden.
- Define how shared utilities, adapters, services, or domain boundaries should be introduced.
- Define when a new pattern needs explicit review before adoption.

## Preferred Patterns

- Prefer a small set of explicit patterns that match the architecture.
- Prefer consistency over novelty when a pattern already serves the repo well.
- Prefer examples that show how the pattern protects boundaries or reduces change risk.

## Anti-Patterns

- Do not introduce a new pattern because it is fashionable but unproven in the repo.
- Do not bypass architectural boundaries for short-term convenience.
- Do not treat one successful local workaround as a repository-wide pattern without review.

## Related Docs

- `architecture.md`
- `status.md` when pattern adoption is part of active roadmap work
- `guidelines/code-style.md`

## Open Questions

- Which patterns are mandatory versus recommended?
- Which existing patterns should be deprecated over time?
