# Getting Started — Template Repository

Last updated: 2026-05-08

---

## Purpose

Use this document when you are orienting yourself inside the template repository itself.

If you are adopting this template into another repository, start with the repository root README and then use `docs/vibes/ADOPTION_GUIDE.md`.

---

## First Reads

Read these files first when working on this template repository:

1. `docs/project-docs/TEMPLATE_CONTRACT.md`
2. `docs/project-docs/PROJECT.md`
3. `docs/project-docs/ARCHITECTURE.md`
4. `docs/project-docs/TESTING.md`

If you are changing the template itself, read `docs/project-docs/TEMPLATE_MAINTENANCE.md` before editing rules, skills, reusable prompts, or lifecycle policy.

---

## Repository Surfaces

The repository is split into four main surfaces:

1. `docs/project-docs/` holds the active contract and repository truth.
2. `docs/vibes/` holds reusable template assets such as reusable prompts, skills, and adoption guidance.
3. `.github/instructions/` and `.claude/rules/` expose the same generic rule layer to different agent platforms.
4. Any clearly named archive or reference path is optional and should never replace the active contract.

---

## Which Doc To Use

1. For adopting this template into another repository, use the repository root README first, then `docs/vibes/ADOPTION_GUIDE.md`.
2. For changing the template itself, use `docs/project-docs/TEMPLATE_MAINTENANCE.md` and `docs/project-docs/TESTING.md`.

---

## Working Rule

If a change is specific to an adopted repository, it belongs in that repository's project docs.
If a change is reusable across repositories, it belongs in the template.
