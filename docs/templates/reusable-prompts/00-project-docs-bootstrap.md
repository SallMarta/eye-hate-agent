# Project Docs Bootstrap Reusable Prompt

Generate the **initial project documentation set** for a repository. 
You must dynamically adjust your behavior based on the current state of the repository.

## Step 0: Pre-Flight Check

Before analyzing complexity, scan the repository for existing documentation:

1. Check for `docs/project-docs/` with any content.
2. Check for `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` folders with content.
3. Check for any `docs/` folder containing structured markdown beyond a bare root README.

**If ANY of the above exist:**
STOP. Do not proceed with bootstrap. Inform the user:

"I found existing documentation in this repository:
- [list what was found]

Bootstrap is for repos with no documentation. For repos with existing docs (even legacy or non-SDD format), use the **Refresh** workflow instead — it can migrate, update, and create SDD docs from your existing content combined with codebase analysis.

Should I switch to the Refresh workflow?"

**If NONE exist (only code and/or a bare root README):** Proceed to Step 0.5.

## Step 0.5: Greenfield Detection

After passing the Pre-Flight Check, classify the repository:

**Greenfield (Empty/Near-Empty Repo):**
If the repository has no meaningful source files (only a bare `package.json`, `.gitignore`, or scaffolding from a project generator with no custom code), this is a greenfield project.

STOP. Inform the user:

"This repository appears to be a new/greenfield project with no meaningful codebase yet.

Bootstrap works best when there's code to analyze for complexity detection.
For a brand-new project, I recommend running `/eha-discuss` first to:
- Define your project vision, tech stack, and architecture
- Plan your development phases
- Draft initial specs

After that, come back to Bootstrap with the discuss output to generate your docs.

Alternatively, if you already know your project's scope, tell me about it and I'll bootstrap directly."

**If the user provides project context directly:** Proceed to Step 1 using the user's description instead of codebase analysis for complexity detection.

**Brownfield with code (normal case):** Proceed to Step 1.

## Step 1: Complexity Detection (The Adaptive Taxonomy)
Analyze the workspace to determine its complexity by inspecting the codebase. 

Based on the repository's complexity, you MUST recommend one of the following **Taxonomy Tiers**:

1. **Tier 1: Lite Profile** 
   - *Target:* Small scripts, micro-libraries, single-component repos.
   - *Files Generated:* `index.md`, `getting-started.md`, `foundation/prd.md`, `foundation/architecture.md`, `foundation/status.md`.
2. **Tier 2: Standard Profile**
   - *Target:* Typical web applications, APIs, standard services.
   - *Files Generated:* Everything in Tier 1 PLUS `development/testing.md`, `development/database.md`, `development/ui-ux.md`, `development/api-contract.md`, `operations/ci-cd.md`.
3. **Tier 3: Enterprise Profile**
   - *Target:* Large-scale platforms, regulated systems, monorepos.
   - *Files Generated:* Everything in Tier 2 PLUS `operations/governance.md`, `operations/security-compliance.md` (merged), `operations/observability-error-handling.md` (merged), `operations/production-runbook.md`, `development/internationalization.md`.

*Note: `foundation/phases/` (phases folder) and `foundation/changelog.md` (changelog) are offered independently via Step 2.5, not tied to any tier.*

**STOP AND ASK:** Present your analysis of the repo's complexity and ask the user: *"Which Taxonomy Tier should I generate?"* Do not proceed until the user approves a tier.

## Step 2: Document Generation
Once the user approves a tier, strictly follow the 4-layer file structure (`foundation/`, `operations/`, `development/`, `technical-guidelines/`).

### Required Behavior
1. **Dynamic Generation from Registry:** You MUST read the master registry file `docs/templates/project-docs-template/index.md` to obtain the universal stable headings schema and the unique domain-specific headings for each document type within the approved tier. Generate each document dynamically using this structural mapping.
2. Create project-specific truth in `docs/project-docs/`, not in the reusable prompt output itself.
3. Do not invent details. Mark uncertain facts as `TBD` or `Assumption`.
4. If reverse-engineering from code, explicitly state "Inferred from codebase" in the generated document until the user confirms it.
5. **DO NOT generate files outside the approved tier unless explicitly chosen during the Step 2.5 conditional interview.**

## Step 2.5: Active Development, Phases, & Changelog Interview
After generating the tier-selected documents, assess whether the project needs phase-based planning or changelog tracking:

### For Greenfield Projects:
The project is obviously in active development. Ask the user:
"This is a new project. Would you like to set up development phases?
If yes, describe the phases you envision from start to launch.
Example: Phase 1: Research, Phase 2: API Development, Phase 3: UI/UX, Phase 4: Launch."

If the user provides phases:
- Create `foundation/phases/index.md` with the phase registry.
- Create individual phase files using greenfield naming: `phase-{N}[-description].md` (e.g., `phase-1-research.md`, `phase-2-api.md`).
- Populate each with the user's described scope and `TBD` for details not yet known.

If the user declines: Skip phases entirely.

Additionally, ask the user:
"Would you like to set up a changelog (`foundation/changelog.md`) to track historical releases?"
If yes, generate a boilerplate `foundation/changelog.md` with an initial unreleased section.

### For Brownfield Projects (with existing code):
Analyze the codebase for active development signals:
- Recent commits, open branches, TODO comments.
- Sprint-style branch names (`sprint-*`, `release-*`, `feat/*`).
- Issue tracker references in commits or code.
- CI/CD pipeline activity.

If active development signals are found, ask the user:
"This project appears to be in active development. Would you like to set up phase-based planning to track your development cycles?
If yes, describe the current and upcoming phases (or I can infer from your codebase)."

If the user provides phases:
- Create `foundation/phases/index.md` with the phase registry.
- Create individual phase files using brownfield naming: `phase-P{N}[-description].md` (e.g., `phase-P1-refactor.md`, `phase-P2-auth.md`).

If the user declines or no active development signals: Skip phases entirely.

Additionally, check for release signals (e.g., git tags, version updates in `package.json`, release branches). If found, ask the user:
"Would you like to set up a changelog (`foundation/changelog.md`) to track historical releases?"
If yes, generate `foundation/changelog.md` populated with current version information.

## Final Pass
Before finishing, check that:
1. No files are generated in the root of `project-docs/` except `index.md` and `getting-started.md`. Everything else must be in its respective subfolder.
2. `foundation/architecture.md` and `development/testing.md` do not conflict.
3. The generated documents strictly match the approved Taxonomy Tier, conditional choices, and structural definitions cataloged in the master registry.
4. If phases were generated, verify `foundation/phases/index.md` correctly registry-links to all individual phase files (`phase-*.md`), and each phase file has complete stable headings.

## Inputs
Use the project brief, codebase, and constraints provided below to begin your analysis.
