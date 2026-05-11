# Project Docs Bootstrap Reusable Prompt

Read `TEMPLATE_CONTRACT.md` first.

Generate the **initial project documentation set** for a new repository using the project brief and constraints provided below.

## Goal

Create the smallest complete set of project docs that lets rules and skills operate without embedding project-specific assumptions.

This reusable prompt assumes you are starting from a project brief or equivalent starting facts. If the repository already has meaningful code, docs, or contradictory summaries, use those as inputs and consider whether refresh or consistency audit should run first.

## Required Behavior

1. Follow the required and recommended files defined in `TEMPLATE_CONTRACT.md`.
2. Create project-specific truth in `docs/project-docs/`, not in the reusable prompt output itself.
3. Use stable headings wherever the contract defines them.
4. Mark uncertain facts as `TBD`, `Assumption`, or `Open Question` instead of inventing details.
5. Create optional docs only when the project genuinely needs them.
6. Keep the docs mutually consistent.

## Output Contract

### Minimum Outputs

Create or refresh these files unless the brief clearly makes one inapplicable:

- `docs/project-docs/PROJECT.md`
- `docs/project-docs/ARCHITECTURE.md`
- `docs/project-docs/TESTING.md`
- `docs/project-docs/STATUS.md`
- `docs/project-docs/QUICK_REFERENCE.md`

Recommended when useful:

- `docs/project-docs/CHANGELOG.md`
- `docs/project-docs/GETTING_STARTED.md`
- `docs/project-docs/FEATURE_INVENTORY.md`
- `docs/project-docs/PRD.md`
- `docs/project-docs/PRODUCTION_RUNBOOK.md`
- `docs/project-docs/phases/INDEX.md`
- `docs/project-docs/guidelines/*`

### File Expectations

### `PROJECT.md`

- summary
- problem
- goals
- non-goals
- stakeholders or personas
- success metrics

### `ARCHITECTURE.md`

- stack overview
- architecture pattern
- dependency rules
- integrations
- data or storage model
- commands or build and run guidance

### `TESTING.md`

- verification policy
- verification matrix
- commands
- test layers or test types
- CI or release gates
- manual-check fallback

### `STATUS.md`

- current state
- roadmap or execution map
- epics, workstreams, or milestones
- dependencies and sequencing where relevant

### `QUICK_REFERENCE.md`

- commands
- important paths
- conventions
- high-signal reminders and troubleshooting notes

### `PRD.md` (if created)

- summary
- requirements scope
- user journeys or key flows
- functional requirements
- non-functional requirements
- acceptance criteria
- open questions or assumptions

### `PRODUCTION_RUNBOOK.md` (if created)

- summary
- environment overview
- prerequisites and access
- release or deployment procedure
- verification or smoke checks
- rollback or recovery
- operational notes or troubleshooting

## Constraints

- Do not hardcode one stack unless the brief requires it.
- Do not duplicate the same rule across multiple docs unnecessarily.
- Prefer concise, operationally useful docs over exhaustive filler.

## Final Pass

Before finishing, check that:

1. rules and skills could read these docs directly without hidden assumptions
2. the testing doc is actionable
3. architecture and testing do not conflict
4. roadmap and scope do not conflict

## Inputs

Use the project brief, constraints, and requirements provided below.

At minimum, the starting input should try to cover:

- repository or project name
- problem statement
- goals
- non-goals
- stakeholders, users, or operators
- known stack preferences or constraints
- known testing, delivery, or compliance constraints
- any open questions that should remain explicit rather than invented
