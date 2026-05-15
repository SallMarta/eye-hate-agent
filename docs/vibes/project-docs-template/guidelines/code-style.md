# Code Style Guideline

Last updated: YYYY-MM-DD

---

## Summary

Document the repo-specific code-style rules that matter beyond formatter, linter, or language defaults.

## Scope

- Naming, file structure, and code-organization rules that the repo relies on
- Language- or framework-specific style decisions that need explicit justification
- Exceptions to generic tool defaults

## Rules

- Define the style rules that affect readability, review quality, or maintenance cost.
- Define naming and file-organization rules that contributors must follow.
- Define when local exceptions are allowed and how they should be documented.
- Cross-reference formatter and linter tools instead of restating their entire rule set.

## Preferred Patterns

- Prefer a small number of repo-specific rules with clear reasons.
- Prefer automated enforcement where possible.
- Prefer examples for patterns that are hard to infer from tooling alone.

## Anti-Patterns

- Do not duplicate the formatter or linter configuration without adding repo-specific value.
- Do not treat personal preferences as mandatory style policy.
- Do not scatter style guidance across many unrelated docs.

## Related Docs

- `quick-reference.md`
- `testing.md`
- language- or framework-specific tooling docs when present

## Open Questions

- Which style rules are enforced automatically?
- Which rules exist only for human review?
