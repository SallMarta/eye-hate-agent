---
name: api-design
description: "Project-aware contract design for APIs, interfaces, repositories, services, message schemas, and module boundaries. Reads project docs first, then produces or reviews a contract consistent with the current repository."
argument-hint: "Describe the boundary, interface, endpoint, message contract, or service behavior to design or review"
---

# Interface & API Contract Design — Project-Aware

Produces a **project-aware contract design or design review** by reading the repository's project docs first, then applying a reusable method to the current boundary type.

This skill is intentionally reusable across:

- HTTP APIs
- internal service interfaces
- repositories and adapters
- event or message contracts
- data-transfer schemas
- client or SDK boundaries

It should **not** assume one language, framework, transport, or architecture style until the project docs confirm them.

---

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/project-docs/TEMPLATE_CONTRACT.md` | Defines where project-specific truth should live |
| `docs/project-docs/ARCHITECTURE.md` | Defines stack, architecture boundaries, dependency rules, and integration patterns |
| `docs/project-docs/PROJECT.md` | Clarifies scope, constraints, stakeholders, and non-goals |
| `docs/project-docs/QUICK_REFERENCE.md` | Provides fast lookup for conventions, commands, and naming patterns |
| `docs/project-docs/TESTING.md` | Defines how the contract should be validated |
| Relevant feature docs, API docs, or guidelines | Provide domain-specific rules, request/response shapes, workflows, and edge cases |
| Existing code or contracts in the repo | Show local naming, layering, serialization, validation, and error conventions |

If the repository lacks the contract-defining docs needed for the task, call that out and create or update the missing docs instead of inventing local rules in the skill.

---

## When To Use

Use this skill when designing or reviewing one of these boundary types.

| Boundary type | Typical artifacts |
| --- | --- |
| External HTTP / RPC API | route, handler, controller, request/response schema, auth, pagination, versioning |
| Internal service interface | method signatures, error contract, idempotency, retries, transaction boundaries |
| Repository or persistence boundary | interface, query contract, mapping rules, transaction semantics |
| Adapter or integration boundary | client interface, DTOs, transport mapping, failure translation |
| Event or message contract | payload schema, producer/consumer expectations, ordering, retry, dead-letter rules |
| Module boundary | public interface, dependency direction, allowed imports, extension points |

---

## Procedure

### Step 1 — Identify the contract owner

Determine which layer or module owns the boundary.

Questions to answer:

- Is this public or internal?
- Is it synchronous or asynchronous?
- Is it request/response, command, query, event, or stream based?
- Which side owns validation?
- Which side owns retries and failure translation?

Use `ARCHITECTURE.md` to avoid violating the project's dependency or layering rules.

### Step 2 — Identify the project-specific constraints

Extract from project docs:

- naming conventions
- error model
- serialization format
- auth and authorization expectations
- pagination / filtering conventions
- idempotency or transaction expectations
- observability or auditing requirements
- compatibility or versioning rules

Do not assume REST, JSON, SQL, Clean Architecture, CQRS, or any other pattern unless the docs require it.

### Step 3 — Define the contract shape

Design the minimal contract that supports the required behavior.

Depending on the boundary, specify:

- inputs
- outputs
- failure modes
- validation rules
- side effects
- ordering or transaction semantics
- timeouts or retry expectations
- invariants that must always hold

Prefer explicit types or schemas over ambiguous free-form payloads.

### Step 4 — Separate durable domain concepts from transport details

If the project distinguishes domain models from transport or persistence models, keep them separate.

Typical separations include:

- domain entity vs API DTO
- service input object vs controller request body
- repository interface vs database table model
- event contract vs internal aggregate or entity state

Use the separation rules already defined by the project docs. Do not invent new layering rules casually.

### Step 5 — Define the error contract

Specify:

- expected failure categories
- how they surface to callers
- which failures are retriable
- which failures are validation vs business vs infrastructure errors
- what data is safe to expose externally

If the repo already defines a standard result wrapper, exception hierarchy, or error envelope, reuse it.

### Step 6 — Define verification requirements

Use `TESTING.md` to decide how the contract should be validated.

Examples:

- schema or serialization tests
- handler / controller tests
- repository or persistence tests
- integration tests against a real dependency
- compatibility or migration checks
- documentation consistency review

### Step 7 — Produce the design output

The output should fit the repository style and include enough detail to implement safely without locking the repo into one stack-specific pattern that the docs do not support.

---

## Output Contract

When using this skill, the output should include:

1. the boundary type
2. the project docs consulted
3. the proposed contract shape
4. validation and error rules
5. ownership and dependency implications
6. verification strategy
7. open questions that still require product or architecture decisions

---

## Quality Checks

Use this checklist when reviewing an existing contract:

- Is the boundary owned by the correct layer or module?
- Does the contract match project naming and error conventions?
- Are validation rules explicit?
- Are transport details separated from durable domain concepts where required?
- Are failure modes documented and actionable?
- Does the contract create hidden coupling or leak implementation details?
- Is there a clear verification strategy in `TESTING.md`?

---

## Anti-Patterns

- Embedding one stack's rules into the skill instead of reading project docs
- Designing an interface before understanding the owning boundary
- Mixing transport payload shape with domain concepts when the project separates them
- Returning ambiguous success or failure semantics
- Ignoring versioning, compatibility, or migration concerns for externally visible contracts
- Over-designing the contract far beyond the current scope in `PROJECT.md`

---

## Example Requests

- "Design the repository contract for this feature"
- "Review this controller and DTO boundary"
- "Design an event payload for this workflow"
- "Define the error contract for this external integration"
