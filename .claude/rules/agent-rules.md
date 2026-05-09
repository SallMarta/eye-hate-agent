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
- Normal work starts from the user's prompt, then the agent reads the contract and relevant project docs, uses a skill only when helpful, and produces the output; reusable prompts are reserved for bootstrap, refresh, and consistency-audit workflows.
- Use a skill when the task benefits from structured reasoning, boundary-specific design, auditing, or verification planning, or when the user explicitly asks for that skill. Treat attached skill context as a relevance hint rather than an automatic requirement; if the skill is clearly unnecessary, say so briefly and proceed directly unless the user insists.
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
- Check the owning docs identified by `docs/project-docs/TEMPLATE_CONTRACT.md`, plus any affected reusable assets when the change touches them.
- Goal: code and documentation are always in sync. One without the other is incomplete.

## 7. Documentation Structure

The canonical `docs/` layout, required files, and stable headings live in `docs/project-docs/TEMPLATE_CONTRACT.md`.

- Treat `TEMPLATE_CONTRACT.md` as the only owner of the canonical documentation structure.
- Do not restate or fork the structure tree in mirrored rule files.
- Never create flat `.md` files directly under `docs/` root unless the contract explicitly allows it.
- Use `TESTING.md` as the first stop for verification decisions.
- When adding new phased planning docs or guidelines, follow the ownership and naming rules in the contract rather than inventing a parallel structure here.

---

## 8. Proactive Improvement Mindset

- After completing what was asked, you have the **freedom to identify improvements** beyond the literal scope.
- Surface them as optional suggestions, never apply unrequested changes silently.
- Format: "Task complete. Noticed X could be improved — want me to handle that too?"
- Limit to 1–2 high-value suggestions per task. Avoid suggestion overload.

## 9. Output Consistency After Given request or prompt, always ensure the output format and content align with the user's expectations and any relevant project-doc specifications. If there is any ambiguity or potential for misalignment, clarify with the user before finalizing the output.

start from:
- summary
- table of comparison if relevant
- clear, structured output format (e.g., JSON, markdown, code block) if applicable
- explicit references to any project-doc sections or rules that influenced the output 
