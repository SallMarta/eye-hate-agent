# Project Docs Bootstrap Reusable Prompt

Read `docs/eyehateagent-contract.md` first.

Generate the **initial project documentation set** for a new repository using the project brief and constraints provided below.

## Goal

Create the smallest complete set of project docs that lets rules and skills operate without embedding project-specific assumptions.

This reusable prompt assumes you are starting from a project brief or equivalent starting facts. If the repository already has meaningful code, docs, or contradictory summaries, use those as inputs and consider whether refresh or consistency audit should run first.
If those older docs are being replaced, move them into a clearly non-owner reference folder such as `docs-legacy/` before using them as migration input.

## Required Behavior

1. Follow the required and recommended files defined in `docs/eyehateagent-contract.md`.
2. Create project-specific truth in `docs/project-docs/`, not in the reusable prompt output itself.
3. Use stable headings wherever the contract defines them.
4. Mark uncertain facts as `TBD`, `Assumption`, or `Open Question` instead of inventing details.
5. Treat `docs/project-docs/index.md` and `docs/project-docs/guidelines/index.md` as the authoritative inventories for optional regular docs and guideline docs when they exist or when you create them during bootstrap.
6. Create optional docs only when the project genuinely needs them or when they are declared as active in one of those registries.
7. If a registry entry exists without a starter template file, scaffold the doc from the contract-defined stable headings and ownership rules.
8. If you create optional regular docs beyond the always-required core set, also create `docs/project-docs/index.md` and keep it aligned with the active optional set.
9. If you create guideline docs, also create `docs/project-docs/guidelines/index.md` and keep it aligned with the active guideline set.
10. When clearly named reference or archive folders such as `docs-legacy/`, `archive/`, or `reference/` exist, treat them as background migration input only and keep active owner docs under `docs/project-docs/`.
11. Keep the docs mutually consistent.

For template maintenance: add new known optional regular doc types to `docs/vibes/project-docs-template/index.md` and new known guideline types to `docs/vibes/project-docs-template/guidelines/index.md`.
Only rely on registry-only scaffolding when the contract already defines the needed stable headings or ownership rules.

## Output Contract

### Minimum Outputs

Create or refresh these files unless the brief clearly makes one inapplicable:

- `docs/project-docs/project.md`
- `docs/project-docs/architecture.md`
- `docs/project-docs/testing.md`
- `docs/project-docs/status.md`
- `docs/project-docs/quick-reference.md`

Create these registry files when their corresponding doc families are active:

- `docs/project-docs/index.md`
- `docs/project-docs/guidelines/index.md`

Recommended when useful or when declared as active in the registries:

- docs listed as active in `docs/project-docs/index.md`, such as `changelog.md`, `getting-started.md`, `feature-inventory.md`, `prd.md`, `production-runbook.md`, or `phases/index.md`
- guideline docs listed as active in `docs/project-docs/guidelines/index.md`, such as `guidelines/api.md`, `guidelines/database.md`, `guidelines/logging.md`, `guidelines/error-handling.md`, `guidelines/json.md`, `guidelines/code-style.md`, or `guidelines/design-patterns.md`

### File Expectations

### `project.md`

- summary
- problem
- goals
- non-goals
- stakeholders or personas
- success metrics

### `architecture.md`

- stack overview
- architecture pattern
- dependency rules
- integrations
- data or storage model
- commands or build and run guidance

### `testing.md`

- verification policy
- verification matrix
- commands
- test layers or test types
- CI or release gates
- manual-check fallback

### `status.md`

- current state
- roadmap or execution map
- epics, workstreams, or milestones
- dependencies and sequencing where relevant

### `quick-reference.md`

- commands
- important paths
- conventions
- high-signal reminders and troubleshooting notes

### `index.md` (if created)

- summary
- core required docs
- optional and conditional docs
- registry rules

### `prd.md` (if created)

- summary
- requirements scope
- user journeys or key flows
- functional requirements
- non-functional requirements
- acceptance criteria
- open questions or assumptions

### `production-runbook.md` (if created)

- summary
- environment overview
- prerequisites and access
- release or deployment procedure
- verification or smoke checks
- rollback or recovery
- operational notes or troubleshooting

### `guidelines/index.md` (if created)

- summary
- when to add a guideline
- active guidelines
- ownership and review

### `guidelines/*.md` (if created)

- summary
- scope
- rules
- preferred or approved patterns
- anti-patterns or avoid
- related docs
- open questions or exceptions

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
5. optional regular docs, if created, are listed in `docs/project-docs/index.md`
6. guideline docs, if created, do not duplicate broad project-doc ownership and are listed in `guidelines/index.md`

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
