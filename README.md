# Eye Hate Agent

---

## Purpose

Documentation repository for AI-agent-assisted project work.
It provides generic agent rules, reusable skills and prompts, and a project-doc contract.
This repository is documentation template-only. It is not a sample application.

## If You Read One File

Use this README as the main human guide.

Open other files only when you need something more specific:

- `TEMPLATE_CONTRACT.md` for the canonical system rules, ownership model, and precedence
- `TEMPLATE_MAINTENANCE.md` when changing this template repository itself
- the reusable prompt files themselves when you already know which maintenance workflow to run

## What This Repo Contains

| Surface | Path | Job |
| --- | --- | --- |
| Human entry point | `README.md` | Main adoption guide for humans and first-read orientation for agents |
| Root contract anchor | `TEMPLATE_CONTRACT.md` | Canonical routing, ownership, precedence, and adoption rules |
| Template governance | `TEMPLATE_MAINTENANCE.md` | Template-repo-only maintenance workflow and breaking-change guidance |
| Mirrored agent rules | `.github/instructions/`, `.claude/rules/` | Platform-specific entry surfaces that stay generic and point back to the contract |
| Reusable prompts | `docs/vibes/reusable-prompts/` | Bootstrap, refresh, and consistency-audit workflows |
| Reusable skills | `docs/vibes/skills/` | Procedural methods for analysis, testing, design, audits, and elevation |
| Manual starter pack | `docs/vibes/project-docs-template/` | Blank project-doc scaffold for adopters who do not want the first docs generated |
| Template change history | `docs/project-docs/CHANGELOG.md` | Maintainer-facing record of template changes |

## Three Adoption Topologies

This template can be used in three topology shapes.

| Scenario | Shape | Status in this repo |
| --- | --- | --- |
| 1. Distributed self-contained repos | Each adopted repo carries its own contract, project docs, rule surfaces, and reusable assets | Supported default |
| 2. Shared template repo, local project docs | Each adopted repo keeps local contract and project docs while one shared `eye-hate-agent` repo owns reusable assets | Supported alternative |
| 3. Centralized portfolio-doc repo | One shared `eye-hate-agent` repo holds reusable assets and multiple repos' project docs in one place | Possible, but outside this contract |

### Scenario 1 — Distributed Self-Contained Repos

Best when each repo should stay self-contained.

```text
target-repo/
├── TEMPLATE_CONTRACT.md
├── .github/instructions/
├── .claude/rules/
└── docs/
    ├── project-docs/
    └── vibes/
        ├── reusable-prompts/
        ├── skills/
        └── project-docs-template/   optional
```

Each adopted repo owns:

- `TEMPLATE_CONTRACT.md`
- `.claude/rules/`
- `.github/instructions/`
- `docs/project-docs/`
- `docs/vibes/skills/`
- `docs/vibes/reusable-prompts/`
- optional `docs/vibes/project-docs-template/`

`TEMPLATE_MAINTENANCE.md` may be copied during adoption, but normal adopted repositories remove it after setup because it is template-governance-only.

### Scenario 2 — Shared Template Repo, Local Project Docs

Best when one workspace-level template repo should serve many repos.

```text
workspace/
├── eye-hate-agent/
│   ├── .github/instructions/
│   ├── .claude/rules/
│   └── docs/
│       └── vibes/
│           ├── reusable-prompts/
│           ├── skills/
│           └── project-docs-template/
└── target-repo/
    ├── TEMPLATE_CONTRACT.md
    └── docs/
        └── project-docs/
```

The adopted repo keeps local truth:

- `TEMPLATE_CONTRACT.md`
- `docs/project-docs/`

The shared template repo owns reusable assets:

- `.claude/rules/`
- `.github/instructions/`
- `docs/vibes/skills/`
- `docs/vibes/reusable-prompts/`
- optional `docs/vibes/project-docs-template/`

Use local rule mirrors only when an agent platform requires repo-local instruction loading.

Tradeoffs:

- less duplication across repositories
- easier central maintenance of rules, skills, and prompts
- stronger cross-repo dependency on the shared template repo
- requires agents to see the shared template repo while working in the adopted repo

This topology is now supported by the contract as long as repo-specific facts stay local to each adopted repo.

### Scenario 3 — Centralized Portfolio-Doc Repo

