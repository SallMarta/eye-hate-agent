# Eye Hate Agent
### Documentation repository for AI-agent-assisted project work.

###### authored by SuLyAdEe.

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
  - [Main Files](#main-files)
  - [File Index](#file-index)
  - [Core Docs vs Guidelines](#core-docs-vs-guidelines)
  - [Registry-Driven (Project-Doc & Guideline Extension)](#registry-driven-project-doc--guideline-extension)

## Purpose

Designed to give multiple agents a shared contract, shared rules, and shared planning/doc workflows across app types, while the actual app code lives in your target repo.

It provides generic agent rules, reusable skills and prompts, and a project-doc contract.

This repository is documentation template-only, not a sample application with actual code.

> Note: The template supports multiple topologies and project categories, but the best practices and reusable prompts may differ based on your choice. You can customize everything in this template to fit your needs.

1. Use this README first as main guide.
2. Use `docs/eyehateagent-contract.md` for canonical rules and precedence.
3. Use `docs/eyehateagent-maintenance.md` only when changing this `eye-hate-agent` repository.

## How to Adopt

Follow this order:

1. choose the desirable topology
2. choose the target project category
3. run the relevant reusable prompt

### Step 1 — Choose The Topology

| Topology | Use when | Status |
| --- | --- | --- |
| Scenario 1. Distributed self-contained repos | each repo should carry its own contract, rule surfaces, and reusable assets | Supported default |
| Scenario 2. Shared template repo, local project docs | one shared `eye-hate-agent` repo should serve many repos, while each repo keeps local owner docs | Supported alternative |
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
| New project | copy the local template surfaces, create local owner docs, then run bootstrap | keep local contract plus owner docs, keep reusable assets shared, then run bootstrap from the shared repo |
| Running project | keep local owner docs and run refresh | keep local owner docs and run refresh from the shared repo |
| Mature or unclear project | run consistency audit first, then refresh | run consistency audit from the shared repo against local owner docs, then refresh |

Scenario 3 has no standard project-category flow because it is outside this contract.

Always keep these required owner docs in the target repo:

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
- guideline docs listed as active in that registry, such as `guidelines/api.md`, `guidelines/database.md`, `guidelines/logging.md`, `guidelines/error-handling.md`, `guidelines/json.md`, `guidelines/code-style.md`, and `guidelines/design-patterns.md`

### Step 3 — Run The Relevant Starter Reusable Prompt

| Better for | Start with | Repository state |
| --- | --- | --- |
| New project | `00-project-docs-bootstrap.md` | empty or nearly empty repo with only a brief |
| Running project | `00-project-docs-refresh.md` | existing repo where owner docs exist but are outdated |
| Mature with unclear docs | `00-project-docs-consistency-audit.md` | existing repo with contradictions, stale summaries, or unclear ownership |
| Mature with strong docs | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | mature repo with a strong pre-existing documentation system |

Use `00-project-docs-consistency-audit.md` first when ownership is unclear, docs conflict, or summaries look stale. Continue to `00-project-docs-refresh.md` only after the audit makes the owning docs clear enough to update safely.

These are the starter reusable prompts for project-doc adoption:

- bootstrap the first owner docs
- refresh existing owner docs
- audit ownership before refresh when the repo is mature or unclear

If more template prompts are added later, start here unless another prompt is clearly a better fit.

Template extension follows a different path:

- add known optional regular doc types in `docs/vibes/project-docs-template/INDEX.md`
- add known guideline types in `docs/vibes/project-docs-template/guidelines/INDEX.md`
- add or update a starter template file only when a reusable scaffold would still provide durable value

Use this quick guide after choosing the prompt table above:

| Repo state | Run this | Do this first | Main docs location |
| --- | --- | --- | --- |
| New project | `00-project-docs-bootstrap.md` | create the first project docs | `docs/project-docs/` |
| Running project with existing owner docs | `00-project-docs-refresh.md` | update the existing project docs | `docs/project-docs/` |
| Mature repo with unclear or conflicting docs | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | figure out which doc should cover each topic before editing | `docs/project-docs/` |
| Repo with another documentation format | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | move old docs into `docs-legacy/` or another clearly named reference folder | `docs/project-docs/` |

If the repo already has meaningful code, existing docs, or contradictory summaries, prefer audit first and refresh second.

For legacy-doc migration:

1. move the old docs you still want to preserve into `docs-legacy/`
2. run `00-project-docs-consistency-audit.md` to map those files to the correct owner docs
3. run `00-project-docs-refresh.md` to merge the still-valid content into `docs/project-docs/`
4. keep `docs-legacy/` as reference only, not as an active source of truth

Example: move old files such as `docs-legacy/testing-notes.md` and `docs-legacy/architecture-notes.md`, then merge the valid parts into `docs/project-docs/TESTING.md` and `docs/project-docs/ARCHITECTURE.md`.

## Main Files

| File | Main job |
| --- | --- |
| `README.md` | main human guide and adoption entry point |
| `docs/eyehateagent-contract.md` | canonical system rules, ownership, and precedence |
| `docs/eyehateagent-maintenance.md` | template-maintainer workflow for this repo |
| `docs/vibes/project-docs-template/` | optional starter docs scaffold |
| `docs/vibes/project-docs-template/INDEX.md` | starter registry for optional and conditional regular docs |
| `docs/vibes/skills/` | reusable procedures for deeper analysis, test authoring, auditing, and design |
| `docs/vibes/reusable-prompts/00-project-docs-*.md` | reusable maintenance workflows |

## File Index

| Area | Path | Role |
| --- | --- | --- |
| Contract anchor | `docs/eyehateagent-contract.md` | canonical routing, ownership, precedence, and adoption rules |
| Maintenance anchor | `docs/eyehateagent-maintenance.md` | template-repo-only governance and maintainer workflow |
| Mirrored rules | `.github/instructions/`, `.claude/rules/` | platform-specific instruction entry points |
| Project docs | `docs/project-docs/` | canonical project-specific truth |
| Guidelines | `docs/project-docs/guidelines/` | durable technical guidance |
| Reusable prompts | `docs/vibes/reusable-prompts/` | bootstrap, refresh, and consistency-audit workflows |
| Skills | `docs/vibes/skills/` | reusable procedures for analysis, testing, auditing, and design |

## Core Docs vs Guidelines

Use the core project docs under `docs/project-docs/` to describe the repository generally: scope, architecture, testing, roadmap, and operating context.
Use `docs/project-docs/guidelines/` to capture durable technical guidance that work should follow inside that repository.
A target repo is fully documented when it has both: the core project-doc set plus the active technical guideline layer it actually needs.

## Registry-Driven (Project-Doc & Guideline Extension)

Use `docs/project-docs/INDEX.md` as the authoritative registry for optional and conditional regular docs in a repo.
Use `docs/project-docs/guidelines/INDEX.md` as the authoritative registry for guideline types in a repo.
Starter template files under `docs/vibes/project-docs-template/` remain recommended references, but they are no longer the activation mechanism for known doc types.

If you want to add your own known optional regular doc type to the template, start at `docs/vibes/project-docs-template/INDEX.md`.
If you want to add your own known guideline type to the template, start at `docs/vibes/project-docs-template/guidelines/INDEX.md`.
If the new regular doc type needs brand-new stable headings, update `docs/eyehateagent-contract.md` first.