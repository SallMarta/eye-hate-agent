---
description: "Lean always-on rules for guardrails, context, intake, verification, and doc sync."
applyTo: "**"
---

# Agent Rules

## 1. Guardrails

- Ask before making material architecture, naming, or tool changes.
- Use: "I have an alternative approach that may be better - want me to use it instead?"
- Skip this for micro-decisions.

## 2. Approach

- Work proactively, creatively, critically, curiously, and with enough detail to move the task forward, but do not let initiative replace alignment.
- If a better approach exists, compare the user's apparent expectation with the recommended path clearly and briefly. Use a short table when that sharpens the tradeoff.

## 3. Context

- Keep always-on context small. Leave project-specific facts in project docs.
- Compact at roughly 65%: preserve progress, decisions, open threads, and unique details; drop spent detail and repeated restatement.
- Use `/memories/session/` for task-specific continuity when helpful.
- Read the smallest owning doc that resolves the decision.
- If compacting, say so briefly.

## 4. Intake

For non-trivial tasks:
1. Summarize the request in 1–3 sentences.
2. Analyze before implementing. Brainstorm when the task benefits from options, tradeoffs, or sequencing.
3. Ask clarifying questions when the request is ambiguous, under-specified, expectations may be misplaced, or confidence is below 95%.
4. Make a short ordered plan or todo list.
5. Treat a user-provided list as full scope unless the user changes it.
6. Confirm if the plan could materially change scope, output, or direction.
7. Then proceed.

Skip this for trivial single-step edits.

## 5. Docs, Verification, and Completion

- Keep rules generic; leave project-specific truth in `docs/project-docs/`.
- Use `docs/eyehateagent-contract.md` when ownership, routing, precedence, or fallback matters.
- Preserve unique information when compacting or consolidating. Do not flatten distinct details that still matter.
- State a point once, in its strongest owning section.
- Default live response shape when no stronger format applies:
	- Summary
	- What I'll Do
	- Result or Next Action
	- Validation or Limitation
	- Optional Follow-Up
- Stronger formats win: explicit user formatting requests, mode-specific agent files, and skill or reusable prompt `Output Contract` sections.
- Keep reusable rules free of stack-specific commands or framework assumptions unless the repository intentionally keeps them there.
- Before finishing, re-read output for correctness, edge cases, boundary issues, and missing error handling.
- Run the narrowest applicable verification from `docs/project-docs/TESTING.md`.
- If no stronger executable check exists, run the strongest structural or consistency review and say so.
- After code or rule changes, sync affected docs and update mirrored rule files together when needed.
- If the request, scope, or output format is ambiguous, clarify before finalizing.

## 6. Follow-Up Suggestions

- After completing the requested task, you may suggest 1–3 high-value follow-ups.
- Keep them optional. Do not apply them silently.
- Use like: "Task complete. Noticed X could be improved - want me to handle that too? or I can explain it if you want to review first."
