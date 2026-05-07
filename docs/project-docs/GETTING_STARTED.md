# Getting Started — Template Repository

Last updated: 2026-05-07

---

## Purpose

Use this repository as a base template for a new project that wants AI rules, skills, reusable prompts, and project docs to agree with each other.

This repository intentionally contains no live sample application or service.

---

## First Orientation

Read these files first:

1. `docs/project-docs/TEMPLATE_CONTRACT.md`
2. `docs/project-docs/PROJECT.md`
3. `docs/project-docs/ARCHITECTURE.md`
4. `docs/project-docs/TESTING.md`
5. `docs/vibes/ADOPTION_GUIDE.md`

If you are changing the template itself rather than adopting it, read `docs/project-docs/TEMPLATE_MAINTENANCE.md` before editing rules, skills, reusable prompts, or lifecycle policy.

---

## Repository Surfaces

Use the template in four roles:

1. `docs/project-docs/` holds the active contract and repository truth.
2. `docs/vibes/` holds reusable template assets such as reusable prompts, skills, and adoption guidance.
3. `.github/instructions/` and `.claude/rules/` expose the same generic rule layer to different agent platforms.
4. Any clearly named archive or reference path is optional and should never replace the active contract.

---

## Next Documents

1. For copying the template into another repository, continue with `docs/vibes/ADOPTION_GUIDE.md`.
2. For changing the template itself, continue with `docs/project-docs/TEMPLATE_MAINTENANCE.md` and `docs/project-docs/TESTING.md`.

---

## Working Rule

If a change is specific to an adopted repository, it belongs in that repository's project docs.
If a change is reusable across repositories, it belongs in the template.
