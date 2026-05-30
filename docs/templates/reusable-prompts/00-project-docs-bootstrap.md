# Project Docs Bootstrap Reusable Prompt

Generate the **initial project documentation set** for a repository. 
You must dynamically adjust your behavior based on the current state of the repository.

## Step 1: State & Complexity Detection (The Adaptive Taxonomy)
Before writing any documents, analyze the workspace to determine its state (Zero Docs vs. Unclear Docs vs. Mature Docs) and its complexity. 

Based on the repository's complexity, you MUST recommend one of the following **Taxonomy Tiers**:

1. **Tier 1: Lite Profile** 
   - *Target:* Small scripts, micro-libraries, single-component repos.
   - *Files Generated:* `index.md`, `getting-started.md`, `foundation/prd.md`, `foundation/architecture.md`, `foundation/status.md`.
2. **Tier 2: Standard Profile**
   - *Target:* Typical web applications, APIs, standard services.
   - *Files Generated:* Everything in Tier 1 PLUS `technical/testing.md`, `technical/database.md`, `technical/ui-ux.md`, `technical/api-contract.md`, `operations/ci-cd.md`.
3. **Tier 3: Enterprise Profile**
   - *Target:* Large-scale platforms, regulated systems, monorepos.
   - *Files Generated:* The full massive structure (adds `operations/governance.md`, `operations/compliance.md`, `operations/security.md`, `operations/observability.md`, `operations/production-runbook.md`, `technical/error-handling.md`, `technical/internationalization.md`, `foundation/phases.md`, `foundation/changelog.md`, `foundation/feature-inventory.md`).

**STOP AND ASK:** Present your analysis of the repo's complexity and ask the user: *"Which Taxonomy Tier should I generate?"* Do not proceed until the user approves a tier.

## Step 2: Document Generation
Once the user approves a tier, strictly follow the 4-layer file structure (`foundation/`, `operations/`, `technical/`, `technical-guidelines/`).

### Required Behavior
1. Create project-specific truth in `docs/project-docs/`, not in the reusable prompt output itself.
2. Do not invent details. Mark uncertain facts as `TBD` or `Assumption`.
3. If reverse-engineering from code, explicitly state "Inferred from codebase" in the generated document until the user confirms it.
4. **DO NOT generate files outside the approved tier.**

## Final Pass
Before finishing, check that:
1. No files are generated in the root of `project-docs/` except `index.md` and `getting-started.md`. Everything else must be in its respective subfolder.
2. `foundation/architecture.md` and `technical/testing.md` do not conflict.
3. The generated documents strictly match the approved Taxonomy Tier.

## Inputs
Use the project brief, codebase, and constraints provided below to begin your Phase 1 analysis.
