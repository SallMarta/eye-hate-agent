# Eye Hate Agent (EHA)

A simple **Spec-Driven Development (SDD)**. Unified set of rules, specialist skills, and dynamic project documentation workflows, standardizing how AI coding agents receive instructions to make collaborative development completely predictable and highly efficient.

---

## Get Started

### 1. Initialize EHA in your project
Run directly in **your project/repo root**:
```bash
$ npx @sallmarta/eye-hate-agent
```
*Or install **globally** and run it:*
```bash
$ npm i -g @sallmarta/eye-hate-agent
$ cd your-project
$ eha
```

### 2. Trigger your agent
Once projected, EHA files are immediately active in your IDE. Trigger the workflows using your agent's native slash commands, file mentions, or prompt attachments (read more on [EHA Commands](#eha-commands)).

### 3. Commit the contract
The projected files (`.claude/`, `.github/`, or `.agents/`) act as your project's AI contract.

---

## EHA Commands

Once initialized, EHA projects a series of interactive workflows directly into your agent's configuration directory (e.g., `.agents/` or `.github/`). You can trigger these workflows inside your IDE chat using slash commands, file mentions, or prompt attachments:

| Slash Trigger | Primary Purpose |
| :--- | :--- |
| **`/eha-bootstrap`** | Initializes the SDD document set for repos with **no existing documentation**. Scans codebase complexity, asks for a Taxonomy Tier (Lite/Standard/Enterprise), generates the tailored doc set. Stops and redirects to Refresh if existing docs or legacy docs are detected. |
| **`/eha-refresh`** | The main workhorse for repos with **any existing documentation**. Updates active SDD docs, migrates legacy docs, converts non-SDD docs, and creates missing SDD files — all by cross-referencing the actual codebase alongside existing material. Auto-detects the appropriate Taxonomy Tier for migration scenarios. Prompts the user to resolve any drift between codebase and docs. |
| **`/sdd-discuss`** | Collaborative brainstorming. Interviews you about edge cases, API shapes, data models, and constraints, then drafts spec snippets ready for injection into project docs. No code output. |
| **`/sdd-execute`** | Spec-Driven code generation via strict TDD. Reads specs → generates tests → generates code → validates against architecture. Refuses to code features not in the spec. |
| **`/eha-help`** | **EHA Help & Tutorial.** Interactive guide providing descriptions of EHA's 4-layer taxonomy, active workflows, and specialist skills. |

> **Looking for parity audits?** Use the `parity-audit` skill directly:
> `@agent use parity-audit on this repository`
> This provides a full drift analysis without needing a dedicated command.

---

## Greenfield vs. Brownfield Workflows

EHA adapts its behavior automatically based on your repository's state:

### Greenfield Projects
**Start with Discussion:** run
```bash
/sdd-discuss
```
to brainstorm the tech stack and project specifications, then run 
```bash
/eha-bootstrap
```
once the discussion is mature.

**Bootstrap Redirect:** If you run `/eha-bootstrap` in a brand-new empty repository, the agent will automatically redirect you to `/sdd-discuss` first.

### Brownfield Projects
**No Project Docs Yet:** Run 
```bash
/eha-bootstrap
```
to scan your codebase complexity and generate an appropriate Taxonomy Tier (Lite, Standard, or Enterprise).

**Already Has Project Docs:** Run 
```bash
/eha-refresh
```
to sync docs with code, migrate legacy folders, and resolve codebase-vs-doc drift with user guidance.

---

## EHA CLI Command

The EHA CLI provides a lightweight, frictionless setup and maintenance toolbelt:

| Command | Primary Purpose |
| :--- | :--- |
| `eha init` | Lets you choose your target AI agent, and projects standard rules/skills. |
| `eha init <agent>` | Directly initiates the EHA project setup for a specific agent (e.g. `copilot`, `claude`, `antigravity`).  |
| `eha doctor` | Performs a health check verifying that all generated files are present and intact. |
| `eha remove [agent]` | Safely deletes EHA's generated contract files for the specified agent (or all agents if omitted), along with configuration files. |

---

## Updating

When a new version of EHA is released, simply run: 
```bash
$ eha
```
in your repository. The engine will detect the version mismatch automatically, prompt you to regenerate the files **(if needed)**, and update them to the latest standards seamlessly.

---

## Uninstallation

To completely remove EHA from your project and device:

### 1. Remove project files
To clean up projected AI files, run the following command in your project root. You can optionally specify a target agent (e.g. `claude`, `copilot`, `antigravity`) to remove only that agent's files while preserving other active installations:
```bash
$ eha remove [agent]
```

### 2. Uninstall the CLI globally
To completely remove the CLI from your device, run:
```bash
$ npm uninstall -g @sallmarta/eye-hate-agent
```

---

## EHA Philosophy

Eye Hate Agent is built upon a core set of operational beliefs designed to optimize the synergy between human developers and AI coding agents:

1. **Readability First (Dual-Audience Design)**: Every registry, template, and workspace document generated by EHA strictly adheres to standard markdown structures, numbered stable headings, and clean tables. This ensures maximum readability for humans while granting AI agents 100% syntactic parsing clarity (completely eliminating context loss).
2. **Flexible, Non-Deterministic Context**: EHA documents define clear constraints, design parameters, and business logic (specific) but avoid locking implementation down into rigid boilerplate (generic and non-deterministic). This allows both developers and agents to exercise active engineering judgment and choose the best implementation pathways.
3. **Zero Agent Hallucination**: By anchoring AI agents to EHA's Single Master Registry catalog (`index.md`) and a strict 4-layer folder structure, EHA eliminates path hallucination, stale references, and prompt redundancy. Agents always know exactly where to read and write.
4. **Brainstorming & Discussion are Sacred**: Specifications are never written in isolation. EHA integrates a dedicated discuss loop (`02-sdd-discuss.md`), establishing collaborative brainstorming as the mandatory first step to align human intent with agent understanding before any code is generated.
5. **Native Agile & Scrum Alignment**: EHA is built for real-world software delivery. With structured sprint and epic trackers (`foundation/phases/`, `foundation/status.md`), EHA fits seamlessly into standard corporate Agile/Scrum lifecycles, enabling agents to act as high-velocity scrum contributors.

----------
$$
SuLyAdeE
$$
----------

