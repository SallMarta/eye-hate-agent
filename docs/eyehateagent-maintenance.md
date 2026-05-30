# Template Maintenance — Template Repository

## 1. Summary

Use this file when changing the template itself rather than adopting the template into another repository.

This file owns template governance, lifecycle expectations, and maintainer workflow for changes to:

- `docs/eyehateagent-contract.md`
- docs-level contract anchors
- platform instruction surfaces (mirrored rule files)
- reusable prompts
- skills
- adoption and onboarding docs
- engine and installer code under `bin/` and `src/`
- runtime projection behavior for repo-local generated outputs

It does not own project-specific facts for adopted repositories.

---

## 2. Scope

This file covers:

- template-level structure, naming, routing, and lifecycle changes
- engine-level structure, runtime projections, and installer lifecycle changes
- backward-compatible vs. breaking template changes
- deprecation and removal of template surfaces
- maintainer workflow across the contract anchors, platform instruction surfaces, project-doc owners, skills, reusable prompts, and summary docs
- registry-driven extension of optional regular docs and guideline types
- starter guideline template additions or revisions under `docs/vibes/project-docs-template/technical-guidelines/`

---

## 3. Ownership Boundaries

| Question | Owner |
| --- | --- |
| Canonical structure, routing, ownership model, and adoption rules | `docs/eyehateagent-contract.md` |
| How to add skills, rule points, project-doc owners, or contract changes in any repository using this system | `docs/eyehateagent-contract.md` |
| First orientation for someone opening the repo | `README.md` |
| Adoption workflow for copying the template into another repo | `README.md` |
| EHA engine architecture and runtime support model | `docs/project-docs/foundation/architecture.md` |
| EHA maintainer and development loop | `docs/project-docs/foundation/workflow.md` |
| Template governance, lifecycle, and deprecation | this file |

---

## 4. Change Classes

| Class | Typical example | Required response |
| --- | --- | --- |
| Summary-only clarification | Tighten wording in `README.md` without changing behavior | Update the owner or summary, then run the narrowest maintenance audit |
| Backward-compatible template change | Add an optional doc, add a registry entry for a known optional doc type, add a reusable skill, add a starter template, or refine maintainer guidance without changing canonical paths | Update the owning doc, dependent summaries, and run the maintenance audit |
| Backward-compatible engine change | Add a new engine module, installer behavior, runtime projection, or CLI command without changing canonical contract ownership | Update the owning project docs, dependent summaries, and run the narrowest code-plus-doc validation |
| Breaking template change | Move `docs/eyehateagent-contract.md`, move `docs/eyehateagent-maintenance.md`, rename canonical paths, change stable headings, or change routing, precedence, fallback, or output rules | Update the contract first, add migration notes, update dependents, and run the full maintenance audit |

## 5. Compatibility And Breaking Changes

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
2. Update all platform instruction surfaces (mirrored rule files) in the same change (e.g., `.agents/`, `.claude/`, `.github/`).
3. Update affected skills, reusable prompts, onboarding docs, and summaries.
4. Update downstream copies that still track the template's canonical paths.
5. Add migration notes for adopters in `changelog.md` or the affected owner doc.
6. Run the full maintenance audit.

---

## 6. Deprecation Policy

- Mark a deprecated surface in place with its replacement and the reason for deprecation.
- Do not remove a reusable prompt, skill, canonical doc reference, or contract anchor until a replacement and migration note exist.
- Remove deprecated surfaces only after dependent docs are updated and the maintenance audit passes.

---

## 7. Maintainer Workflow

1. Classify the change before editing.
2. Use `docs/eyehateagent-contract.md` for extension rules that must survive adoption.
3. When adding a known optional regular doc type, start by updating `docs/vibes/project-docs-template/index.md`.
4. When adding a known guideline type, start by updating `docs/vibes/project-docs-template/technical-guidelines/index.md`.
5. If the new doc class needs a new stable heading pattern or ownership rule, update `docs/eyehateagent-contract.md` before relying on the registries.
6. Do not remove the roughly 65% context-compaction exception from the platform instruction surfaces (mirrored rule files) unless the contract is intentionally updated in the same change.
7. Ensure any changes to routing, precedence, fallback, or output rules in the contract are also synchronized into the "Contract Essentials" embedded in all platform instruction surfaces (mirrored rule files).
8. Update template-repo-only workflow or governance here only when the change affects this repository as a template.
9. Update engine owner docs under `docs/project-docs/` when runtime support, installer behavior, or CLI behavior changes.
10. Update mirrors, summaries, skills, reusable prompts, registries, starter template files, and downstream copies that quote or depend on the changed owner.
11. Run the maintenance audit sequence.
12. Record maintainer-facing changes in `changelog.md`.
