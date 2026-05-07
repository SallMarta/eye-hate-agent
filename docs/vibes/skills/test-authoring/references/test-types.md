# Test Type Decision Table — Project-Aware

Use this table to choose the smallest verification type that matches the actual boundary being changed. Confirm the final choice against the repository's `TESTING.md`.

| Scenario | Preferred check type | Why |
| --- | --- | --- |
| Pure function, mapper, validator, parser | Unit | Fastest falsifiable check with minimal setup |
| Internal service or repository rule | Unit or component | Verifies business behavior without unnecessary system setup |
| Persistence query, migration, or schema rule | Persistence / migration test | Verifies durable state and compatibility at the right boundary |
| Request, handler, controller, or public API contract | Contract or integration test | Verifies visible boundary behavior and schema expectations |
| UI or operator interaction flow | Flow / interaction test | Verifies user-visible behavior rather than isolated internals |
| Async job, workflow, or queue behavior | Component or integration test | Verifies sequencing, retry, and side-effect behavior |
| Documentation, prompt, or rules change | Structural consistency review | Executable tests may not exist; consistency becomes the real boundary |

---

## Test Type Summary

| Type | Best for | Typical cost | Isolation |
| --- | --- | --- | --- |
| Unit | Pure logic and narrow behavior | Lowest | Highest |
| Component | One internal boundary with collaborators | Low to medium | High |
| Persistence / contract | Durable state or schema behavior | Low to medium | Medium to high |
| Flow / interaction | User or system-visible path | Medium | Medium |
| Integration | Real dependency or end-to-end boundary | Highest | Lowest |
| Consistency review | Docs, prompts, rules, and template systems | Low | High |

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