Best only when you are intentionally redesigning the system around centralized docs.

```text
workspace/
└── eye-hate-agent/
    ├── .github/instructions/
    ├── .claude/rules/
    └── docs/
        ├── vibes/
        └── project-docs/
            ├── repo-a/
            ├── repo-b/
            └── repo-c/
```

One shared repo holds:

- shared rules, skills, prompts, and starter assets
- multiple repositories' project docs in one central place

This is technically possible, but it is **outside** the current contract.

Why it conflicts with the current documentation:

- the contract says project-specific facts belong in each repo's own `docs/project-docs/`
- the contract expects one local active contract layer per adopted repository
- centralizing multiple repos' project docs changes ownership, versioning, and agent-routing assumptions

Tradeoffs:

- easier portfolio-level discovery in one place
- much higher coordination and versioning risk
- weaker repo autonomy
- larger mismatch between local code state and centralized documentation unless governance is very strict

Treat Scenario 3 as a redesign, not a normal adoption.

## Adopt This Template Into Another Repo

Choose a supported topology first:

- use Scenario 1 when the repo should stay self-contained
- use Scenario 2 when one shared template repo should serve many repos
- treat Scenario 3 as a redesign, not a normal adoption path

### Scenario 1 Setup

#### Step 1: Copy The Template Surfaces

Copy these into the target repository:

- `TEMPLATE_CONTRACT.md`
- `TEMPLATE_MAINTENANCE.md` during adoption only; remove it after setup unless the target repo is also a template repository
- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/skills/`
- `docs/vibes/reusable-prompts/`

Optional:

- `docs/vibes/project-docs-template/` if you want blank starter docs instead of bootstrap-generated docs

If the target repo already has `.github/` or `.claude/`, copy only the relevant `instructions/` or `rules/` contents into the existing folder.

#### Step 2: Keep, Remove, And Replace

In the adopted repository:

- keep `TEMPLATE_CONTRACT.md` because the contract applies to all adopted repositories
- remove `TEMPLATE_MAINTENANCE.md` after the first setup pass because it governs template repositories, not adopted projects
- replace the project docs that describe this template repo

Create or replace these required docs first:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

Add these recommended docs for most projects:

- `GETTING_STARTED.md`
- `CHANGELOG.md`

Optional docs only when they carry durable value:

- `PRD.md`
- `PRODUCTION_RUNBOOK.md`
- `phases/`
- `guidelines/`

#### Step 3: Choose The Right Starting Path

Use this shortcut:

- new repo: bootstrap or the manual starter pack
- active repo with owner docs already in place: refresh
- unclear or mature repo: consistency audit first, then refresh

Use the manual starter pack only when you want blank docs to fill manually. Use bootstrap when you want the first owner docs generated from a brief.

### Scenario 2 Setup

#### Step 1: Keep The Owner Layer Local

In each adopted repository, keep or add:

- `TEMPLATE_CONTRACT.md`
- `docs/project-docs/`
- the required owner docs: `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md`

Remove `TEMPLATE_MAINTENANCE.md` from the adopted repo after setup.

#### Step 2: Keep Reusable Assets Shared

In the shared `eye-hate-agent` repo, keep:

- `.github/instructions/`
- `.claude/rules/`
- `docs/vibes/skills/`
- `docs/vibes/reusable-prompts/`
- optional `docs/vibes/project-docs-template/`

If an agent platform requires repo-local instruction loading, keep thin local mirrors in the adopted repo.

#### Step 3: Run Normal Work Against Local Truth

- use shared prompts and skills against the adopted repo's local project docs
- update local owner docs first when repo facts change
- do not centralize adopted-repo project facts into the shared template repo

## Reusable Prompt Path

| Repository state | Start with | Why |
| --- | --- | --- |
| Empty or nearly empty repo with only a brief | `00-project-docs-bootstrap.md` | You need the first owner docs before normal work begins |
| Existing repo where owner docs exist but are outdated | `00-project-docs-refresh.md` | The contract exists and needs owner-based updates |
| Existing repo with contradictions, stale summaries, or unclear ownership | `00-project-docs-consistency-audit.md` | You need to classify drift before updating anything |
| Mature repo with a strong pre-existing documentation system | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | Ownership mapping is the first problem |

Use the reusable prompt path for three jobs only:

- bootstrap the first project-doc set
- refresh the owner docs after a material change
- audit consistency when ownership or documentation trust is unclear

Under Scenario 2, run these workflows from the shared template repo against the adopted repo's local owner docs.

## Reusable Prompt Notes

Keep the reusable prompt layer small:

- add a new template reusable prompt only when it is broadly reusable across adopted repositories
- put project-specific reusable prompt experiments in the adopted repository, not in this template
- prefer improving the core reusable prompts over growing a large prompt catalog

Minimal rules for reusable prompts:

1. Read `TEMPLATE_CONTRACT.md` first.
2. Write project-specific truth into the correct project docs.
3. Update owner docs first, then summaries.
4. Use consistency audit when ownership is unclear or documentation trust drops.

## Manual Starter Pack

Use `docs/vibes/project-docs-template/` when you want blank starter docs instead of generated first-pass docs.

What it includes:

- required starter docs: `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, `QUICK_REFERENCE.md`
- optional starter docs: `GETTING_STARTED.md`, `CHANGELOG.md`, `PRD.md`, `PRODUCTION_RUNBOOK.md`

