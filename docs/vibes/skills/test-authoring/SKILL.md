---
name: test-authoring
description: "Project-aware expert-role verification strategy and test authoring that reads project docs to choose the right frameworks, commands, layers, and templates. Use when deciding test scope, validating regressions, choosing verification strategy, and writing or reviewing tests across any stack."
argument-hint: "Describe the behavior, bug, feature, boundary, or artifact to test"
---

# Test Authoring — Project-Aware

Produces an **expert, project-aware verification strategy and test implementation plan** by reading the repository's documentation contract first, then selecting the correct test types, commands, and conventions for the current stack.

This skill is intentionally **not tied to any single stack or framework**. The stack-specific truth should come from project docs.

This skill is **verification-strategy-first**. Its primary job is to choose the right verification boundary, check type, commands, and assertions; writing the test code is downstream of that decision when implementation is actually needed.

---

## Required Project Inputs

Read the relevant docs before proposing or writing tests.

| Document | Why it matters |
| --- | --- |

| `docs/project-docs/technical/testing.md` | Primary source for verification policy, commands, quality gates, and fallback rules |
| `docs/project-docs/foundation/architecture.md` | Explains runtime boundaries, architecture pattern, integrations, storage, and enforcement rules |
| `docs/project-docs/foundation/status.md` | Reveals current implementation state, risks, and which workstream the change belongs to |
| Relevant feature docs under `docs/project-docs/` or `docs/project-docs/technical-guidelines/` | Provide domain-specific behavior, API contracts, or user-flow expectations |
| Existing test files in the repo | Show naming, folder structure, harness setup, and local conventions |

If one of the required docs is missing and the task depends on it, surface that explicitly and create or update the doc instead of guessing.

---

## When To Use

| Trigger | Example request |
| --- | --- |
| Change verification | "Choose the right verification for this repository-layer change" |
| API contract update | "What tests should cover this API contract update?" |
| Migration or persistence change | "Write a test plan for this migration change" |
| Documentation-only repo change | "How should I validate a reusable prompt or platform instruction surface update?" |

Use `full-verification` instead when the user wants a broad verification entry point that may need to choose between code review, docs consistency, contract review, health assessment, or executable testing.

Use `code-audit` instead when the main question is whether the implementation is correct.

Use `analysis` instead when the task is explaining a failure or comparing technical options rather than deciding how to verify them.

---

## Procedure

### Step 1 — Identify the verification target

Determine what changed:

- deterministic logic or transformation behavior
- interface, contract, or boundary behavior
- state, storage, migration, or lifecycle behavior
- internal coordination or module interaction behavior
- external dependency or integration behavior
- interactive, operator, or consumer-facing flow
- background, scheduled, evented, or staged processing
- documentation, reusable prompt, or rule behavior

### Step 2 — Read the project-specific verification rules

Use `testing.md` as the first stop.

Extract:

- which checks are required
- which commands are available
- which test layers exist
- which checks are blocking vs advisory
- what to do when the repo has no executable validation yet

### Step 3 — Choose the narrowest useful check

Prefer the smallest check that can disconfirm the current assumption.

Order of preference:

1. targeted unit or component test
2. boundary or contract test
3. integration test
4. build or analysis check
5. documentation or consistency review when no executable check exists

If the user asked to write tests, still make this decision first before drafting any implementation.

### Step 4 — Match the check to the architecture boundary

Use `architecture.md` to decide whether the test should sit at:

- domain or business-logic boundary
- interface or contract boundary
- adapter or integration boundary
- persistence boundary
- presentation or user-flow boundary

Do not test below or above the intended boundary without a reason.

### Step 5 — Follow repository conventions

Use existing project patterns for:

- file naming
- directory structure
- fixtures, samples, or test artifacts
- mocks, stubs, fakes, simulators, or other doubles
- harness or environment setup
- boundary-specific fixtures or sample data
- dependency setup, replacement, or override patterns

If the repo does not define a convention yet, propose one briefly and keep it minimal.

### Step 6 — Execute the documented checks

Run the exact commands from `testing.md` when they exist.

If the repo is documentation-only or otherwise lacks executable checks:

- perform the strongest structural review available
- state the limitation clearly
- recommend the missing verification doc or command only if it materially blocks quality

### Step 7 — Report what was actually covered

Separate:

- what was verified
- what was not verified
- what still depends on manual review or future automation

---

### Check Selection Matrix

| Scenario | Preferred check type | Read first |
| --- | --- | --- |
| Pure function, mapper, validator, parser | Unit | `testing.md`, `architecture.md` |
| Internal coordination, service, or module behavior | Unit or component | `testing.md`, `architecture.md`, feature docs |
| State transition, migration, or persistence rule | Persistence / migration test | `testing.md`, `architecture.md`, data-model docs |
| Interface, handler, adapter, or contract boundary | Contract or integration test | `testing.md`, API / integration docs |
| Interactive or end-user-visible flow | UI or end-to-end test | `testing.md`, app-flow / UI docs |
| Asynchronous, scheduled, staged, or event-driven processing | Integration or component test | `testing.md`, `architecture.md`, workflow docs |
| Rule, skill, reusable prompt, or documentation change | Consistency review or structural validation | EHA rules, `testing.md` |

---

## Output Contract

When using this skill, the output should include:

1. the recommended verification boundary
2. the specific check type to use
3. the project docs consulted
4. whether new or changed tests are actually needed
5. the command(s) to run, or the reason no executable command exists
6. the expected assertions or behaviors to verify
7. any residual risks or uncovered paths

---

## Quality Checks

- Choose the narrowest check that can falsify the current assumption
- Do not recommend commands before checking `testing.md`
- Keep the verification boundary aligned with `architecture.md`
- Separate what was verified from what still depends on manual review or future automation

