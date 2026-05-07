# Getting Started — Template Repository

Last updated: 2026-05-07

---

## Purpose

Use this repository as a base template for a new project that wants AI rules, skills, prompts, and project docs to agree with each other.

This repository intentionally contains no live sample application or service.

---

## First Orientation

Read these files first:

1. `docs/project-docs/TEMPLATE_CONTRACT.md`
2. `docs/project-docs/PROJECT.md`
3. `docs/project-docs/ARCHITECTURE.md`
4. `docs/project-docs/TESTING.md`
5. `docs/vibes/ADOPTION_GUIDE.md`

---

## Repository Surfaces

Use the template in four roles:

1. `docs/project-docs/` holds the active contract and repository truth.
2. `docs/vibes/` holds reusable template assets such as prompts, skills, and adoption guidance.
3. `.github/instructions/` and `.claude/rules/` expose the same generic rule layer to different agent platforms.
4. Any clearly named archive or reference path is optional and should never replace the active contract.

---

## Bootstrap A New Repository

1. Copy the active template surfaces into the target repository.
2. Replace the repo-level docs in `docs/project-docs/` with the adopted repository's actual project truth.
3. Keep `TEMPLATE_CONTRACT.md` and the prompt and skill systems intact unless the template itself is changing.
4. Add optional docs only when the adopted repository needs them.
5. Run a consistency pass before relying on the template operationally.

---

## Validate The Template

For template maintenance work:

1. search for stale names or ownership drift in `docs/`
2. review editor diagnostics for markdown issues
3. confirm rules, skills, prompts, and project docs still agree with `TEMPLATE_CONTRACT.md`

See `TESTING.md` for the verification policy.

---

## Working Rule

If a change is specific to an adopted repository, it belongs in that repository's project docs.
If a change is reusable across repositories, it belongs in the template.
