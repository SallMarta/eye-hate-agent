---
name: test-authoring
description: "Project-aware test authoring that reads project docs to choose the right frameworks, commands, layers, and templates. Use when writing or reviewing tests, deciding test scope, validating regressions, or choosing verification strategy across any stack."
argument-hint: "Describe the behavior, bug, feature, boundary, or artifact to test"
---

# Test Authoring — Project-Aware

Produces a **project-aware verification plan or test implementation strategy** by reading the repository's documentation contract first, then selecting the correct test types, commands, and conventions for the current stack.

This skill is intentionally **not tied to any single stack or framework**. The stack-specific truth should come from project docs.

---

## Required Project Inputs

Read the relevant docs before proposing or writing tests.

| Document | Why it matters |
| --- | --- |
| `docs/eyehateagent-contract.md` | Tells you which docs are required and where project-specific truth should live |
| `docs/project-docs/TESTING.md` | Primary source for verification policy, commands, quality gates, and fallback rules |
| `docs/project-docs/ARCHITECTURE.md` | Explains runtime boundaries, architecture pattern, integrations, storage, and enforcement rules |
| `docs/project-docs/QUICK_REFERENCE.md` | Fast lookup for commands, paths, conventions, and common patterns |
| `docs/project-docs/STATUS.md` | Reveals current implementation state, risks, and which workstream the change belongs to |
| Relevant feature docs under `docs/project-docs/` or `docs/project-docs/guidelines/` | Provide domain-specific behavior, API contracts, or user-flow expectations |
| Existing test files in the repo | Show naming, folder structure, harness setup, and local conventions |

If one of the required docs is missing and the task depends on it, surface that explicitly and create or update the doc instead of guessing.

---

## When To Use

| Trigger | Example request |
| --- | --- |
| Change verification | "Choose the right verification for this repository-layer change" |
| API contract update | "What tests should cover this API contract update?" |
| Migration or persistence change | "Write a test plan for this migration change" |
| Documentation-only repo change | "How should I validate a reusable prompt or rules update?" |

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

Use `TESTING.md` as the first stop.

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

### Step 4 — Match the check to the architecture boundary

Use `ARCHITECTURE.md` to decide whether the test should sit at:

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

Run the exact commands from `TESTING.md` or `QUICK_REFERENCE.md` when they exist.

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
| Pure function, mapper, validator, parser | Unit | `TESTING.md`, `ARCHITECTURE.md` |
| Internal coordination, service, or module behavior | Unit or component | `TESTING.md`, `ARCHITECTURE.md`, feature docs |
| State transition, migration, or persistence rule | Persistence / migration test | `TESTING.md`, `ARCHITECTURE.md`, data-model docs |
| Interface, handler, adapter, or contract boundary | Contract or integration test | `TESTING.md`, API / integration docs |
| Interactive or end-user-visible flow | UI or end-to-end test | `TESTING.md`, app-flow / UI docs |
| Asynchronous, scheduled, staged, or event-driven processing | Integration or component test | `TESTING.md`, `ARCHITECTURE.md`, workflow docs |
| Rule, skill, reusable prompt, or documentation change | Consistency review or structural validation | `docs/eyehateagent-contract.md`, `TESTING.md` |

---

## Output Contract

When using this skill, the output should include:

1. the recommended verification boundary
2. the specific check type to use
3. the project docs consulted
4. the command(s) to run, or the reason no executable command exists
5. the expected assertions or behaviors to verify
6. any residual risks or uncovered paths

---

## Quality Checks

- Choose the narrowest check that can falsify the current assumption
- Do not recommend commands before checking `TESTING.md` and `QUICK_REFERENCE.md`
- Keep the verification boundary aligned with `ARCHITECTURE.md`
- Separate what was verified from what still depends on manual review or future automation

---

## Anti-Patterns

- Hardcoding one framework's tools into the skill text when that belongs in `TESTING.md`
- Writing an end-to-end test when a narrow unit or contract test would falsify the same assumption
- Recommending commands without first checking `TESTING.md`
- Guessing naming conventions instead of checking the repo
- Treating documentation-only repositories as if they must already have executable tests
- Confusing architecture examples with mandatory implementation details

---

## Example Requests

- "Choose the right verification for this repository-layer change"
- "What tests should cover this API contract update?"
- "Write a test plan for this migration change"
- "This repo has no code yet — how should I validate a reusable prompt or rules update?"
