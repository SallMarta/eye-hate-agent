# Eye Hate Agent

Last updated: 2026-05-08

---

# Purpose

This repository is a template for AI-agent-assisted project work.

It gives you:

- generic agent rules
- reusable skills and prompts
- a project-doc contract

This repository is template-only. It is not a sample application.

---

# How To Adopt This Into Another Repository

Copy these parts into the target repo:

- `docs/`
- `.claude/`
- `.github/`

If the target repo already has `.claude/` or `.github/`, copy only their inner folders:

- `.claude/rules/`
- `.github/instructions/`

Keep this rule:

- do not delete `docs/project-docs/`
- keep `docs/project-docs/TEMPLATE_CONTRACT.md`
- remove `docs/project-docs/TEMPLATE_MAINTENANCE.md`
- replace the project docs that describe this template repo

Then use the quick setup below that matches the target repo.

---

# Quick Setup

Pick the case that matches your repo.

### New Blank Project

Use this when the target repo is still mostly empty.

1. Copy `docs/`, `.claude/`, and `.github/` into the target repo.
2. Keep `docs/project-docs/TEMPLATE_CONTRACT.md`.
3. Remove `docs/project-docs/TEMPLATE_MAINTENANCE.md`.
4. Remove the project docs that describe this template repo.
5. Then choose one path:
   use `00-project-docs-bootstrap.md` if you want docs generated from a brief
   use `docs/vibes/project-docs-template/` if you want blank docs to fill manually

### Running-Half Project

Use this when the target repo already has active code or partial docs.

1. Copy `docs/` into the target repo.
2. Copy `.claude/` and `.github/` too.
3. If the target repo already has `.claude/` or `.github/`, copy only `rules/` or `instructions/` inside them.
4. Keep `docs/project-docs/TEMPLATE_CONTRACT.md`.
5. Remove `docs/project-docs/TEMPLATE_MAINTENANCE.md`.
6. Keep the existing project truth that is still correct.
7. Replace or refresh only the docs that should become the active owners.

### Existing-Done Project

Use this when the target repo is already mature and mostly documented.

1. Copy `docs/` into the target repo.
2. Copy `.claude/` and `.github/` too.
3. If the target repo already has `.claude/` or `.github/`, copy only `rules/` or `instructions/` inside them.
4. Keep `docs/project-docs/TEMPLATE_CONTRACT.md`.
5. Remove `docs/project-docs/TEMPLATE_MAINTENANCE.md`.
6. Map the existing docs into the contract owners.
7. Run `00-project-docs-consistency-audit.md` first if ownership is unclear.
8. Refresh only the owner docs that actually need to change.

Usually remove or replace these project docs:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

Add or replace optional docs only when needed:

- `GETTING_STARTED.md`
- `CHANGELOG.md`
- `PRD.md`
- `PRODUCTION_RUNBOOK.md`
- `phases/`
- `guidelines/`

After setup:

1. Use `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md` if the repo is new or unclear.
2. Use `docs/vibes/project-docs-template/` if you want blank starter docs.
3. Use `docs/vibes/reusable-prompts/00-project-docs-consistency-audit.md` first if the target repo already has mature docs and you are not sure what should own what.

---

# Quick Rule

For downstream adoption:

- keep the folder
- keep the contract
- remove template maintenance
- replace project truth

---

### Notes

- For the full adoption guide, read `docs/vibes/ADOPTION_GUIDE.md`.
- Maintaining this template itself: read `docs/project-docs/TEMPLATE_MAINTENANCE.md`.

---
---
---
---
---
---
---
---
---
---
||||| SuLyAdeE |||||