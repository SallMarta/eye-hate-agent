# Project Docs Consistency Audit Reusable Prompt

Read `docs/eyehateagent-contract.md` first.

Audit the repository for **documentation-system drift**.

## Goal

Find mismatches where project docs, rules, skills, reusable prompts, workflow docs, or quick-reference material disagree about the same fact.

## Scope

Check at least these areas when present:

- `docs/project-docs/`
- `docs/project-docs/INDEX.md`
- `docs/project-docs/guidelines/`
- clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/`
- rule / instruction files
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
- workflow expectations
- roadmap / phase naming
- project identity and naming

## Required Behavior

1. Use project docs as the primary source of truth unless the repository explicitly states otherwise.
2. Treat `docs/eyehateagent-contract.md` as the ownership map.
3. Treat `docs/project-docs/INDEX.md` and `docs/project-docs/guidelines/INDEX.md` as the authoritative inventories for optional regular docs and guideline docs when present.
4. Treat clearly named reference or archive folders such as `docs-legacy/`, `docs-old/`, `archive/`, or `reference/` as migration input only, not as owner-doc paths.
5. When evaluating legacy material, classify it by the durable concern it governs rather than by its legacy name or path. Treat names such as `epic`, `milestone`, `roadmap`, `protocol`, `procedure`, `policy`, or `standard` as hints only.
6. Report likely mappings when content points to an active owner even if naming differs, such as phased-planning content that should map to `phases/` or technical-rule content that should map to `guidelines/`.
7. Distinguish between:
   - true contradiction
   - stale summary
   - historical artifact
   - optional module not currently active
8. When a repo is migrating from another documentation format, use those reference folders to map legacy topics into the correct owner docs under `docs/project-docs/`.
9. Treat a missing `docs/project-docs/INDEX.md` as drift when optional or conditional regular docs exist beyond the always-required core set.
10. Treat a missing `guidelines/INDEX.md` as drift when guideline files exist.
11. Treat registry entries without matching files and files without matching registry entries as drift unless the registry explicitly marks them deprecated or archived.
12. Treat a missing recommended guideline as drift only when the repo already claims that domain is covered or the repo claims to be fully documented for that domain.
13. If a legacy artifact could plausibly map to more than one active owner, or if preserving the legacy label may be intentional, ask the user for direction instead of silently classifying it.
14. When asking for that direction, prefer a concise question that states the inferred owner and the fallback choices. Example: `I found legacy "protocol" docs that look like technical guidance. Should I 1. skip them, 2. migrate them into active guideline docs, or 3. preserve "protocol" as a project-specific doc type?`
15. Do not fix anything unless explicitly asked.

## Output Contract

For each finding, include:

- severity
- fact in conflict
- source-of-truth file
- conflicting file
- why it matters
- recommended owner to update

## Final Pass

End with:

1. a short list of highest-priority drift items
2. a short list of acceptable historical artifacts that should not be treated as blockers

## Inputs

Use the current repository docs, rule files, skills, reusable prompts, and any relevant workflow or summary artifacts available below.
