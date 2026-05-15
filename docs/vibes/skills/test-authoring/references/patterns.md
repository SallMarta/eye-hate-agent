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
