# Database Guideline

Last updated: YYYY-MM-DD

---

## Summary

Document the durable database and persistence rules for the repository: naming, schema ownership, migrations, transactional boundaries, and data-safety constraints.

## Scope

- Primary data stores and persistence layers
- Schema and migration ownership
- Data-retention or consistency rules when relevant

## Rules

- Define naming conventions for tables, collections, columns, keys, and indexes.
- Define migration expectations, rollback rules, and backward-compatibility constraints.
- Define transaction boundaries and concurrency expectations when relevant.
- Define how application code may depend on persistence details.

## Preferred Patterns

- Prefer explicit schema evolution rules over ad hoc migration behavior.
- Prefer repository or boundary abstractions when direct persistence coupling would spread.
- Prefer cross-references to architecture docs for storage topology or infrastructure details.

## Anti-Patterns

- Do not hide migration-breaking behavior in release notes only.
- Do not duplicate the same schema rules in multiple feature docs.
- Do not mix operational runbook steps into this guideline unless they are part of the durable rule set.

## Related Docs

- `ARCHITECTURE.md`
- `PRODUCTION_RUNBOOK.md` when production migration procedure matters
- `TESTING.md`

## Open Questions

- Which schema changes require staged rollout?
- What persistence rules are strict versus best effort?
