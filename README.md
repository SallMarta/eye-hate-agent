# Eye Hate Agent

---

## Purpose

Document repository for AI-agent-assisted project work. 
Gives you:
- Generic agent rules, 
- Reusable skills and prompts,
- Project-doc contract. 

This repository is documentation template-only. It is not a sample application.

## If You Read One File

Use this README as the main human guide.

Open other files only when you need something more specific:

- `TEMPLATE_CONTRACT.md` for the canonical system rules, ownership model, and precedence
- `TEMPLATE_MAINTENANCE.md` when changing this template repository itself
- the reusable prompt files themselves when you already know which maintenance workflow to run

## Choose Your Repo Type

If you are adopting this template into another repo, start here.

### New Project

Use this when the target repo is still mostly empty or blank.

1. Copy the template surfaces into the target repo.
2. Keep `TEMPLATE_CONTRACT.md`.
3. Remove `TEMPLATE_MAINTENANCE.md` from the adopted repo.
4. Then choose one path:
   - run `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` if you want the first owner docs generated from a brief
   - use `docs/vibes/project-docs-template/` if you want blank starter docs to fill manually

### Active Project

Use this when the target repo already has active code or partial docs.

1. Copy the template surfaces into the target repo.
2. Keep `TEMPLATE_CONTRACT.md`.
3. Remove `TEMPLATE_MAINTENANCE.md` from the adopted repo.
4. Keep the target repo docs that are still correct.
5. Replace or refresh only the docs that should become the active owners.

### Mature Project

Use this when the target repo is already mature and mostly documented.

1. Copy the template surfaces into the target repo.
2. Keep `TEMPLATE_CONTRACT.md`.
3. Remove `TEMPLATE_MAINTENANCE.md` from the adopted repo.
4. Run `docs/vibes/reusable-prompts/00-project-docs-consistency-audit.md` first if ownership is unclear.
5. Refresh only the owner docs that actually need to change.

## What To Copy

Copy these template surfaces into the target repo:

- `TEMPLATE_CONTRACT.md`
- `TEMPLATE_MAINTENANCE.md`
- `.github/instructions/`
- `.claude/rules/`
- `docs/project-docs/`
- `docs/vibes/skills/`
- `docs/vibes/reusable-prompts/`

Optional starter asset:

- `docs/vibes/project-docs-template/` when you want a blank project-doc scaffold in addition to the reusable prompt workflow

If the target repo already has `.github/` or `.claude/`, copy only the relevant `instructions/` or `rules/` contents into the existing folder.
Downstream adopted repositories normally keep `TEMPLATE_CONTRACT.md` and remove `TEMPLATE_MAINTENANCE.md` after the first setup pass.

## Manual Starter Pack

Use `docs/vibes/project-docs-template/` when you want blank starter docs instead of generating the first owner docs from a brief.

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

## Keep, Remove, And Replace

For downstream adoption:

- keep `TEMPLATE_CONTRACT.md`
- remove `TEMPLATE_MAINTENANCE.md`
- replace the project docs that describe this template repo

Usually replace or create these owner docs in the adopted repo:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

Optional docs only when needed:

- `GETTING_STARTED.md`
- `CHANGELOG.md`
- `PRD.md`
- `PRODUCTION_RUNBOOK.md`
- `phases/`
- `guidelines/`

## Which Reusable Prompt To Start With

| Repository state | Start with | Why |
| --- | --- | --- |
| Empty or nearly empty repo with only a brief | `00-project-docs-bootstrap.md` | You need the first owner docs before normal work begins |
| Existing repo where owner docs exist but are outdated | `00-project-docs-refresh.md` | The contract exists and needs owner-based updates |
| Existing repo with contradictions, stale summaries, or unclear ownership | `00-project-docs-consistency-audit.md` | You need to classify drift before updating anything |
| Mature repo with a strong pre-existing documentation system | `00-project-docs-consistency-audit.md`, then `00-project-docs-refresh.md` | Ownership mapping is the first problem |

## Reusable Prompt Notes

Use the reusable prompt layer for three jobs only:

- bootstrap the first project-doc set
- refresh the owner docs after a material change
- audit consistency when ownership or documentation trust is unclear

Keep the reusable prompt layer small:

- add a new template reusable prompt only when it is broadly reusable across adopted repositories
- put project-specific reusable prompt experiments in the adopted repository, not in this template
- prefer improving the core reusable prompts over growing a large prompt catalog

Minimal rules for reusable prompts:

1. Read `TEMPLATE_CONTRACT.md` first.
2. Write project-specific truth into the correct project docs.
3. Update owner docs first, then summaries.
4. Use consistency audit when ownership is unclear or documentation trust drops.

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
| `docs/vibes/reusable-prompts/00-project-docs-*.md` | reusable maintenance workflows |

## More Detail

- canonical system rules: `TEMPLATE_CONTRACT.md`
- maintaining this template itself: `TEMPLATE_MAINTENANCE.md`
- manual starter scaffold: `docs/vibes/project-docs-template/`
- reusable maintenance workflows: `docs/vibes/reusable-prompts/00-project-docs-*.md`
