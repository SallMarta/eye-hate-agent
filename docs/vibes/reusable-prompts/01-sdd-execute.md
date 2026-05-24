# Spec-Driven Development (SDD) Execute

## Goal

Translate a newly updated project specification into tested, working code by following a strict Test-Driven Development (TDD) and Spec-Driven Development (SDD) lifecycle.

## Required Behavior

1. **Read the Specs:** First, read `docs/project-docs/foundation/prd.md` and `docs/project-docs/foundation/architecture.md`.
2. **Verify Spec Completeness:** Check if the user's requested feature is documented in the specs.
   - If the feature is NOT documented, **do not write code yet**. Instead, immediately draft the necessary additions for `foundation/prd.md` and `foundation/architecture.md` and present them to the user. Ask the user: "Should I add these specifications to the project docs and then proceed with implementation?"
3. **Generate Tests (TDD):** If the spec is present, author the test cases that validate the acceptance criteria.
4. **Generate Code:** Write the implementation code to pass the generated tests.
5. **Verify Completeness:** Ensure the code passes the tests and fulfills the architectural rules defined in `foundation/architecture.md`.

## Output Contract

1. **Spec Mapping:** A brief list linking the code changes you are about to make to the specific lines/sections in the project docs.
2. **Tests Authored:** The tests written to fulfill the spec.
3. **Code Authored:** The implementation code.
4. **Validation:** A summary of how the implementation satisfies the initial specification.

## Final Pass

- Does the implementation violate any constraints in `foundation/architecture.md`?
- Are there any tests missing for the acceptance criteria listed in `foundation/prd.md`?
- Did I write code for a feature that wasn't in the spec? (If yes, revert it).

## Inputs

- The user's prompt requesting the execution of a feature.
- `docs/project-docs/foundation/prd.md`
- `docs/project-docs/foundation/architecture.md`
- `docs/project-docs/technical/testing.md`
