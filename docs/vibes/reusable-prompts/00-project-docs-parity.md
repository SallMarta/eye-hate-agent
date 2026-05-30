# Project Docs Parity Reusable Prompt

Audit the repository for **documentation-system drift**.

## Goal

Find mismatches where project docs, platform instruction surfaces (mirrored rule files), skills, reusable prompts, workflow docs, quick-reference material, or relevant implementation evidence disagree about the same fact.

## Scope

Check at least these areas when present:

- `docs/project-docs/`
- `docs/project-docs/index.md`
- `docs/project-docs/technical-guidelines/`
- relevant code, tests, configs, or runtime-facing artifacts when a finding depends on current implementation behavior or source-of-truth ownership
- clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/`
- platform instruction surfaces (mirrored rule files)
- `docs/vibes/skills/`
- `docs/vibes/reusable-prompts/`
- workflow docs and handoff docs

### High-Value Drift Categories

- stack and dependency choices
- test commands and quality gates
- architecture and dependency rules
- optional and conditional regular-doc inventory mismatches
- API / integration ownership
- technical guideline ownership, overlap, and missing guideline index coverage
- semantic legacy-to-owner mapping mismatches where content is relevant but naming differs
- code-vs-doc authority mismatches where current implementation and active docs disagree
- workflow expectations
- roadmap / phase naming
- project identity and naming
- undocumented domain knowledge embedded in the codebase (e.g., decision rationale in comments, architectural constraints in configs, domain rules in validation logic) that should be surfaced into project docs

## Required Behavior

1. Use project docs as the primary source of truth for documentation ownership and doc-to-doc drift unless the repository explicitly states otherwise.
2. Use the EHA Project Doc Rules above as the ownership map.
3. Treat `docs/project-docs/index.md` and `docs/project-docs/technical-guidelines/index.md` as the authoritative inventories for optional regular docs and guideline docs when present.
4. Treat clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` as migration input only, not as owner-doc paths.
5. When evaluating legacy material, classify it by the durable concern it governs rather than by its legacy name or path. Treat names such as `epic`, `milestone`, `roadmap`, `protocol`, `procedure`, `policy`, or `standard` as hints only.
6. Report likely mappings when content points to an active owner even if naming differs, such as phased-planning content that should map to `foundation/phases/` or technical-rule content that should map to `technical-guidelines/`.
7. Distinguish between:
   - true contradiction
   - stale summary
   - historical artifact
   - optional module not currently active
8. When a repo is migrating from another documentation format, use those reference folders to map legacy topics into the correct owner docs under `docs/project-docs/`.
9. Treat a missing `docs/project-docs/index.md` as drift when optional or conditional regular docs exist beyond the always-required core set.
10. Treat a missing `technical-guidelines/index.md` as drift when guideline files exist.
11. Treat registry entries without matching files and files without matching registry entries as drift unless the registry explicitly marks them deprecated or archived.
12. Treat a missing recommended guideline as drift only when the repo already claims that domain is covered or the repo claims to be fully documented for that domain.
13. When a finding depends on whether the implementation or the documentation is authoritative, inspect the relevant code, tests, configs, or runtime-facing artifacts before classifying the issue.
14. If code and documentation conflict and the repository does not explicitly declare which source is authoritative for that fact, do not assume. Report the conflict and ask the user for direction before recommending a fix path.
15. If a legacy artifact could plausibly map to more than one active owner, or if preserving the legacy label may be intentional, ask the user for direction instead of silently classifying it.
16. When asking for that direction, prefer a concise question that names the fact in conflict and the likely choices. Example: `I found a conflict between the code and the docs for the active API behavior. Should I treat 1. the code as correct and update the docs, 2. the docs as correct and treat the code as drift, or 3. mark this as an intentional temporary mismatch?`
17. If strong repository evidence already establishes the authority order for that fact, state that evidence explicitly instead of asking.
18. Treat missing code evidence the same as missing doc evidence: reduce confidence, state the limitation, and avoid guessing.
19. Do not fix anything unless explicitly asked.

## Output Contract

For each finding, include:

- severity
- fact in conflict
- source-of-truth file
- conflicting file
- whether the conflict is doc-vs-doc, code-vs-doc, or registry-vs-file
- why it matters
- recommended owner to update
- whether user direction is required before deciding the fix path

## Final Pass

End with:

1. a short list of highest-priority drift items
2. a short list of acceptable historical artifacts that should not be treated as blockers

## Inputs

Use the current repository docs, platform instruction surfaces, skills, reusable prompts, and any relevant workflow or summary artifacts available below.
