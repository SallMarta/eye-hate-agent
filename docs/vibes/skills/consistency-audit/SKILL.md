---
name: consistency-audit
description: "Expert-role audit of repository drift across project docs, rules, skills, reusable prompts, workflows, and quick-reference material. Use when checking whether the template system still agrees with itself or when preparing cleanup after major changes."
argument-hint: "Describe the scope to audit: full repository, docs only, reusable prompt system, rules and skills, or a specific workstream"
---

# Consistency Audit — Project-Aware

Performs an **expert repository-wide drift audit** to find contradictions, stale summaries, duplicated ownership, and historical artifacts that should be classified rather than confused with active truth.

This skill is the reusable complement to the consistency-audit reusable prompt. Use it when the task is analytical rather than generative.

---

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/eyehateagent-contract.md` | Ownership map and canonical doc contract |
| `docs/project-docs/PROJECT.md` | Active project identity and scope |
| `docs/project-docs/ARCHITECTURE.md` | Active stack and architecture truth |
| `docs/project-docs/TESTING.md` | Active verification truth |
| `docs/project-docs/STATUS.md` | Active roadmap and current-state truth |
| `docs/project-docs/QUICK_REFERENCE.md` | Summary layer likely to drift if not refreshed |
| Rule / instruction files | Automatic behavior layer |
| Skills and reusable prompts | Reusable procedure and generation layers |
| Workflow, handoff, and historical docs | Potentially valid references or stale artifacts |

---

## When To Use

| Trigger | Example request |
| --- | --- |
| Full-repo review | "Audit the whole repository for drift after a cleanup pass" |
| Documentation review | "Check whether project docs and reusable prompts still agree" |
| Template maintenance | "Audit rules and skills after changing the contract" |
| Handoff preparation | "Find contradictions before handing this repo to another maintainer" |

Use `full-verification` instead when the user asks for a broad verification entry point and repository drift is only one possible verification path.

Typical audit targets include:

Check for disagreement across:

- project identity and naming
- stack and dependency choices
- architecture and dependency rules
- test commands and quality gates
- roadmap, phase, or epic naming
- API or integration ownership
- reusable prompt outputs vs project-doc contract
- rule expectations vs documented workflow

---

## Procedure

### Step 1 — Establish the source of truth

Use the project docs defined by `docs/eyehateagent-contract.md` as the default source of truth unless the repository explicitly states otherwise.

### Step 2 — Compare dependent layers

Compare the source-of-truth docs against:

- rule files
- skills
- reusable prompts
- workflow docs
- quick references and summaries

### Step 3 — Classify each mismatch

Every mismatch should be classified as one of:

- contradiction
- stale summary
- duplicated ownership
- historical artifact
- optional module not active in the current repo

### Step 4 — Assess impact

Determine whether the mismatch affects:

- implementation safety
- automation behavior
- reusable prompt outputs
- onboarding clarity
- release or verification confidence

### Step 5 — Recommend ownership-level fixes

Recommend which owning file or layer should be updated. Do not spread the same fact across more files than necessary.

---

## Output Contract

For each finding, include:

1. severity
2. fact in conflict
3. source-of-truth location
4. conflicting location
5. classification
6. why it matters
7. recommended owner to update

End with:

1. highest-priority drift items
2. acceptable historical artifacts that should not be treated as blockers

---

## Quality Checks

- Do not confuse reference material with active truth
- Do not propose fixing both sides of a contradiction when one side clearly owns the fact
- Distinguish blocking contradictions from harmless historical leftovers
- Keep the audit actionable, not just descriptive

---

## Anti-Patterns

- Treating summary files as the owner when the contract defines a different source of truth
- Reporting drift without naming the owning file or layer that should change
- Escalating every historical artifact as a blocker instead of classifying it correctly
- Duplicating the same fact across multiple layers as a fix for drift

---

## Natural Prompt Shapes

- "Check whether the docs and repository still agree."
- "Audit this repo for drift after the latest changes."
- "Find contradictions across docs, rules, skills, and prompts."
- "Tell me which mismatches are real blockers versus harmless leftovers."

---

## Example Requests

- "Audit the repository for contradictions after the latest template changes"
- "Check whether reusable prompts and skills still match the contract"
- "Find stale summaries in the project docs"
- "Classify which mismatches are blockers versus historical artifacts"
