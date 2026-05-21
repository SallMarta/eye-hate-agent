# Eye Hate Agent (EHA)

## Documentation repository for AI-agent-assisted project work

Authored by SuLyAdEe.

---

## Table of Contents

- [Eye Hate Agent](#eye-hate-agent)
  - [Table of Contents](#table-of-contents)
  - [Purpose](#purpose)
  - [How to Adopt](#how-to-adopt)
    - [Step 1 — Choose The Topology](#step-1--choose-the-topology)
      - [Scenario 1 — Distributed Self-Contained Repos](#scenario-1--distributed-self-contained-repos)
      - [Scenario 2 — Shared Template Repo, Local Project Docs](#scenario-2--shared-template-repo-local-project-docs)
      - [Scenario 3 — Centralized Portfolio-Doc Repo](#scenario-3--centralized-portfolio-doc-repo)
    - [Step 2 — Choose The Project Category](#step-2--choose-the-project-category)
    - [Step 3 — Run The Relevant Starter Reusable Prompt](#step-3--run-the-relevant-starter-reusable-prompt)
  - [Key Paths](#key-paths)
  - [Core Docs vs Guidelines](#core-docs-vs-guidelines)
  - [Legend](#legend)
    - [Core Terms](#core-terms)
    - [Additional Terms](#additional-terms)

## Purpose

Designed to give multiple agents a shared contract, shared rules, and shared planning/doc workflows across app types, while the actual app code lives in your target repo.

It provides generic agent rules, reusable skills and prompts, and a project-doc contract.

This repository is documentation template-only, not a sample application with actual code.

> Note: The template supports multiple topologies and project categories, but the best practices and reusable prompts may differ based on your choice. You can customize everything in this template to fit your needs.

1. Use this README first as main guide.
2. Use `docs/eyehateagent-contract.md` for the main rules and decision order.
3. Use `docs/eyehateagent-maintenance.md` only when changing this `eye-hate-agent` repository.

## How to Adopt

Follow this order:

1. [Choose the desirable topology](#step-1--choose-the-topology)
2. [Choose the target project category](#step-2--choose-the-project-category)
3. [Execute the relevant reusable prompt](#step-3--run-the-relevant-starter-reusable-prompt)

### Step 1 — Choose The Topology

| Topology | Use when | Status |
| --- | --- | --- |
| Scenario 1. Distributed self-contained repos | each repo should carry its own contract, rule surfaces, and reusable assets | Supported default |
| Scenario 2. Shared template repo, local project docs | one shared `eye-hate-agent` repo should serve many repos, while each repo keeps its own main project docs | Supported alternative |
| Scenario 3. Centralized portfolio-doc repo | one shared repo should own multiple repos' project docs | Outside this contract |

> **Note on Agent Platforms:** When copying this repository, you can choose one of `.agents`, `.claude`, or `.github` as desired instead of keeping all three. Typically `.agents` is for Gemini, `.claude` is for Claude, and `.github` is for GitHub Copilot.

### Scenario 1 — Distributed Self-Contained Repos (Recommended)

**Pros:**
- **Autonomy:** The AI agent has everything it needs locally. It doesn't rely on cross-workspace permissions to read instructions.
- **Customizability:** Modify contracts, skills, or prompts safely per project.
- **Portability:** Agent rules travel seamlessly with the repository.

**Cons:**
- **Maintenance:** When `eye-hate-agent` template gets an update, you must manually sync updates to every target repositories.
- **Drift:** Independent rule tweaks make all target repositories harder to manage over time.

```text
target-repo/
├── .agents/
│   └── rules/
├── .github/
│   └── instructions/
├── .claude/
│   └── rules/
└── docs/
    ├── eyehateagent-contract.md
    ├── project-docs/
    └── vibes/
        ├── reusable-prompts/
        └── skills/
```

Keep in the target repo:

- `docs/eyehateagent-contract.md`
- `.agents/rules/`
- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Remove `docs/eyehateagent-maintenance.md` after setup unless the target is also a template repo.

### Scenario 2 — Shared Template Repo, Local Project Docs (Alternative)

**Pros:**
- **Single Source of Truth:** Centralized rules and skills instantly update all local projects.
- **Clean Target Repositories:** Target repositories only hold project docs, not agent-related docs.

**Cons:**
- **Dependency:** AI agents require simultaneous read access to the shared `eye-hate-agent` repository. If an agent platform restricts access to outside folders, the agent goes blind.
- **Rigidity:** Overriding or customizing a shared rule for one target repository may affect all other target repositories. For example, if a target repository needs a unique rule, you can't easily alter the shared rule without affecting other target repositories.

```text
workspace/
├── eye-hate-agent/
│   ├── .agents/
│   │   └── rules/
│   ├── .github/
│   │   └── instructions/
│   ├── .claude/
│   │   └── rules/
│   └── docs/
│       ├── eyehateagent-contract.md
│       ├── eyehateagent-maintenance.md
│       └── vibes/
│           ├── reusable-prompts/
│           └── skills/
└── target-repo/
    └── docs/
        ├── eyehateagent-contract.md
        └── project-docs/
```

Keep in the target repo:

- `docs/eyehateagent-contract.md`
- `docs/project-docs/`

Keep in the shared `eye-hate-agent` repo:

- `.agents/rules/`
- `.github/instructions/`
- `.claude/rules/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Keep the shared `eye-hate-agent` repo available in the same workspace or other agent-visible context.
Use local rule mirrors only when an agent platform requires repo-local instruction loading.

### Scenario 3 — Centralized Portfolio-Doc Repo (Not Recommended)

**Pros:**
- **Absolute Centralization:** All project docs, rules, and skills exist in exactly one repository.
- **Cross-Project Visibility:** Easy to enforce portfolio-wide standards and view all project states simultaneously.
- **Strict Target Isolation:** Target repos hold zero documentation, making it ideal if organizational restrictions forbid placing meta-artifacts inside the codebase.

**Cons:**
- **Contract Violation:** Breaks this template's core assumption that a target repository owns its own docs.
- **Context Bloat:** Agents must parse through docs for unrelated projects, risking confusion or context limit errors.
- **Extreme Dependency:** If the central repo breaks or loses access, all target projects lose agent context.

```text
workspace/
├── eye-hate-agent/
│   ├── .agents/
│   │   └── rules/
│   ├── .github/
│   │   └── instructions/
│   ├── .claude/
│   │   └── rules/
│   └── docs/
│       ├── eyehateagent-contract.md
│       ├── eyehateagent-maintenance.md
│       ├── vibes/
│       │   ├── reusable-prompts/
│       │   └── skills/
│       ├── project-docs-target-repo-a/
│       └── project-docs-target-repo-b/
├── target-repo-a/
└── target-repo-b/
```

This scenario is possible, but outside this contract.
Use it only if you intentionally redesign ownership so one repo owns multiple repos' project docs.

### Step 2 — Choose The Project Category

| Project category | Scenario 1 | Scenario 2 |
| --- | --- | --- |
| New project | copy the local template surfaces, create the first project docs, then run bootstrap | keep the local contract plus project docs, keep reusable assets shared, then run bootstrap from the shared repo |
| Running project | keep the existing project docs and run refresh | keep the existing project docs and run refresh from the shared repo |
| Mature or unclear project | run parity first, then refresh | run parity from the shared repo against the local project docs, then refresh |

Scenario 3 has no standard project-category flow because it is outside this contract.

Always keep these required project docs in the target repo:

- `project.md`
- `architecture.md`
- `testing.md`
- `status.md`
- `quick-reference.md`

Recommended next docs for most target repos:

- `changelog.md`
- `getting-started.md`

Optional docs when they add durable value:

- `prd.md`
- `production-runbook.md`

When optional or conditional regular docs are active in a target repo, declare them in `docs/project-docs/index.md`.
When guideline docs are active in a target repo, declare them in `docs/project-docs/guidelines/index.md`.

Recommended technical-guidance layer for a fully documented repo when those domains are relevant:

- `guidelines/index.md`
- guideline docs listed as active in that registry, such as `guidelines/api.md`, `guidelines/database.md`, and `guidelines/code-style.md`

### Step 3 — Run The Relevant Starter Reusable Prompt

| Better for | Start with | Repository state |
| --- | --- | --- |
| New project | `00-project-docs-bootstrap.md` | empty or nearly empty repo with only a brief |
| Running project | `00-project-docs-refresh.md` | existing repo where project docs already exist but are outdated |
| Running or mature with no docs | `00-project-docs-bootstrap.md` | existing codebase but no documentation; agent inspects code, comments, configs, tests, and structure as primary input |
| Mature with unclear docs | `00-project-docs-parity.md` | existing repo with contradictions, stale summaries, or unclear doc responsibilities |
| Mature with strong docs | `00-project-docs-parity.md`, then `00-project-docs-refresh.md` | mature repo with a strong pre-existing documentation system |

> **When to run parity first:** docs conflict, summaries look stale, doc ownership is unclear, legacy docs need promotion into `guidelines/` or `phases/`, or the current code disagrees with the docs. Classify legacy artifacts by governed concern, not by legacy name. If parity finds a code-vs-doc conflict with no explicit authority order, have the agent ask before assuming. Run refresh only after parity resolves ownership.

After choosing a prompt, keep these rules in mind:

- **Legacy docs exist:** move them into `docs-legacy/` or similar, then run parity followed by refresh. Classify legacy names (`epic`, `roadmap`, `protocol`, `standard`, etc.) by content and state the intended active owner explicitly.
- **No docs exist:** run bootstrap and let the agent mine the codebase for domain knowledge, including custom sections beyond template headings.
- **Active docs go in** `docs/project-docs/`. Legacy folders stay for history and lookup only.
- **Valuable knowledge** from legacy docs or code that doesn't fit standard template headings should be preserved as custom sections or new files. The agent should ask if placement is ambiguous.

**Example:** repo has `README.md` setup notes plus older architecture and testing docs → move old docs into `docs-legacy/`, run parity to map them to `getting-started.md`, `architecture.md`, and `testing.md`, then run refresh to merge the still-valid parts.

**Example prompts:**

- `Read docs/eyehateagent-contract.md, inspect docs-legacy/ as reference input, classify legacy docs by content, and execute 00-project-docs-refresh.md. Promote legacy guideline or phase material into docs/project-docs/guidelines/ and docs/project-docs/phases/.`
- `Read docs/eyehateagent-contract.md, execute 00-project-docs-parity.md against docs-legacy/, docs/project-docs/, and relevant code. If code and docs conflict, ask before assuming. Then execute 00-project-docs-refresh.md using that ownership map.`

If more template prompts are added later, start here unless another prompt is clearly a better fit.

Template extension follows a different path:

- add known optional regular doc types in `docs/vibes/project-docs-template/index.md`
- add known guideline types in `docs/vibes/project-docs-template/guidelines/index.md`
- add or update a starter template file only when a reusable scaffold would still provide durable value

## Key Paths

| Area | Path | Role |
| --- | --- | --- |
| README | `README.md` | main human guide and adoption entry point |
| Contract | `docs/eyehateagent-contract.md` | main template rules, doc responsibilities, decision order, and adoption rules |
| Maintenance | `docs/eyehateagent-maintenance.md` | template-repo-only maintenance workflow |
| Project docs | `docs/project-docs/` | main project-specific docs |
| Guideline docs | `docs/project-docs/guidelines/` | technical guidance docs for the target repo |
| Optional-doc index | `docs/project-docs/index.md` | main index file for active optional and conditional regular docs |
| Guideline index | `docs/project-docs/guidelines/index.md` | main index file for active guideline docs |
| Reusable prompts | `docs/vibes/reusable-prompts/` | bootstrap, refresh, and parity workflows |
| Skills | `docs/vibes/skills/` | reusable procedures for analysis, testing, auditing, and design |
| Starter templates | `docs/vibes/project-docs-template/` | reusable starter scaffolds for docs and guidelines |

For template extension, add known optional regular doc types in `docs/vibes/project-docs-template/index.md` and known guideline types in `docs/vibes/project-docs-template/guidelines/index.md`.
If a new regular doc type needs brand-new standard headings, update `docs/eyehateagent-contract.md` first.

## Core Docs vs Guidelines

Use the regular docs under `docs/project-docs/` for the general picture of the repository or project, such as scope, architecture, tech stack, business process, testing, and roadmap.

Use `docs/project-docs/guidelines/` for technical specs and rules, such as API, database, UI, logging, or code style.

A target repo is fully documented when it has both: the general project docs plus the technical guidelines it actually needs.

## Legend

### Core Terms

- `contract`: the main rules file for this template, especially `docs/eyehateagent-contract.md`
- `owner doc`: the main doc that should hold the real information for one topic
- `active truth`: the docs agents should trust first as the current source of truth, usually `docs/project-docs/`
- `reusable prompt`: a reusable workflow file under `docs/vibes/reusable-prompts/`, such as bootstrap, refresh, or parity
- `skill`: a reusable expert procedure under `docs/vibes/skills/`
- `registry`: an index file that lists active optional docs or guidelines, such as `docs/project-docs/index.md`
- `topology` or `scenario`: the layout you choose for where template assets and project docs live
- `docs-legacy` or `reference input`: old docs kept only for migration or reference, not as the active source of truth

### Additional Terms

- `stable heading`: a standard heading pattern that prompts and agents are expected to rely on
- `platform instruction surfaces (mirrored rule files)`: matching rule files under `.agents/rules/`, `.github/instructions/`, and `.claude/rules/` that enforce Contract Essentials
- `guideline`: a technical guidance doc under `docs/project-docs/guidelines/`
- `project category`: whether the target repo is a new project, a running project, or a mature or unclear project
- `optional` or `conditional doc`: a non-core doc that exists only when the project needs it
- `starter template`: a reusable scaffold or example under `docs/vibes/project-docs-template/`
