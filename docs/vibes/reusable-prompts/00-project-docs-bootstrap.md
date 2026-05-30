# Project Docs Bootstrap Reusable Prompt

Generate the **initial project documentation set** for a repository. 
You must dynamically adjust your behavior based on the current state of the repository.

## State Detection (Universal Document Handler)
Before writing any documents, analyze the workspace to determine its state:
1. **Zero Docs (Fresh Repo):** No existing documentation and no code. You must ask the user questions to build the specifications from scratch.
2. **Unclear Docs (Running Repo):** Code exists but docs are missing or outdated. Analyze the existing codebase (package files, database schemas, api routes) to reverse-engineer `foundation/architecture.md` and `technical/database.md`. Ask the user to fill in the missing product goals.
3. **Mature Docs:** Existing legacy documentation exists but isn't in the EHA format. Map the existing docs into the new 4-layer taxonomy `docs/project-docs/` format without losing historical context.

## Required Behavior
1. Follow the 4-layer file structure defined in the EHA Project Doc Rules above (`foundation/`, `operations/`, `technical/`, `technical-guidelines/`).
2. Create project-specific truth in `docs/project-docs/`, not in the reusable prompt output itself.
3. Do not invent details. Mark uncertain facts as `TBD` or `Assumption`.
4. If reverse-engineering from code, explicitly state "Inferred from codebase" in the generated document until the user confirms it.

## Output Contract (The Massive Document Structure)
Create these files under `docs/project-docs/`. If you lack the context to fill them out, generate the markdown headings and mark the content as TBD.

**Root:**
- `index.md`
- `getting-started.md`

**Foundation:**
- `foundation/prd.md`
- `foundation/architecture.md`
- `foundation/workflow.md`
- `foundation/status.md`
- `foundation/phases.md`
- `foundation/changelog.md`
- `foundation/feature-inventory.md`

**Operations:**
- `operations/ci-cd.md`
- `operations/production-runbook.md`
- `operations/governance.md`
- `operations/compliance.md`
- `operations/observability.md`
- `operations/security.md`

**Technical:**
- `technical/testing.md`
- `technical/api-contract.md`
- `technical/database.md`
- `technical/ui-ux.md`
- `technical/error-handling.md`
- `technical/internationalization.md`

## Final Pass
Before finishing, check that:
1. No files are generated in the root of `project-docs/` except `index.md` and `getting-started.md`. Everything else must be in its respective subfolder.
2. `foundation/architecture.md` and `technical/testing.md` do not conflict.
3. The generated documents strictly follow the Flexible Baselines principle (you may omit heavily specialized docs if the user confirms they aren't needed).

## Inputs
Use the project brief, codebase, and constraints provided below to begin generation.
