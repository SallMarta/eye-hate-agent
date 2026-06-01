---
name: "db-schema-design"
description: "Project-aware expert-role database schema and modeling design. Reads project docs first, then produces a schema design, migration plan, or query optimization strategy consistent with the current repository constraints."
argument-hint: "Describe the domain entities, tables, relationships, or queries to design or review"
---

# Database Schema Design

Produces a **project-aware, expert-level database schema design or review** by reading the repository's project docs first, then applying a rigorous data modeling method.

This skill is reusable across:

- Relational Databases (PostgreSQL, MySQL, Aurora, etc)
- Document / NoSQL Databases (MongoDB, DynamoDB, etc)
- In-memory / Cache Models (Redis, Memcache, etc)
- Event Stores (Kafka, Pulsar, etc)

It should **not** assume a specific database engine, ORM, or normalization strategy until the project docs confirm them.

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/project-docs/technical/database.md` | Defines the actual database engines, ORMs, migration tools, naming conventions, and constraints. |
| `docs/project-docs/foundation/architecture.md` | Defines where data logic lives (e.g., repository layer) and integration boundaries. |
| `docs/project-docs/foundation/prd.md` | Clarifies the feature scale, expected data volume, and access patterns. |
| `docs/project-docs/technical/testing.md` | Defines how data layer code and migrations should be validated. |

If the repository lacks the database docs needed for the task, call that out and create or update the missing docs instead of inventing local rules in the skill.

## When to Use

Use this skill when designing or reviewing one of these boundary types:

| Boundary type | Typical artifacts |
| --- | --- |
| Schema Creation | Tables, columns, types, constraints, foreign keys, indexes |
| Migrations | Up/Down migration scripts, data backfills, zero-downtime strategies |
| Query Optimization | EXPLAIN plans, index selection, join reduction |
| Data Modeling | Domain entities, aggregates, document embedding vs referencing |
| Caching | Cache keys, TTL strategies, eviction policies |

## Procedure

### Step 1 — Identify the Engine and Tools
Extract from `database.md`:
- the primary database engine (e.g., Postgres 15)
- the schema management/migration tool (e.g., Prisma, Flyway, Alembic)
- the application access pattern (raw SQL vs Query Builder vs ORM)

### Step 2 — Identify the Access Patterns
Extract from `prd.md` and feature docs:
- Read/Write ratios (is it write-heavy or read-heavy?)
- Data volume expectations
- Latency requirements
- Multi-tenant data segregation rules (if any)

### Step 3 — Design the Schema Shape
Design the minimal schema that supports the required behavior.
Specify:
- Entity names and relationships (1:1, 1:N, M:N)
- Strict data types (prefer specific types like `UUID` or `TIMESTAMPTZ` over generic strings if the engine supports it)
- Constraints (NOT NULL, UNIQUE, CHECK)
- Primary and Foreign keys

### Step 4 — Define Indexing and Performance Strategies
Define the indexes required for the access patterns identified in Step 2.
- Consider composite indexes for multi-column queries.
- Consider partial/filtered indexes for specific status queries.
- Avoid over-indexing to protect write performance.

### Step 5 — Design the Migration Plan
Specify how the schema will be deployed safely:
- Can this be applied without locking tables?
- Does it require a multi-phase zero-downtime migration (e.g., Add column -> write to both -> backfill -> drop old column)?
- How will the rollback (down migration) function?

### Step 6 — Define Verification Requirements
Use `testing.md` to decide how this will be validated.
Examples:
- Schema validation tests
- Query performance benchmarks
- Migration dry-run tests

## Quality Check

Use this checklist when reviewing an existing schema or PR:

- Does the schema follow the project's naming conventions (e.g., snake_case vs camelCase)?
- Are foreign keys properly enforcing referential integrity?
- Are appropriate constraints in place to prevent bad data at the database level?
- Will the migration lock a critical table in production?
- Is there a clear separation between the database schema and the application's domain model?

## Anti-Pattern

- Assuming an ORM is used when the project strictly uses raw SQL.
- Suggesting a heavy relational model for a project that uses a document database.
- Proposing migrations that lock large tables (e.g., adding a column with a default value in older Postgres versions) without a zero-downtime strategy.
- Ignoring data types and using strings for dates, JSON, or booleans.
- Forgetting to define a rollback strategy for a destructive migration.

## Output Contract

When using this skill, the output should include:

1. the database engine and tools being targeted
2. the project docs consulted
3. the proposed schema / entity model
4. indexes and constraints
5. the migration strategy and risk assessment
6. verification strategy
7. open questions regarding data volume or access patterns

## Neutral Prompt Shape
`@agent use db-schema-design on [Target Feature/Entity] focusing on [Specific Requirement/Database Type].`

## Example Prompt
- "Design the schema migration for the new order tracking feature."
- "Optimize the indexing for this query based on read-heavy patterns."