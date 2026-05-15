---
name: full-verification
description: "Project-aware expert-role broad verification that reads project docs first, classifies the verification target, and routes to the best specialist skill for executable or non-executable checks across code, contracts, docs, architecture, quality, security, reliability, and project health."
argument-hint: "Describe what should be verified against the contract, project docs, guidelines, code, APIs, architecture, or repository state"
---

# Full Verification — Project-Aware

Provides an **expert, project-aware broad verification entry point** for requests that ask whether something is correct, consistent, healthy, complete, or aligned with the repository's contract and project docs.

This skill is **routing-first**. Its primary job is to identify the dominant verification question and route to the single best specialist skill rather than duplicating every verification procedure itself.

This skill is intentionally **not tied to any single stack or framework**. When executable checks are needed, it should select the correct framework, commands, and conventions from the project's `testing.md`, `architecture.md`, `quick-reference.md`, and local repository patterns.

---

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/eyehateagent-contract.md` | Defines routing, ownership, precedence, and the active skill model |
| `docs/project-docs/testing.md` | Defines executable and non-executable verification rules, commands, and fallback policy |
| `docs/project-docs/architecture.md` | Defines boundaries, stack, interfaces, dependency rules, and runtime assumptions |
| `docs/project-docs/project.md` | Defines goals, scope, non-goals, and success criteria |
| `docs/project-docs/status.md` | Defines maturity, roadmap, active workstreams, and readiness context |
| `docs/project-docs/quick-reference.md` | Provides high-signal commands, paths, and local conventions |
| Relevant guideline docs under `docs/project-docs/guidelines/` | Define technical standards such as API, logging, database, error-handling, code style, or design patterns |
| Relevant code, tests, docs, contracts, and repository artifacts | Provide the actual evidence surfaces to verify against |

If required project docs are missing, surface that gap explicitly and limit confidence rather than guessing.

---

## When To Use

| Trigger | Example request |
| --- | --- |
| Broad verification request | "Verify this feature against the project docs, contract, and actual code" |
| API and implementation alignment | "Check whether this API matches the docs, code, and guideline standards" |
| Repository consistency and health check | "Evaluate this project for health, maturity, architecture drift, and consistency" |
| Stack-aware validation request | "Use the right testing and review approach for this Go service" |
| Requirements or decision consistency review | "Check whether these requirements and design decisions still match the repo" |

Use a specialist skill directly when the dominant question is already obvious:

- `test-authoring` for executable verification strategy, stack-aware test selection, and test-writing decisions
- `code-audit` for code correctness, bug, risk, security, and boundary review
- `consistency-audit` for repository drift across docs, rules, skills, prompts, and summaries
- `project-elevation` for forward-looking improvement and readiness planning
- `analysis` for root-cause reasoning, trade-off evaluation, and requirement or decision analysis
- `api-design` for API, schema, interface, or boundary contract design and review

---

## Procedure

### Step 1 — Identify the verification target

Determine what the user wants verified:

- executable behavior or regression risk
- code quality, bug risk, or security exposure
- API or interface contract alignment
- docs or contract consistency
- architecture or design consistency
- project health, maturity, readiness, or reliability posture
- requirements, assumptions, trade-offs, or design-decision consistency

### Step 2 — Gather the governing truth

Read the contract and the owning project docs first.

Extract:

- applicable verification rules
- current stack and boundary model
- active guidelines and standards
- project stage and readiness expectations
- available evidence and validation commands

### Step 3 — Choose the dominant verification mode

Prefer the single strongest verification path unless the user explicitly asks for a broader sweep.

| Dominant verification question | Route to |
| --- | --- |
| How should this be verified, tested, or regression-checked in the current stack? | `test-authoring` |
| Is this code correct, safe, consistent, and free of obvious bugs or boundary violations? | `code-audit` |
| Does this API or interface contract match the docs, code, and boundary rules? | `api-design` |
| Do the docs, rules, skills, prompts, and repository artifacts still agree? | `consistency-audit` |
| What should improve next, and how healthy or mature is this project at its current stage? | `project-elevation` |
| Do the requirements, trade-offs, design decisions, or explanations hold up? | `analysis` |

Example prompt shapes by verification category:

| Verification category | Example prompts |
| --- | --- |
| Executable verification strategy | "Verify this Python bug fix and tell me which `pytest` checks should run." / "Use the right test approach for this Go handler and tell me what command to run." |
| Code quality, bug, risk, or security review | "Verify whether this module has bug risks, security issues, or boundary violations." / "Check this implementation against the docs and code-quality rules." |
| API or interface contract alignment | "Verify whether this API matches the project docs, guideline standards, and actual code." / "Check whether this repository contract still matches the service and its documented boundary rules." |
| Docs, contract, or repository consistency | "Verify whether the project docs still match the current repository and contract." / "Check for drift across docs, rules, skills, prompts, and quick-reference files." |
| Architecture, health, maturity, or readiness | "Verify this project's health and maturity against the contract and current repository state." / "Check whether the architecture and current implementation still support production readiness." |
| Requirements, trade-offs, or decision consistency | "Verify whether these requirements and design decisions still hold up against the current repo." / "Check whether this technical trade-off still makes sense given the architecture and status docs." |

### Step 4 — Select the stack-aware checks

When executable validation is required, choose the appropriate framework and commands from project docs and local repo conventions.

Examples of the decision pattern:

- Go project -> use the Go testing approach documented in `testing.md`
- Python project -> use the Python testing approach documented in `testing.md`
- documentation-only project -> use structural consistency review rather than inventing executable checks

Do not hardcode frameworks in the skill itself when the owning repo docs should decide them.

### Step 5 — Report the routed verification plan

State:

- what is being verified
- which specialist skill is the best fit
- why that route was chosen over nearby alternatives
- what evidence and checks should be used
- what remains outside the chosen verification path

---

## Output Contract

When using this skill, the output should include:

1. the verification target summary
2. the dominant verification mode
3. the specialist skill selected and why
4. the project docs and evidence surfaces consulted
5. the recommended checks or commands to run, or the reason no executable check exists
6. the expected output or findings type from the selected path
7. any residual risks or uncovered verification areas

---

## Quality Checks

- Route to the single best specialist skill unless the user explicitly asks for a broader sweep
- Do not duplicate another skill's full procedure inside this skill
- Do not assume frameworks or commands before checking the project docs
- Keep executable and non-executable verification clearly separated
- State when confidence is limited by missing docs or missing evidence

---

## Anti-Patterns

- Treating verification as synonymous with writing tests
- Hardcoding stack-specific frameworks into the skill text
- Routing a docs-drift problem to `code-audit`
- Routing a forward-looking improvement question to `analysis`
- Running a multi-skill sweep by default when one dominant verification path would answer the request
- Claiming the repository passed a check when the relevant evidence or command was never examined

---

## Example Requests

- "Verify this feature against the project docs, contract, and actual code"
- "Check whether this API matches the docs, code, and guideline standards"
- "Evaluate this project for health, maturity, architecture drift, and consistency"
- "Use the right verification approach for this stack and tell me what to run"