---

## Anti-Patterns

- Hardcoding one framework's tools into the skill text when that belongs in `testing.md`
- Writing an end-to-end test when a narrow unit or contract test would falsify the same assumption
- Jumping straight to writing test code before choosing the verification boundary and check type
- Recommending commands without first checking `testing.md`
- Guessing naming conventions instead of checking the repo
- Treating documentation-only repositories as if they must already have executable tests
- Confusing architecture examples with mandatory implementation details

---

## Natural Prompt Shapes

- "What is the right way to verify this change?"
- "Which tests should we add for this API or bug fix?"
- "Use the correct testing approach for this stack and tell me what to run."
- "Do we actually need new tests here, and if so at what boundary?"

---

## Example Requests

- "Choose the right verification for this repository-layer change"
- "What tests should cover this API contract update?"
- "Write a test plan for this migration change"
- "This repo has no code yet — how should I validate a reusable prompt or platform instruction surface update?"


---

# Test Patterns Reference — Project-Aware

Quick reference for common test-pattern shapes. Use these as **structural examples**, then adapt them using the repository's `testing.md`, `architecture.md`, and local conventions.

---

## Pattern A: Narrow Unit Or Component Test

Use when you want the fastest check at a clear boundary.

### Pattern A Skeleton

```text
Arrange inputs and collaborators
Act on one function, method, or component boundary
Assert on the returned value, state change, or emitted effect
```

### Pattern A Good Fit

- pure functions
- mappers or transformers
- validators
- repository or service methods with mocked dependencies
- small boundary-level business logic

### Pattern A Checklist

- isolate one behavior
- keep collaborators fake or mocked when helpful
- assert on outcomes, not internal implementation noise
- name tests by observable behavior

---

## Pattern B: Persistence Or Contract Test

Use when you need confidence in schema, queries, serialization, or boundary compatibility.

### Pattern B Skeleton

```text
Set up an isolated persistence or contract environment
Insert or send representative inputs
Read back or decode the resulting output
Assert on correctness, constraints, and error cases
```

### Pattern B Good Fit

- database queries
- repository persistence rules
- schema evolution
- migration behavior
- request / response or message serialization
- interface compatibility checks

### Pattern B Checklist

- include one happy path
- include one invalid or edge case
- assert on durable outcomes, not just returned status
- use representative fixtures where that improves clarity

---

## Pattern C: Flow Or Interaction Test

Use when the value lies in verifying a user, operator, or system flow instead of an isolated unit.

### Pattern C Skeleton

```text
Start from a realistic entry point
Drive the interaction or workflow
Wait for the expected state transition
Assert on visible output, routed behavior, or side effects
```

### Pattern C Good Fit

- UI interactions
- endpoint-to-service flow
- command or job workflows
- integration boundaries
- navigation or routing flows

### Pattern C Checklist

- keep the flow focused on one meaningful outcome
- mock or isolate irrelevant external dependencies when possible
- assert on the behavior the caller or user experiences
- avoid testing multiple unrelated journeys in one case

---

## Common Assertions To Prefer

- returned values or result envelopes
- persisted state
- emitted events or messages
- visible UI state
- boundary calls that materially define behavior
- error category and recovery path

Prefer observable behavior over internal implementation details.

---

## Common Anti-Patterns

- testing too many branches in one test
- asserting on private implementation details
- using full integration tests when a narrow unit or contract test would falsify the same assumption
- naming tests after implementation rather than behavior
- copying framework-specific scaffolds without checking `testing.md`


---

# Test Type Decision Table — Project-Aware

Use this table to choose the smallest verification type that matches the actual boundary being changed. Confirm the final choice against the repository's `testing.md`.

| Scenario | Preferred check type | Why |
| --- | --- | --- |
| Pure function, mapper, validator, parser | Unit | Fastest falsifiable check with minimal setup |
| Internal service or repository rule | Unit or component | Verifies business behavior without unnecessary system setup |
| Persistence query, migration, or schema rule | Persistence / migration test | Verifies durable state and compatibility at the right boundary |
| Request, handler, controller, or public API contract | Contract or integration test | Verifies visible boundary behavior and schema expectations |
| UI or operator interaction flow | Flow / interaction test | Verifies user-visible behavior rather than isolated internals |
| Async job, workflow, or queue behavior | Component or integration test | Verifies sequencing, retry, and side-effect behavior |
| Documentation, reusable prompt, or platform instruction surfaces change | Structural consistency review | Executable tests may not exist; consistency becomes the real boundary |

---

## Test Type Summary

| Type | Best for | Typical cost | Isolation |
| --- | --- | --- | --- |
| Unit | Pure logic and narrow behavior | Lowest | Highest |
| Component | One internal boundary with collaborators | Low to medium | High |
| Persistence / contract | Durable state or schema behavior | Low to medium | Medium to high |
| Flow / interaction | User or system-visible path | Medium | Medium |
| Integration | Real dependency or end-to-end boundary | Highest | Lowest |
| Consistency review | Docs, reusable prompts, platform instruction surfaces, and template systems | Low | High |

---

## Selection Rules

1. Prefer the narrowest check that can prove the change is correct.
2. Escalate to broader tests only when the boundary truly requires it.
3. Use project docs to choose commands, harnesses, and file placement.
4. When no executable validation exists, make the structural review explicit rather than pretending the repo is fully testable.

---

## Naming Guidance

Prefer behavior-driven names such as:

- `returns empty result when no records match`
- `rejects invalid payload when required field is missing`
- `shows retry state after dependency timeout`
- `persists latest progress after successful update`

Avoid placeholder names such as:

- `test1`
- `happy path`
- `error case`
