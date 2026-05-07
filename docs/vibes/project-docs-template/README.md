# Project Docs Starter Pack

Last updated: 2026-05-07

---

## Purpose

This folder provides a **static starter set** for repositories that want a plain project-doc scaffold without generating the first set through a reusable prompt.

Use this starter pack when:

- you want to inspect the required doc structure before running bootstrap
- you want to copy a minimal doc scaffold manually
- you want a human-readable baseline alongside the prompt-based workflow

This folder is a reusable asset, not an active contract layer for this repository.
The active contract for this repository still lives in `docs/project-docs/`.

---

## Included Files

This starter pack includes the five required project-doc files:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `TESTING.md`
- `STATUS.md`
- `QUICK_REFERENCE.md`

These files are intentionally generic and should be replaced with project-specific truth in the adopted repository.

---

## How To Use It

1. Copy these files into the adopted repository's `docs/project-docs/` path.
2. Replace every placeholder section with project-specific truth.
3. Add optional docs such as `GETTING_STARTED.md`, `CHANGELOG.md`, `FEATURE_INVENTORY.md`, `phases/`, or `guidelines/*` only when they carry durable project value.
4. After the first pass, use the reusable prompt workflow or direct updates to refine the owner docs.

If you want the initial doc set to be generated from a brief instead of copied manually, prefer `docs/vibes/reusable-prompts/00-project-docs-bootstrap.md`.

---

## Rules

- Treat this folder as a starter scaffold, not as source-of-truth content.
- Do not keep two active owners for the same fact after copying these files into an adopted repository.
- Keep the stable headings aligned with `docs/project-docs/TEMPLATE_CONTRACT.md`.
- When this starter pack changes, update the owner docs and summary docs that describe reusable assets.
