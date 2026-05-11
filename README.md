# Eye Hate Agent

This repo template is authored by SuLyAdEe.

---

## Purpose

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

### Step 3 — Run The Relevant Starter Reusable Prompt

| Better for | Start with | Repository state |
| --- | --- | --- |
| New project | `00-project-docs-bootstrap.md` | empty or nearly empty repo with only a brief |
| Running project | `00-project-docs-refresh.md` | existing repo where owner docs exist but are outdated |
| Mature or unclear project | `00-project-docs-consistency-audit.md` | existing repo with contradictions, stale summaries, or unclear ownership |
| Mature or unclear project | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | mature repo with a strong pre-existing documentation system |

These are the starter reusable prompts for project-doc adoption.
If more template prompts are added later, start here unless another prompt is clearly a better fit.

Use these reusable prompts for three jobs only:

- bootstrap the first owner docs
- refresh existing owner docs
- audit ownership before refresh when the repo is mature or unclear

If a mature target repo already has legacy docs, inventory them first and isolate or archive only the conflicting parts when needed.
For example, keep the active owner docs clear instead of letting old and new docs both look authoritative.
