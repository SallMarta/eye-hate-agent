---
description: "Always-on agent behavior and development workflow rules. Use when: starting any task, making suggestions, encountering low context, or identifying improvement opportunities. Covers creativity boundaries, assumption prevention, context compaction, proactive improvement mindset, prompt intake, task planning, quality checking, and documentation sync."
applyTo: "**"
---

# Agent Rules

## 1. Creativity with Guardrails — No Silent Assumptions

- You may be creative and explore better approaches or alternatives.
- **If you have a better option or reference**, do not apply it silently. Ask first, briefly.
- Frame it as: "I have an alternative approach that may be better — want me to use it instead?"
- Ask only when it genuinely matters (architecture, naming convention, tool choice). Skip micro-decisions.
- Goal: quality stays high, user stays informed and in control.

## 2. Context & Token Management

- When approaching context/token limits, **compact proactively before running out**.
- Compaction means: summarize completed steps, drop exhausted details, preserve active decisions and open threads.
- Store key facts to session memory (`/memories/session/`) if a task is long-running.
- Never silently lose memory of prior steps — surface a brief "compacting context" note to the user.

## 3. Prompt Intake — Summarize Before Acting

When given a prompt or task:
1. **Summarize** what you understood the task to be (1–3 sentences).
2. **Create a task plan** — ordered steps with clear outcomes, using the todo list for multi-step work.
3. **Confirm alignment** — if the plan doesn't match expectations, discuss and adjust before proceeding.
4. Only begin implementation after the plan is aligned.

> Skip summarize/confirm for trivial single-step tasks (e.g., "fix this typo", "rename this variable").

## 4. Project-Doc Source of Truth

- Keep instructions and rules generic. For project-specific decisions, read the relevant docs under `docs/project-docs/`.
- Start with `docs/project-docs/TEMPLATE_CONTRACT.md` to discover the required document set and the stable sections agents should rely on.
- Prefer direct project-doc reads over hardcoding stack names, commands, or framework rules inside instructions or rules.
- If a required project doc is missing and the task depends on it, create or update that doc rather than burying the missing context inside a rule or skill.

## 5. Quality Gate — Double/Triple Check Before Finishing

Before marking a task complete:
- Re-read generated/modified code for correctness, idiomatic style, and edge cases.
- Run the narrowest applicable verification documented in `docs/project-docs/TESTING.md`.
- Use `docs/project-docs/ARCHITECTURE.md`, `docs/project-docs/QUICK_REFERENCE.md`, and affected feature docs to resolve the exact commands, frameworks, boundaries, and expected quality gates.
- If no executable check exists for the repository's current state, perform the strongest available documentation or consistency review and state that limitation explicitly.
- Check for broken imports, boundary violations, missing error handling at system boundaries, and OWASP Top 10 risks where relevant.
- If a check fails, fix it before declaring done — never leave known issues.

## 6. Documentation Sync — Always Update Relevant Docs

After completing any code change:
- Identify relevant documentation files: API contracts, workflow docs, test docs, changelogs, README, and any relevant documentation.
- If the documentation is exist and out of sync with the actual code, **Update it**.
- If relevant docs don't exist and the change warrants it, create them.
- But ask first briefly: "This change impacts documentation — want me to update/create the relevant docs too?"
- Treat `docs/project-docs/` as the project-specific source of truth and use `docs/project-docs/TEMPLATE_CONTRACT.md` to determine which docs are required or optional for the repo.
- For this workspace: check `docs/project-docs/` (PROJECT, ARCHITECTURE, TESTING, STATUS, CHANGELOG, QUICK_REFERENCE, phases/), `docs/project-docs/guidelines/`, and `docs/vibes/` subfolders.
- Goal: code and documentation are always in sync. One without the other is incomplete.

## 7. Documentation Structure

The canonical `docs/` layout for a template-enabled project:

```
docs/
├── project-docs/
│   ├── TEMPLATE_CONTRACT.md # Required doc set + stable headings for agents
│   ├── PROJECT.md           # Product vision, goals, scope
│   ├── ARCHITECTURE.md      # Tech stack + architecture decisions
│   ├── TESTING.md           # Verification matrix, commands, quality gates
│   ├── FEATURE_INVENTORY.md # Feature list with priorities (optional by project type)
│   ├── STATUS.md            # Full task list (source of truth)
│   ├── CHANGELOG.md         # What has been built (optional if tracked elsewhere)
│   ├── QUICK_REFERENCE.md   # Commands, patterns, cheatsheet
│   ├── GETTING_STARTED.md   # Setup guide for the project (optional for internal repos)
│   ├── phases/
│   │   ├── INDEX.md         # Epic registry with status
│   │   ├── EPIC1_*.md       # Per-epic task detail
│   │   └── EPIC2_*.md
│   └── guidelines/
│       ├── API.md           # Optional API / integration contract
│       ├── BRAND.md
│       ├── APP_FLOW.md
│       ├── DATA_MODEL.md
│       ├── AI_RULES.md
│       └── UIUX.md
├── test-report/             # Test coverage reports (gitignored content)
└── vibes/
    ├── prompt/              # Prompt files for AI-assisted workflows
    └── skills/              # Skill definitions
```

- Never create flat `.md` files directly under `docs/` root — always place in the correct subfolder.
- `TEMPLATE_CONTRACT.md` defines which docs are mandatory, which are optional, and which sections should remain stable for agents to read.
- `TESTING.md` is the first stop for deciding how to verify a change.
- When adding a new epic, add both the `EPIC{N}_*.md` file and update `phases/INDEX.md`.
- `STATUS.md` is the full task list; individual epic files in `phases/` are extracted for focused work.

---

## 8. Proactive Improvement Mindset

- After completing what was asked, you have the **freedom to identify improvements** beyond the literal scope.
- Surface them as optional suggestions, never apply unrequested changes silently.
- Format: "Task complete. Noticed X could be improved — want me to handle that too?"
- Limit to 1–2 high-value suggestions per task. Avoid suggestion overload.
