---
name: project-elevation
description: "Project-aware expert-role elevation analysis to identify missing capabilities, weak reliability, poor user or operator experience, and high-value next improvements. Reads project docs first, then suggests realistic upgrades for the repository's current stage."
argument-hint: "Point to the project, module, workflow, or feature to evaluate for improvement"
---

# Project Elevation — Project-Aware

Performs an **expert forward-looking evaluation** of a project, feature, workflow, or module to find meaningful improvements in reliability, usability, maintainability, delivery readiness, and developer experience.

This skill is designed to avoid generic wish lists. It should recommend improvements that are realistic for the repository's actual scope, stage, and constraints.

---

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/eyehateagent-contract.md` | Defines where project truth and ownership live |
| `docs/project-docs/PROJECT.md` | Clarifies goals, stakeholders, non-goals, and success metrics |
| `docs/project-docs/ARCHITECTURE.md` | Defines stack, boundaries, and implementation constraints |
| `docs/project-docs/STATUS.md` | Shows maturity, roadmap, and current execution state |
| `docs/project-docs/TESTING.md` | Shows current verification maturity and release confidence |
| `docs/project-docs/QUICK_REFERENCE.md` | Supplies high-signal operational details |
| Relevant feature, API, workflow, or UX docs | Clarify what the system already promises |

---

## When To Use

| Trigger | Example request |
| --- | --- |
| Roadmap review | "Evaluate this project for the next highest-value improvements" |
| Feature assessment | "What is missing from this workflow before it is production-ready?" |
| Reliability review | "Where should this module be elevated for resilience first?" |
| Delivery readiness | "What should improve before we call this MVP complete?" |

Use `analysis` instead when the main question is why something behaves the way it does, whether a decision is correct, or which option is better.

Use `code-audit` instead when the main question is whether an existing implementation has correctness, logic, or boundary defects.

Use `test-authoring` instead when the main question is how a change or behavior should be verified.

---

## Procedure

### Step 1 — Understand the current state

- What does the system already do?
- Who uses it or depends on it?
- What stage is it in: concept, prototype, MVP, production, maintenance?
- What is explicitly out of scope?
- What current constraints would make some improvements unrealistic right now?

### Step 2 — Scan for missing failure handling

Look for places where the system could fail silently or recover poorly.

Examples:

- no clear offline or dependency-failure behavior
- missing retry, timeout, or rollback behavior
- no error-state UX or operator feedback
- missing migration or compatibility handling
- no recovery path for partial success or interruption

### Step 3 — Scan for natural feature gaps

Look for missing capabilities that are implied by current user flows or system promises.

Examples:

- one-way workflows with no cleanup or reverse action
- creation or capture flow with no correction, update, archival, or removal path
- discovery or lookup behavior with no empty, degraded, or large-result handling
- output generation or save action with no review, history, or management path
- automation with no observability or intervention path
- release or rollout process with no rollback, verification, or recovery checks

### Step 4 — Scan for improvement opportunities

Evaluate:

- reliability
- security
- performance
- observability
- developer experience
- user experience
- maintainability

Prioritize changes that improve the system materially without violating the project's scope or stage.

### Step 5 — Prioritize recommendations

Classify each recommendation as:

- must-have
- high-value
- nice-to-have
- future

Tie the rating back to current goals and constraints from `PROJECT.md` and `STATUS.md`.

Prefer the smallest realistic next step over a broad rewrite when both could address the same gap.

---

## Output Contract

Include:

1. elevation summary
2. missing error handling
3. missing features
4. improvement opportunities by category
5. recommended roadmap or next actions

---

## Quality Checks

- No gold-plating for an early-stage project
- No recommendation that conflicts with explicit non-goals
- No large rewrite suggestion without a clear payoff
- No generic checklist detached from the actual repository
- Recommendations are prioritized and actionable

---

## Anti-Patterns

- Suggesting enterprise-scale systems for a small internal or MVP project
- Ignoring what the project explicitly does not want to become
- Producing a long unranked list with no delivery guidance
- Using this skill as a generic root-cause analysis or code-review wrapper when `analysis` or `code-audit` is the real fit
- Recommending improvements that the current architecture cannot plausibly support without acknowledging that cost

---

## Example Requests

- "Evaluate this project for the next highest-value improvements"
- "What should improve before this workflow is production-ready?"
- "Where is the biggest reliability gap in this module?"
- "What should we add before calling this MVP complete?"
