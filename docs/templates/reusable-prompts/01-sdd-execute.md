# Spec-Driven Development (SDD) Execute

## Goal

Translate a newly updated project specification into tested, working code by following a strict Test-Driven Development (TDD) and Spec-Driven Development (SDD) lifecycle.

## Required Behavior

1. **Read the Specs:** First, read `docs/project-docs/foundation/prd.md` and `docs/project-docs/foundation/architecture.md`.
2. **Read Technical Guidelines (conditional):** If `docs/project-docs/technical-guidelines/index.md` exists, read it and all active guideline files listed in its registry. Implementation code and tests must comply with these rules. If the file does not exist, skip this step.
3. **Verify Spec Completeness:** Check if the user's requested feature is documented in the specs.
   - If the feature is NOT documented, **do not write code yet**. Instead, immediately draft the necessary additions for `foundation/prd.md` and `foundation/architecture.md` and present them to the user. Ask the user: "Should I add these specifications to the project docs and then proceed with implementation?"
4. **Generate Tests (TDD):** If the spec is present, author the test cases that validate the acceptance criteria.
5. **Generate Code:** Write the implementation code to pass the generated tests.
6. **Verify Completeness:** Ensure the code passes the tests and fulfills the architectural rules defined in `foundation/architecture.md`.
7. **Identify Guideline Candidates:** If the implementation establishes or reinforces a durable cross-cutting convention (e.g., error response shape, logging pattern, naming scheme, authentication flow), note it as a candidate for `technical-guidelines/` in the Output Contract. Do not create guideline files — only surface the observation so the user can decide via a Refresh or Bootstrap workflow.

## Output Contract

1. **Spec Mapping:** A brief list linking the code changes you are about to make to the specific lines/sections in the project docs.
2. **Tests Authored:** The tests written to fulfill the spec.
3. **Code Authored:** The implementation code.
4. **Validation:** A summary of how the implementation satisfies the initial specification.
5. **Technical Guidelines Notes:** Any durable cross-cutting conventions discovered or reinforced during implementation that may warrant formalization as technical guidelines (or "None identified").

## Final Pass

- Does the implementation violate any constraints in `foundation/architecture.md`?
- Does the implementation comply with all active guidelines in `technical-guidelines/` (when present)?
- Are there any tests missing for the acceptance criteria listed in `foundation/prd.md`?
- Did I write code for a feature that wasn't in the spec? (If yes, revert it).

## Inputs

- The user's prompt requesting the execution of a feature.
- `docs/project-docs/foundation/prd.md`
- `docs/project-docs/foundation/architecture.md`
- `docs/project-docs/development/testing.md`
- `docs/project-docs/technical-guidelines/index.md` (conditional — read when present)
