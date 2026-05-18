# Testing & Verification

Last updated: 2026-05-12

---

## Verification Policy

This repository is a documentation template, not an application runtime.
This owner doc applies to the `eye-hate-agent` repository itself; downstream repositories should define their own local `docs/project-docs/testing.md`, typically starting from `docs/vibes/project-docs-template/testing.md`.
Validation for template-maintenance work is therefore document-first.
Use the narrowest check that can prove the changed contract, prompt, skill, template, or summary doc is internally consistent.
When no stronger executable test exists, use editor diagnostics, targeted consistency searches, and a maintenance-audit review instead of inventing a fake command.

## Verification Matrix

| Change type | Preferred validation | Fallback |
| --- | --- | --- |
| Summary-only doc clarification | Markdown diagnostics on changed files, then targeted diff review | Manual read-through of the changed owner doc and dependent summary docs |
| Contract, maintenance, reusable-prompt, or skill change | Markdown diagnostics, targeted consistency search across affected docs, then maintenance audit review | Structured manual consistency review across contract owner, dependent docs, and changelog |
| Starter template change under `docs/vibes/project-docs-template/` | Markdown diagnostics on added or changed templates, then check that referenced template surfaces and indexes stay aligned | Manual folder inventory plus cross-reference review |
| Canonical path, filename, stable heading, or routing change | Markdown diagnostics, consistency search across docs and platform instruction surfaces, then full maintenance audit review | Manual owner-by-owner review only if search tooling is unavailable |

## Commands

- changed-file diagnostics: use editor or Problems diagnostics for every changed Markdown file
- targeted consistency search: `rg -n "<changed-term>|<path>|<heading>" README.md docs .agents .github .claude`
- changed-doc review: `git --no-pager diff -- README.md docs`
- folder inventory for scaffold changes: `rg --files docs/vibes/project-docs-template`

Replace `<changed-term>|<path>|<heading>` with the concrete contract term, file path, or heading touched by the change.

## Test Layers

- File diagnostics: confirm changed Markdown files have no syntax or lint issues.
- Owner-doc consistency: confirm the owning doc expresses the durable truth first.
- Dependent-doc consistency: confirm summaries, reusable prompts, skills, and maintenance docs still match the owner.
- Template-surface consistency: confirm starter templates and indexes match the advertised contract.
- Maintenance-audit review: for higher-impact changes, run the same cross-surface review expected by the maintenance workflow.

## Naming and File Conventions

- Owner testing doc path: `docs/project-docs/testing.md`
- Adoption starter for downstream repos: `docs/vibes/project-docs-template/testing.md`
- Changelog path for maintainer-facing changes: `docs/project-docs/changelog.md`
- Template starter docs live under `docs/vibes/project-docs-template/`
- Reusable prompts live under `docs/vibes/reusable-prompts/`
- Skills live under `docs/vibes/skills/`

## CI / Release Gates

- Required before merge: changed Markdown files are diagnostic-clean.
- Required before merge: owning docs and dependent docs are checked for consistency.
- Required before merge: maintainer-facing template changes are recorded in `docs/project-docs/changelog.md`.
- Required before release of breaking template changes: run the full maintenance audit sequence described by `docs/eyehateagent-maintenance.md`.
- Advisory: confirm platform instruction surfaces (mirrored rule files) were either updated or explicitly left unchanged because they remain generic.

## Manual Checks

- Confirm the owning document was updated before dependent summaries or reusable assets.
- Confirm contract changes did not leave stale paths, headings, or ownership rules in README, reusable prompts, maintenance docs, or skills.
- Confirm new starter templates use the stable heading pattern defined by the contract.
- Confirm the repo is not claiming executable tests that do not actually exist.
