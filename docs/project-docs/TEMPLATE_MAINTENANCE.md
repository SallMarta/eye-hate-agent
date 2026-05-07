# Template Maintenance — Template Repository

Last updated: 2026-05-07

---

## Summary

Use this file when changing the template itself rather than adopting the template into another repository.

This file owns template governance, lifecycle expectations, and maintainer workflow for changes to:

- `TEMPLATE_CONTRACT.md`
- mirrored rule files
- reusable prompts
- skills
- adoption and onboarding docs

It does not own project-specific facts for adopted repositories.

---

## Scope

This file covers:

- template-level structure, naming, routing, and lifecycle changes
- backward-compatible vs. breaking template changes
- deprecation and removal of template surfaces
- maintainer workflow across contract, rules, skills, reusable prompts, and summary docs

---

## Ownership Boundaries

| Question | Owner |
| --- | --- |
| Canonical structure, routing, and ownership model | `TEMPLATE_CONTRACT.md` |
| Verification methods and maintenance audit checks | `TESTING.md` |
| First orientation for someone opening the repo | `GETTING_STARTED.md` |
| Adoption workflow for copying the template into another repo | `docs/vibes/ADOPTION_GUIDE.md` |
| Template governance, lifecycle, and deprecation | this file |

---

## Change Classes

| Class | Typical example | Required response |
| --- | --- | --- |
| Summary-only clarification | Tighten wording in `QUICK_REFERENCE.md` or `GETTING_STARTED.md` without changing behavior | Update the owner or summary, then run the narrowest maintenance audit |
| Backward-compatible template change | Add an optional doc, add a reusable skill, or refine maintainer guidance | Update the owning doc, dependent summaries, and run the maintenance audit |
| Breaking template change | Rename canonical paths, change stable headings, change the required doc set, or change routing, precedence, fallback, or output rules | Update the contract first, add migration notes, update dependents, and run the full maintenance audit |

---

## Compatibility And Breaking Changes

Treat these as breaking unless proven otherwise:

- canonical path or filename changes
- stable heading changes in project docs, skills, or reusable prompts
- required document set changes
- routing, precedence, fallback, or output-by-mode changes
- reusable prompt or skill structure changes that adopted repositories may rely on

For a breaking change:

1. Update the owning document first, usually `TEMPLATE_CONTRACT.md`.
2. Update both mirrored rule files in the same change.
3. Update affected skills, reusable prompts, onboarding docs, and summaries.
4. Add migration notes for adopters in `CHANGELOG.md` or the affected owner doc.
5. Run the full maintenance audit from `TESTING.md`.

---

## Deprecation Policy

- Mark a deprecated surface in place with its replacement and the reason for deprecation.
- Do not remove a reusable prompt, skill, or canonical doc reference until a replacement and migration note exist.
- Remove deprecated surfaces only after dependent docs are updated and the maintenance audit passes.

---

## Maintainer Workflow

1. Classify the change before editing.
2. Update the owning doc first.
3. Update mirrors, summaries, skills, or reusable prompts that quote or depend on it.
4. Run the maintenance audit sequence in `TESTING.md`.
5. Record maintainer-facing changes in `CHANGELOG.md`.
