---
name: analysis
description: "Project-aware expert-role analysis for architecture, debugging, trade-offs, risk, performance, requirements, and design questions. Reads project docs first, then applies expert structured reasoning to the current repository context."
argument-hint: "Describe the problem, decision, artifact, or system to analyze"
---

# Analysis — Project-Aware

Produces a **rigorous, expert-level analysis** of a problem, decision, artifact, or system after first reading the project documentation that defines the repository's actual context.

This skill is reusable across product, backend, frontend, infrastructure, monorepo, and documentation-heavy projects. It should not assume a particular stack until the project docs confirm it.

---

## Required Project Inputs

| Document | Why it matters |
| --- | --- |

| `docs/project-docs/project.md` | Clarifies goals, scope, stakeholders, and success metrics |
| `docs/project-docs/architecture.md` | Defines stack, boundaries, integration model, constraints, and runtime assumptions |
| `docs/project-docs/status.md` | Reveals maturity, roadmap, active workstreams, and known blockers |
| `docs/project-docs/testing.md` | Shows what validation exists and how strong the available evidence can be |
| `docs/project-docs/quick-reference.md` | Provides high-signal conventions, commands, and paths |
| Relevant feature, workflow, API, or guideline docs | Supply domain-specific truth for the topic being analyzed |
| Relevant code, logs, tests, or runtime evidence | Support findings with direct evidence rather than guesswork |

If the required project docs are missing, note the gap explicitly and limit confidence accordingly.

---

## When To Use

| Trigger | Example request |
| --- | --- |
| Architecture review | "Analyze this module boundary for coupling risk" |
| Debugging | "Analyze why this workflow fails intermittently" |
| Trade-off decision | "Analyze option A vs option B for this integration" |
| Requirements review | "Analyze these specs for gaps and contradictions" |
| Risk assessment | "Analyze the release risk of this change" |
| Performance diagnosis | "Analyze where this request path will bottleneck" |
| Product or roadmap question | "Analyze whether this feature belongs in MVP" |

---

## Procedure

### Step 1 — Understand the question

- Restate the problem in precise terms.
- Identify the decision being made or the behavior being explained.
- Identify what counts as success or failure.
- Identify any missing context that materially changes the analysis.

### Step 2 — Ground the analysis in project reality

Read the relevant project docs first.

Extract:

- actual stack and runtime model
- architecture rules and boundaries
- scope and non-goals
- available verification signals
- known constraints such as team size, maturity, environment, or performance budget

### Step 3 — Decompose the subject

Break the problem into:

- components
- boundaries
- dependencies
- failure points
- assumptions
- decision criteria

Identify the most load-bearing parts first.

### Step 4 — Gather evidence

Prefer direct evidence from:

- code
- tests
- runtime logs
- project docs
- API or contract docs
- existing workflows

Separate:

- facts
- inferences
- assumptions

### Step 5 — Apply the right reasoning mode

Use one or more of:

- first-principles reasoning
- causal reasoning
- adversarial reasoning
- deductive reasoning
- inductive reasoning
- comparative or trade-off analysis
- probabilistic reasoning

### Step 6 — Evaluate and rank

When comparing options or hypotheses:

- use explicit criteria
- surface hidden costs
- distinguish reversible vs irreversible decisions
- distinguish local optimization vs system impact

### Step 7 — Form a judgment

- state the conclusion directly
- say what is known vs inferred
- say what could change the conclusion
- tie the recommendation back to the project's actual constraints

---

## Output Contract

Your output should include:

1. summary
2. analysis by area or component
3. key findings ordered by importance
4. recommendation or decision guidance
5. risks and open questions
6. confidence and evidence limitations when relevant

---

## Quality Checks

- No claim without evidence or clearly marked assumption
- No false precision when evidence is weak
- No generic advice detached from project constraints
- No vague recommendation without an actionable next step
- No hidden stack assumptions that were not confirmed from project docs

---

## Anti-Patterns

- Listing facts without evaluating them
- Jumping to the first plausible conclusion
- Treating all options as equally valid when evidence favors one
- Recommending a rewrite when an incremental fix would solve the problem
- Ignoring the project stage, roadmap, or non-goals in `project.md` and `status.md`

---

## Natural Prompt Shapes

- "Why is this failing, and what do you think is the real cause?"
- "Analyze this decision and tell me whether it still makes sense."
- "What are the trade-offs and risks of these two options?"
- "Check whether these requirements or assumptions still hold up."

---

## Example Requests

- "Analyze this module boundary for coupling risk"
- "Analyze why this workflow fails intermittently"
- "Analyze option A vs option B for this integration"
- "Analyze whether this feature belongs in MVP"
