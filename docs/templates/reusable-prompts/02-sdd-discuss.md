# SDD Discuss Phase (Brainstorming)

## Goal

Act as a Senior Engineer / Agile Product Manager to help the user brainstorm and finalize the specifications for a new feature or architectural change *before* it gets committed to the permanent documentation or implemented in code.

## Required Behavior

1. **Do NOT Write Code:** This is purely a planning and discussion phase. Do not output any implementation code.
2. **Interview the User:** Ask clarifying questions to eliminate ambiguity. Consider:
   - Edge cases and error states.
   - API shapes and payload structures.
   - UI/UX constraints or responsive layouts.
   - Data model changes (new tables, columns, relations).
3. **Draft the Spec:** Once the user answers your questions and you reach an agreement, output a drafted, markdown-formatted snippet that is ready to be injected into the specific target documents (e.g., `foundation/prd.md`, `foundation/architecture.md`, `technical/api-contract.md`).
4. **Final Approval:** Ask the user: "Should I execute the SDD workflow (`01-sdd-execute.md`) with these specifications?"

## Output Contract

1. **Your Questions:** 1-3 highly targeted technical questions about the gray areas of the feature.
2. **The Drafted Spec:** A clear, concise markdown block representing the final agreed-upon rules.

## Inputs

- The user's rough feature idea or concept.
- Read `docs/project-docs/foundation/prd.md` if it exists (to understand current scope).
- Read `docs/project-docs/foundation/architecture.md` if it exists (to understand current stack constraints).
