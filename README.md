# Eye Hate Agent

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

### Scenario 1 — Distributed Self-Contained Repos

```text
target-repo/
├── .github/instructions/
├── .claude/rules/
└── docs/
    ├── eyehateagent-contract.md
    ├── project-docs/
    └── vibes/
        ├── reusable-prompts/
        └── skills/
```

Keep in the target repo:

- `docs/eyehateagent-contract.md`
- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Remove `docs/eyehateagent-maintenance.md` after setup unless the target is also a template repo.

### Scenario 2 — Shared Template Repo, Local Project Docs

```text
workspace/
├── eye-hate-agent/
│   ├── .github/instructions/
│   ├── .claude/rules/
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

- `.github/instructions/`
- `.claude/rules/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Keep the shared `eye-hate-agent` repo available in the same workspace or other agent-visible context.
Use local rule mirrors only when an agent platform requires repo-local instruction loading.

### Scenario 3 — Centralized Portfolio-Doc Repo

```text
workspace/
├── eye-hate-agent/
│   ├── .github/instructions/
│   ├── .claude/rules/
│   └── docs/
│       ├── eyehateagent-contract.md
│       ├── eyehateagent-maintenance.md
│       └── vibes/
│           ├── reusable-prompts/
│           └── skills/
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
| Mature or unclear project | run consistency audit first, then refresh | run consistency audit from the shared repo against the local project docs, then refresh |

Scenario 3 has no standard project-category flow because it is outside this contract.

Always keep these required project docs in the target repo:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

Recommended next docs for most target repos:

- `CHANGELOG.md`
- `GETTING_STARTED.md`

Optional docs when they add durable value:

- `PRD.md`
- `PRODUCTION_RUNBOOK.md`

When optional or conditional regular docs are active in a target repo, declare them in `docs/project-docs/INDEX.md`.
When guideline docs are active in a target repo, declare them in `docs/project-docs/guidelines/INDEX.md`.

Recommended technical-guidance layer for a fully documented repo when those domains are relevant:

- `guidelines/INDEX.md`
- guideline docs listed as active in that registry, such as `guidelines/api.md`, `guidelines/database.md`, and `guidelines/code-style.md`

### Step 3 — Run The Relevant Starter Reusable Prompt

| Better for | Start with | Repository state |
| --- | --- | --- |
| New project | `00-project-docs-bootstrap.md` | empty or nearly empty repo with only a brief |
| Running project | `00-project-docs-refresh.md` | existing repo where project docs already exist but are outdated |
| Mature with unclear docs | `00-project-docs-consistency-audit.md` | existing repo with contradictions, stale summaries, or unclear doc responsibilities |
| Mature with strong docs | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | mature repo with a strong pre-existing documentation system |

Use `00-project-docs-consistency-audit.md` first when it is unclear which doc should cover each topic, docs conflict, summaries look stale, or legacy docs contain structured material that may need promotion into active `guidelines/` or `phases/` folders. The benchmark is the content and governed concern of each legacy artifact, not whether its legacy name already matches template terminology. Continue to `00-project-docs-refresh.md` only after the audit shows the right main doc for each topic.

After you choose the starting prompt, follow this tutorial:

1. If this is a new repo, run `00-project-docs-bootstrap.md` to create the first project docs in `docs/project-docs/`.
2. If project docs already exist and mostly make sense, run `00-project-docs-refresh.md` to update them.
3. If legacy docs contain technical-guidance domains, epic or phase tracking, or other optional-doc structures that should stay active under `docs/project-docs/`, classify them by content and ownership first. Legacy names such as `epic`, `roadmap`, `protocol`, `procedure`, or `standard` are only hints; say the intended active owner explicitly in the prompt and have refresh promote them into the active owner-doc set.
4. If docs conflict, summaries look stale, or it is unclear which doc should cover each topic, run `00-project-docs-consistency-audit.md` first. Run refresh only after the audit shows the right main doc for each topic.
5. If the repo already uses another documentation format, move the old docs you still want to keep into `docs-legacy/`, `docs-old/`, or another clearly named reference folder, then run consistency audit first and refresh second.
6. Keep active project docs in `docs/project-docs/`. Keep `docs-legacy/`, `docs-old/`, or similar folders only for history and lookup.

Example: if the repo already has `README.md` setup notes plus older architecture and testing docs, move those old docs into `docs-legacy/`, run consistency audit to map them to `GETTING_STARTED.md`, `ARCHITECTURE.md`, and `TESTING.md`, then run refresh to merge the still-valid parts.

Example prompts:

- `Read docs/eyehateagent-contract.md, inspect docs-old/ and docs-legacy/ as reference input, and classify legacy docs by their content rather than by legacy filenames. Then execute 00-project-docs-refresh.md. If legacy docs such as protocol, procedure, standard, epic, or roadmap material map to active guideline or phase owners, promote them into docs/project-docs/guidelines/ and docs/project-docs/phases/ instead of leaving them only in legacy folders.`
- `Read docs/eyehateagent-contract.md, then execute 00-project-docs-consistency-audit.md against docs-old/ and docs/project-docs/. Identify any legacy guideline or phase docs that should become active owner docs. After that, execute 00-project-docs-refresh.md using that ownership map.`

If more template prompts are added later, start here unless another prompt is clearly a better fit.

Template extension follows a different path:

- add known optional regular doc types in `docs/vibes/project-docs-template/INDEX.md`
- add known guideline types in `docs/vibes/project-docs-template/guidelines/INDEX.md`
- add or update a starter template file only when a reusable scaffold would still provide durable value

## Key Paths

| Area | Path | Role |
| --- | --- | --- |
| README | `README.md` | main human guide and adoption entry point |
| Contract | `docs/eyehateagent-contract.md` | main template rules, doc responsibilities, decision order, and adoption rules |
| Maintenance | `docs/eyehateagent-maintenance.md` | template-repo-only maintenance workflow |
| Project docs | `docs/project-docs/` | main project-specific docs |
| Guideline docs | `docs/project-docs/guidelines/` | technical guidance docs for the target repo |
| Optional-doc index | `docs/project-docs/INDEX.md` | main index file for active optional and conditional regular docs |
| Guideline index | `docs/project-docs/guidelines/INDEX.md` | main index file for active guideline docs |
| Reusable prompts | `docs/vibes/reusable-prompts/` | bootstrap, refresh, and consistency-audit workflows |
| Skills | `docs/vibes/skills/` | reusable procedures for analysis, testing, auditing, and design |
| Starter templates | `docs/vibes/project-docs-template/` | reusable starter scaffolds for docs and guidelines |

For template extension, add known optional regular doc types in `docs/vibes/project-docs-template/INDEX.md` and known guideline types in `docs/vibes/project-docs-template/guidelines/INDEX.md`.
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
- `reusable prompt`: a reusable workflow file under `docs/vibes/reusable-prompts/`, such as bootstrap, refresh, or consistency-audit
- `skill`: a reusable expert procedure under `docs/vibes/skills/`
- `registry`: an index file that lists active optional docs or guidelines, such as `docs/project-docs/INDEX.md`
- `topology` or `scenario`: the layout you choose for where template assets and project docs live
- `docs-legacy` or `reference input`: old docs kept only for migration or reference, not as the active source of truth

### Additional Terms

- `stable heading`: a standard heading pattern that prompts and agents are expected to rely on
- `mirrored rule files`: matching rule files under `.github/instructions/` and `.claude/rules/` that point back to the same contract
- `guideline`: a technical guidance doc under `docs/project-docs/guidelines/`
- `project category`: whether the target repo is a new project, a running project, or a mature or unclear project
- `optional` or `conditional doc`: a non-core doc that exists only when the project needs it
- `starter template`: a reusable scaffold or example under `docs/vibes/project-docs-template/`