How to use it:

1. Copy the starter docs into the adopted repository's `docs/project-docs/` path.
2. Replace placeholder content with project-specific truth.
3. Add optional docs only when they carry durable project value.
4. Use reusable prompts or direct owner-doc updates after the first pass.

Rules for the starter pack:

- treat it as a scaffold, not as source-of-truth content
- do not keep two active owners for the same fact after copying it into an adopted repository
- keep the stable headings aligned with `TEMPLATE_CONTRACT.md`

## Safe To Start Normal Work

Normal work is ready when:

1. `PROJECT.md`, `ARCHITECTURE.md`, `TESTING.md`, `STATUS.md`, and `QUICK_REFERENCE.md` exist and reflect the adopted repo's real state.
2. The owning docs for goals, stack, commands, and progress are clear enough that rules and skills do not need to guess.
3. Material `TBD`, `Assumption`, or `Open Question` markers that would change implementation behavior are resolved or explicitly tracked.
4. The mirrored rule files still agree with each other.
5. A consistency pass has been completed after the initial adoption or migration work.

## Advanced Cases

Most adopters do not need more than the sections above. Use these rules when adoption gets messy:

- keep one active owner for each durable fact
- update owner docs first, then summaries and indexes
- update project docs before rewriting rules or skills for one repo's facts
- do not delete `docs/project-docs/`; keep `TEMPLATE_CONTRACT.md` and replace the project-specific truth

For a mature or differently structured repository:

1. Inventory the current docs before changing filenames or headings.
2. Map each durable fact to a single owner.
3. Run `docs/vibes/reusable-prompts/00-project-docs-consistency-audit.md` first if ownership is unclear.
4. Use `docs/vibes/reusable-prompts/00-project-docs-refresh.md` second to update only the owner docs that need alignment.
5. Start normal work only after the owner layer is clear.

Common traps:

- keeping two active owners for the same fact because both docs are well written
- refreshing summary docs before updating the owner docs
- rewriting rules or skills for one repo's stack instead of updating that repo's project docs
- skipping consistency audit when the repo already has stale summaries or unclear ownership

## Main Files And Their Jobs

| File | Main job |
| --- | --- |
| `README.md` | main human guide and adoption entry point |
| `TEMPLATE_CONTRACT.md` | canonical system rules, ownership, and precedence |
| `TEMPLATE_MAINTENANCE.md` | template-maintainer workflow for this repo |
| `docs/vibes/project-docs-template/` | manual starter scaffold for adopters who do not want bootstrap-generated docs |
| `docs/vibes/skills/` | reusable procedures for deeper analysis, test authoring, auditing, and design |
| `docs/vibes/reusable-prompts/00-project-docs-*.md` | reusable maintenance workflows |

## Where To Look Next

- canonical system rules: `TEMPLATE_CONTRACT.md`
- maintaining this template itself: `TEMPLATE_MAINTENANCE.md`
- manual starter scaffold: `docs/vibes/project-docs-template/`
- reusable skills: `docs/vibes/skills/`
- reusable maintenance workflows: `docs/vibes/reusable-prompts/00-project-docs-*.md`
