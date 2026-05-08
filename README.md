# Eye Hate Agent

Last updated: 2026-05-08

---

## Purpose

This repository is a template for AI-agent-assisted project work.

It gives you:

- generic agent rules
- reusable skills and prompts
- a project-doc contract

This repository is template-only. It is not a sample application.

## Choose Your Repo Type

If you are adopting this template into another repo, start here.

### New Project

Use this when the target repo is still mostly empty.

1. Copy `docs/`, `.claude/`, and `.github/` into the target repo.
2. Keep `docs/project-docs/TEMPLATE_CONTRACT.md`.
3. Remove `docs/project-docs/TEMPLATE_MAINTENANCE.md`.
4. Remove the project docs that describe this template repo.
5. Choose one path:
   use `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` for docs from a brief
   use `docs/vibes/project-docs-template/` for blank starter docs

### Active Project

Use this when the target repo already has active code or partial docs.

1. Copy `docs/` into the target repo.
2. Copy `.claude/` and `.github/` too.
3. If the target repo already has `.claude/` or `.github/`, copy only `rules/` or `instructions/` inside them.
4. Keep `docs/project-docs/TEMPLATE_CONTRACT.md`.
5. Remove `docs/project-docs/TEMPLATE_MAINTENANCE.md`.
6. Keep the project truth that is still correct.
7. Replace or refresh only the docs that should become the active owners.

### Mature Project

Use this when the target repo is already mature and mostly documented.

1. Copy `docs/` into the target repo.
2. Copy `.claude/` and `.github/` too.
3. If the target repo already has `.claude/` or `.github/`, copy only `rules/` or `instructions/` inside them.
4. Keep `docs/project-docs/TEMPLATE_CONTRACT.md`.
5. Remove `docs/project-docs/TEMPLATE_MAINTENANCE.md`.
6. Map the existing docs into the contract owners.
7. Run `docs/vibes/reusable-prompts/00-project-docs-consistency-audit.md` first if ownership is unclear.
8. Refresh only the owner docs that actually need to change.

## Core Rule

For downstream adoption:

- keep `docs/project-docs/`
- keep `TEMPLATE_CONTRACT.md`
- remove `TEMPLATE_MAINTENANCE.md`
- replace the project docs that describe this template repo

Usually replace these project docs:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

Optional docs to add or replace only when needed:

- `GETTING_STARTED.md`
- `CHANGELOG.md`
- `PRD.md`
- `PRODUCTION_RUNBOOK.md`
- `phases/`
- `guidelines/`

## More Detail

- full adoption guide: `docs/vibes/ADOPTION_GUIDE.md`
- maintaining this template itself: `docs/project-docs/TEMPLATE_MAINTENANCE.md`
