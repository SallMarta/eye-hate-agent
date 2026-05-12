# Template Maintenance — Template Repository

## Summary

Use this file when changing the template itself rather than adopting the template into another repository.

This file owns template governance, lifecycle expectations, and maintainer workflow for changes to:

- `docs/eyehateagent-contract.md`
- docs-level contract anchors
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
- maintainer workflow across the contract anchors, project-doc owners, skills, reusable prompts, and summary docs
- registry-driven extension of optional regular docs and guideline types
- starter guideline template additions or revisions under `docs/vibes/project-docs-template/guidelines/`

---

## Ownership Boundaries

| Question | Owner |
| --- | --- |
| Canonical structure, routing, ownership model, and adoption rules | `docs/eyehateagent-contract.md` |
| How to add skills, rule points, project-doc owners, or contract changes in any repository using this system | `docs/eyehateagent-contract.md` |
| First orientation for someone opening the repo | `README.md` |
| Adoption workflow for copying the template into another repo | `README.md` |
| Template governance, lifecycle, and deprecation | this file |

---

## Change Classes

| Class | Typical example | Required response |
| --- | --- | --- |
| Summary-only clarification | Tighten wording in `README.md` without changing behavior | Update the owner or summary, then run the narrowest maintenance audit |
| Backward-compatible template change | Add an optional doc, add a registry entry for a known optional doc type, add a reusable skill, add a starter template, or refine maintainer guidance without changing canonical paths | Update the owning doc, dependent summaries, and run the maintenance audit |
| Breaking template change | Move `docs/eyehateagent-contract.md`, move `docs/eyehateagent-maintenance.md`, rename canonical paths, change stable headings, or change routing, precedence, fallback, or output rules | Update the contract first, add migration notes, update dependents, and run the full maintenance audit |

## Compatibility And Breaking Changes

Treat these as breaking unless proven otherwise:

- root contract-anchor path changes
- canonical project-doc path or filename changes
- stable heading changes in project docs, skills, or reusable prompts
- required document set changes
- registry schema or registry-ownership changes that reusable prompts or adopters rely on
- routing, precedence, fallback, or output-by-mode changes
- reusable prompt or skill structure changes that adopted repositories may rely on

For a breaking change:

1. Update the owning document first, usually `docs/eyehateagent-contract.md`.
2. Update both mirrored rule files in the same change.
3. Update affected skills, reusable prompts, onboarding docs, and summaries.
4. Update downstream copies that still track the template's canonical paths.
5. Add migration notes for adopters in `CHANGELOG.md` or the affected owner doc.
6. Run the full maintenance audit.

---

## Deprecation Policy

- Mark a deprecated surface in place with its replacement and the reason for deprecation.
- Do not remove a reusable prompt, skill, canonical doc reference, or contract anchor until a replacement and migration note exist.
- Remove deprecated surfaces only after dependent docs are updated and the maintenance audit passes.

---

## Maintainer Workflow

1. Classify the change before editing.
2. Use `docs/eyehateagent-contract.md` for extension rules that must survive adoption.
3. Do not remove the roughly 65% context-compaction exception from the mirrored rule files unless the contract is intentionally updated in the same change.
4. Update template-repo-only workflow or governance here only when the change affects this repository as a template.
5. Update mirrors, summaries, skills, reusable prompts, registries, starter template files, and downstream copies that quote or depend on the changed owner.
6. Run the maintenance audit sequence.
7. Record maintainer-facing changes in `CHANGELOG.md`.
