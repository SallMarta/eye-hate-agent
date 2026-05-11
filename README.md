> ---
> # **Eye Hate Agent**
> ###### authored by SuLyAdEe
> --- 
---

# Purpose

Documentation repository for AI-agent-assisted project work.
It provides generic agent rules, reusable skills and prompts, and a project-doc contract.
This repository is documentation template-only. It is not a sample application.
Use this README first.
Use `TEMPLATE_CONTRACT.md` for canonical rules and precedence.
Use `TEMPLATE_MAINTENANCE.md` only when changing this template repository.

## Main Files

| File | Main job |
| --- | --- |
| `README.md` | main human guide and adoption entry point |
| `TEMPLATE_CONTRACT.md` | canonical system rules, ownership, and precedence |
| `TEMPLATE_MAINTENANCE.md` | template-maintainer workflow for this repo |
| `docs/vibes/project-docs-template/` | optional starter docs scaffold |
| `docs/vibes/skills/` | reusable procedures for deeper analysis, test authoring, auditing, and design |
| `docs/vibes/reusable-prompts/00-project-docs-*.md` | reusable maintenance workflows |

## How to Adopt This Template

Choose the topology first, then choose the project category.

| Topology | Use when | Status |
| --- | --- | --- |
| Scenario 1. Distributed self-contained repos | each repo should carry its own contract, rule surfaces, and reusable assets | Supported default |
| Scenario 2. Shared template repo, local project docs | one shared `eye-hate-agent` repo should serve many repos, while each repo keeps local owner docs | Supported alternative |
| Scenario 3. Centralized portfolio-doc repo | one shared repo should own multiple repos' project docs | Outside this contract |

### Scenario 1 — Distributed Self-Contained Repos

```text
target-repo/
├── TEMPLATE_CONTRACT.md
├── .github/instructions/
├── .claude/rules/
└── docs/
    ├── project-docs/
    └── vibes/
        ├── reusable-prompts/
        └── skills/
```

Keep in the target repo:

- `TEMPLATE_CONTRACT.md`
- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Remove `TEMPLATE_MAINTENANCE.md` after setup unless the target is also a template repo.

### Scenario 2 — Shared Template Repo, Local Project Docs

```text
workspace/
├── eye-hate-agent/
│   ├── .github/instructions/
│   ├── .claude/rules/
│   └── docs/
│       └── vibes/
│           ├── reusable-prompts/
│           └── skills/
└── target-repo/
    ├── TEMPLATE_CONTRACT.md
    └── docs/
        └── project-docs/
```

Keep in the target repo:

- `TEMPLATE_CONTRACT.md`
- `docs/project-docs/`

Keep in the shared `eye-hate-agent` repo:

- `.github/instructions/`
- `.claude/rules/`
- `docs/vibes/reusable-prompts/`
- `docs/vibes/skills/`

Use local rule mirrors only when an agent platform requires repo-local instruction loading.

### Scenario 3 — Centralized Portfolio-Doc Repo

```text
workspace/
├── eye-hate-agent/
│   ├── TEMPLATE_CONTRACT.md
│   ├── .github/instructions/
│   ├── .claude/rules/
│   └── docs/
│       └── vibes/
│           ├── reusable-prompts/
│           └── skills/
│       ├── project-docs-target-repo-a/
│       └── project-docs-target-repo-b/
├── target-repo-a/
└── target-repo-b/
```

This scenario is possible, but outside this contract.
Use it only if you intentionally redesign ownership so one repo owns multiple repos project docs.

### Choose The Project Category

| Project category | Scenario 1 | Scenario 2 |
| --- | --- | --- |
| New project | copy the local template surfaces, create local owner docs, then run bootstrap | keep local contract plus owner docs, keep reusable assets shared, then run bootstrap from the shared repo |
| Running project | keep local owner docs and run refresh | keep local owner docs and run refresh from the shared repo |
| Mature or unclear project | run consistency audit first, then refresh | run consistency audit from the shared repo against local owner docs, then refresh |

Always keep these required owner docs in the target repo:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

## Useful and Reusable Prompt

| Repository state | Start with | Why |
| --- | --- | --- |
| Empty or nearly empty repo with only a brief | `00-project-docs-bootstrap.md` | You need the first owner docs before normal work begins |
| Existing repo where owner docs exist but are outdated | `00-project-docs-refresh.md` | The contract exists and needs owner-based updates |
| Existing repo with contradictions, stale summaries, or unclear ownership | `00-project-docs-consistency-audit.md` | You need to classify drift before updating anything |
| Mature repo with a strong pre-existing documentation system | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | Ownership mapping is the first problem |

Use these prompts for three jobs only:

- bootstrap the first owner docs
- refresh existing owner docs
- audit ownership before refresh when the repo is mature or unclear

If you are going to use these reusable prompts on the mature repo that has its own documentations, please consider to rename its own documentations. 
(e.g., `docs` to `docs-old`, to avoid confusion)