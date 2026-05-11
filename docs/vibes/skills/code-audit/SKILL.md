---
name: code-audit
description: "Project-aware code audit for bugs, risk, redundancy, dead code, weak boundaries, and logic flaws. Reads project docs first, then audits code against the repository's actual architecture and quality rules."
argument-hint: "Point to the code, file, module, or change to audit"
---

# Code Audit — Project-Aware

Performs a **systematic, critical audit** of code or code-related artifacts after first reading the project documentation that defines the repository's architecture, verification model, and constraints.

This skill is reusable across application code, backend services, scripts, automation, infrastructure code, and documentation-driven repositories.

---

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `TEMPLATE_CONTRACT.md` | Defines where the relevant truth should live |
| `docs/project-docs/ARCHITECTURE.md` | Defines boundaries, dependencies, stack choices, and anti-violation rules |
| `docs/project-docs/TESTING.md` | Defines available validation and evidence strength |
| `docs/project-docs/PROJECT.md` | Clarifies scope, non-goals, and project stage |
| `docs/project-docs/QUICK_REFERENCE.md` | Provides conventions and high-signal operational facts |
| Relevant feature or guideline docs | Clarify local behavior, workflows, APIs, schemas, or UX expectations |
| The target code and nearby tests | Provide actual evidence for findings |

---

## When To Use

| Trigger | Example request |
| --- | --- |
| Change review | "Audit this change for correctness and boundary risk" |
| Module or file review | "Audit this module for dead code and duplication" |
| Reliability check | "Audit this service for failure handling gaps" |
| Architecture review | "Audit this workflow for boundary violations" |

---

## Procedure

### Step 1 — Understand intent

- What is this code supposed to do?
- What inputs, outputs, and side effects should it have?
- Which boundary does it sit behind?
- What project rules apply here?

### Step 2 — Check correctness risks

Look for:

- runtime crashes
- missing validation
- broken assumptions around nullability or absence
- incorrect state transitions
- failure to handle empty, partial, duplicate, or delayed inputs
- unsafe retry or transaction behavior
- concurrency or sequencing defects
- schema or serialization mismatches

### Step 3 — Check boundary violations

Use `ARCHITECTURE.md` to inspect:

- layer or module import violations
- leaked internal types across boundaries
- controllers or UI doing business logic that belongs elsewhere
- repositories or services depending on the wrong layer
- transport or persistence details leaking into durable domain concepts when the project forbids that

### Step 4 — Check risk and operability

Look for:

- security exposure
- data-loss potential
- missing error translation
- logging or observability gaps
- migration or compatibility risk
- unbounded memory, time, or query behavior
- hidden coupling to environment or deployment assumptions

### Step 5 — Check redundancy and dead paths

Look for:

- duplicated logic
- unused or unreachable branches
- stale abstractions
- helper functions with no callers
- repeated literal values that should be owned centrally
- duplicated normalization or mapping logic that should be shared

### Step 6 — Check logic quality

Look for:

- unnecessarily complicated logic
- wrong abstraction level
- mismatch between code shape and problem shape
- poor data-structure choice
- fragile condition ordering
- subtle off-by-one or ordering issues
- code that technically works but will be hard to maintain safely

### Step 7 — Prioritize findings

Classify findings by severity:

- critical
- high
- medium
- low

Each finding should include:

- location
- issue
- why it matters
- concrete corrective direction

---

## Output Contract

Include:

1. audit summary
2. findings ordered by severity
3. positive observations where relevant
4. recommended next actions in priority order

---

## Quality Checks

- No finding without evidence from the target artifact
- No severity inflation
- No style nitpicks disguised as bugs
- No architecture complaint without reference to actual project boundaries
- No recommendation that ignores project stage or available validation

---

## Anti-Patterns

- Calling something dead code without checking workspace usage
- Calling something a bug without defining the failure condition
- Criticizing a pattern that the project explicitly chose in `ARCHITECTURE.md`
- Recommending wide rewrites before testing a local fix or a smaller boundary change

---

## Example Requests

- "Audit this service for boundary violations"
- "Review this change for correctness risks"
- "Check this module for dead code and duplication"
- "Audit this workflow implementation for operability gaps"
