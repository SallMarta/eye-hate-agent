---
description: "EHA workflow - help"
---

# EHA Help & Tutorial

This is your interactive guide to using Eye Hate Agent (EHA).

## 1. Overview
Eye Hate Agent (EHA) standardizes human-agent collaboration through a unified Spec-Driven Development (SDD) contract, structured workflows, and specialist skills.

## 2. The 4-Layer Taxonomy
All project documentation is structured under a predictable 4-layer taxonomy:
- `docs/project-docs/foundation/` — PRD, Phases, Status, Changelog
- `docs/project-docs/operations/` — CI/CD, Deployment, Runbooks
- `docs/project-docs/development/` — Testing, Database, Architecture, API-Contract, UI-UX
- `docs/project-docs/technical-guidelines/` — Stable project/language/linting guidelines

## 3. Interactive Workflow Commands
Trigger these commands inside your chat window to coordinate development:

| Trigger Command | Purpose | When to Use |
| :--- | :--- | :--- |
| `/eha-bootstrap` | Initializes a brand-new documentation set | Run in repos with **no existing docs**. For truly empty repos, it will guide you to `/eha-discuss` first. |
| `/eha-refresh` | Synchronizes and migrates project documentation | Run in **active projects** to sync code with docs. |
| `/sdd-discuss` | Brainstorm specifications and API contracts | Run **before coding** to align specs. |
| `/sdd-execute` | Spec-driven code generation via TDD | Run **during implementation** to write tests/code. |

## 4. Specialist Skills
Invoke skills directly in your prompts (e.g. `use eha-api-design`):
- `eha-system-analysis` — Inspect architecture and codebase logic
- `eha-api-design` — Plan or refactor REST/GraphQL/gRPC APIs
- `eha-db-schema-design` — Design schemas and migrations
- `eha-ui-ux-design` / `eha-wireframing` — UI/UX wireframes and styling systems
- `eha-code-audit` — Multi-layered verification and codebase scanning
- `eha-parity-audit` — Automated drift analysis
- `eha-security-audit` — Dependency scanning and threat modeling
- `eha-system-tester` — Rigorous testing plans and case design
- `eha-devops-ci-cd` — Build pipeline configurations
- `eha-observability` — Logs, metrics, trace instrumentation, and error handling
- `eha-refactor` — Technical debt cleanup and optimization

## 5. Quick Start Instructions
If starting a new feature:
1. Run `/sdd-discuss` to brainstorm specs.
2. Update project docs to reflect the spec.
3. Run `/sdd-execute` to execute code via TDD.
4. Maintain `changelog.md` and `status.md`.

---

## 6. Strict Output Contract (Token Economy)
When the user triggers this command, you **MUST** adhere to the following rules to conserve maximum tokens:
1. **Ultra-Concision:** Respond immediately with extremely short, direct answers. Do not write introductory filler (no "Sure, let's look at...", "Here is...", or greetings).
2. **Minimal Text:** Keep all explanations under 5 words per item. Rely strictly on the tables and bullet lists above.
3. **Redirection:** Conclude the output in exactly one short question: "Which workflow would you like to run next?"
