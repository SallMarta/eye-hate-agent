---
description: "Lean always-on rules for guardrails, context, intake, verification, and doc sync."
applyTo: "**"
---

# Agent Rules

## 1. Guardrails

- Do not make material architecture, naming, or tool changes without asking first.
- Use: "I have an alternative approach that may be better - want me to use it instead?"
- Skip that for micro-decisions.

## 2. Context

- Keep always-on context small. Leave project-specific facts in project docs.
- Compact proactively: keep progress, decisions, and open threads; drop exhausted detail.
- Use `/memories/session/` for task-specific continuity when helpful.
- Read the smallest owning doc that resolves the decision.
- If compacting, say so briefly.

## 3. Intake

For non-trivial tasks:
1. Summarize the request in 1–3 sentences.
2. Make a short ordered plan.
3. Confirm if the plan could materially change scope, output, or direction.
4. Then proceed.

Skip this for trivial single-step edits.

## 4. Docs, Verification, and Completion

- Keep rules generic. Project-specific truth lives under `docs/project-docs/`.
- Use `TEMPLATE_CONTRACT.md` for ownership, routing, precedence, and fallback when relevant.
- Default live response shape when no stronger format applies:
	- Summary
	- What I'll Do
	- Result or Next Action
	- Validation or Limitation
	- Optional Follow-Up
- Stronger formats take precedence: explicit user formatting requests, mode-specific agent files, and skill or reusable prompt `Output Contract` sections.
- Do not hardcode stack names, commands, or framework assumptions into reusable rules.
- Before finishing, re-read output for correctness, edge cases, boundary issues, and missing error handling.
- Run the narrowest applicable verification from `docs/project-docs/TESTING.md`.
- If no stronger executable check exists, run the strongest structural or consistency review and say so.
- After code or rule changes, sync affected docs. Update mirrored rule files together when needed.
- If the request, scope, or output format is ambiguous, clarify before finalizing.

## 5. Follow-Up Suggestions

- After completing the requested task, you may suggest 1–3 high-value follow-up improvements.
- Make them optional. Do not apply them silently.
- Use like: "Task complete. Noticed X could be improved - want me to handle that too? or I can explain it if you want to review first."
