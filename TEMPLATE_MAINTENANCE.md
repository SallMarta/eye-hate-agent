# Template Maintenance — Template Repository

Last updated: 2026-05-11

---

## Summary

Use this file when changing the template itself rather than adopting the template into another repository.

This file owns template governance, lifecycle expectations, and maintainer workflow for changes to:

- `TEMPLATE_CONTRACT.md`
- root-level template-governance paths
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
- maintainer workflow across the root contract anchors, project-doc owners, skills, reusable prompts, and summary docs

---

## Ownership Boundaries

| Question | Owner |
| --- | --- |
| Canonical structure, routing, ownership model, and adoption rules | `TEMPLATE_CONTRACT.md` |
| How to add skills, rule points, project-doc owners, or contract changes in any repository using this system | `TEMPLATE_CONTRACT.md` |
| First orientation for someone opening the repo | `README.md` |
| Adoption workflow for copying the template into another repo | `README.md` |
| Template governance, lifecycle, and deprecation | this file |

---

## Change Classes

| Class | Typical example | Required response |
| --- | --- | --- |
| Summary-only clarification | Tighten wording in `README.md` without changing behavior | Update the owner or summary, then run the narrowest maintenance audit |
| Backward-compatible template change | Add an optional doc, add a reusable skill, or refine maintainer guidance without changing canonical paths | Update the owning doc, dependent summaries, and run the maintenance audit |
| Breaking template change | Move `TEMPLATE_CONTRACT.md`, move `TEMPLATE_MAINTENANCE.md`, rename canonical paths, change stable headings, or change routing, precedence, fallback, or output rules | Update the contract first, add migration notes, update dependents, and run the full maintenance audit |

## Compatibility And Breaking Changes

Treat these as breaking unless proven otherwise:

- root contract-anchor path changes
- canonical project-doc path or filename changes
- stable heading changes in project docs, skills, or reusable prompts
- required document set changes
- routing, precedence, fallback, or output-by-mode changes
- reusable prompt or skill structure changes that adopted repositories may rely on

For a breaking change:

1. Update the owning document first, usually `TEMPLATE_CONTRACT.md`.
2. Update both mirrored rule files in the same change.
3. Update affected skills, reusable prompts, onboarding docs, and summaries.
4. Update downstream copies that still track the template's canonical paths.
5. Add migration notes for adopters in `CHANGELOG.md` or the affected owner doc.
6. Run the full maintenance audit.

---

## Deprecation Policy

- Mark a deprecated surface in place with its replacement and the reason for deprecation.
- Do not remove a reusable prompt, skill, canonical doc reference, or root contract anchor until a replacement and migration note exist.
- Remove deprecated surfaces only after dependent docs are updated and the maintenance audit passes.

---

## Maintainer Workflow

1. Classify the change before editing.
2. Use `TEMPLATE_CONTRACT.md` for extension rules that must survive adoption.
3. Do not remove the roughly 65% context-compaction exception from the mirrored rule files unless the contract is intentionally updated in the same change.
4. Update template-repo-only workflow or governance here only when the change affects this repository as a template.
5. Update mirrors, summaries, skills, reusable prompts, and downstream copies that quote or depend on the changed owner.
6. Run the maintenance audit sequence.
7. Record maintainer-facing changes in `CHANGELOG.md`.
