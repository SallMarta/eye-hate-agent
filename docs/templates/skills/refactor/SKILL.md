---
name: "refactor"
description: "Project-aware expert-role for code refactoring. Reads project docs first, enforces TDD, and restructures code to reduce cyclomatic complexity and improve maintainability without altering external behavior."
argument-hint: "Describe the function, file, or module to refactor"
---

# Refactor

Produces a project-aware, expert-level refactoring plan and execution by reading the repository's project docs first, then applying strict structural improvements.

This skill is reusable across any programming language. It focuses on reducing technical debt, splitting monolithic structures, and improving testability. It should not assume a specific framework or design pattern until the project docs confirm them.

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/project-docs/foundation/architecture.md` | Defines the acceptable patterns, boundaries, and coupling rules for the project. |
| `docs/project-docs/technical/testing.md` | Defines the required testing frameworks and test coverage expectations. |
| `docs/project-docs/technical-guidelines/index.md` | Provides language-specific linting, style, or idiom rules. |

If the repository lacks the testing docs needed for safe refactoring, call that out and create or update the missing docs instead of refactoring blindly.

## When to Use

Use this skill when tasked with improving existing code without changing its feature set.

| Boundary type | Typical artifacts |
| --- | --- |
| Function / Method | Reducing cyclomatic complexity, extracting pure functions, eliminating nested conditionals. |
| Class / Module | Applying SOLID principles, injecting dependencies, splitting god classes. |
| File / Directory | Reorganizing imports, breaking large files into logical cohesive units. |
| Naming & Style | Standardizing variable names, updating to project idioms. |

## Procedure

### Step 1 — Identify the Architecture Constraints
Extract from `architecture.md`:
- Domain boundaries and allowed dependency directions.
- Prescribed patterns (e.g., Use Repositories for data access, use Services for business logic).

### Step 2 — Read Existing Tests
Extract from the codebase:
- Are there existing unit or integration tests for the target code?
- If NO: **Stop.** You must write tests to establish a baseline before changing any structural code.

### Step 3 — Analyze the Target Code
Evaluate the target code for:
- High cyclomatic complexity (too many if/else branches).
- Side effects hidden within otherwise pure logic.
- Tight coupling to infrastructure or external dependencies.
- Duplicated logic.

### Step 4 — Formulate the Refactoring Plan
Design the new structure:
- Extract pure functions for testability.
- Introduce dependency injection where hardcoded dependencies exist.
- Replace complex conditionals with polymorphism, lookup tables, or guard clauses.

### Step 5 — Test-Driven Execution
1. Ensure the baseline tests pass.
2. Apply the refactoring incrementally.
3. Continuously verify that tests pass after each structural change.

### Step 6 — Preserve Documentation
Ensure all existing comments and docstrings are preserved unless the new structure explicitly invalidates them. In that case, update them accurately.

## Quality Check

Use this checklist when reviewing refactored code:

- Has the external API or behavior of the function/module changed? (It shouldn't).
- Is the new code easier to unit test?
- Were dependency rules from `architecture.md` respected?
- Were original comments preserved or updated?
- Did the refactoring introduce any new dependencies?

## Anti-Pattern

- Refactoring code without baseline tests.
- Over-engineering (e.g., introducing a complex Factory pattern for a simple two-branch conditional).
- Changing feature behavior or fixing bugs silently during a refactor.
- Silently deleting developer comments or context notes.

## Output Contract

When using this skill, the output should include:

1. the project docs consulted
2. the identified code smells / issues in the target code
3. the baseline testing strategy used
4. the step-by-step refactoring changes applied
5. verification that all external behavior remains identical

## Neutral Prompt Shape
`@agent use refactor on [Target Function/File] focusing on [Specific Architecture/Simplicity Goal].`

## Example Prompt
- "Refactor this god class into smaller cohesive services."
- "Reduce the cyclomatic complexity of this function."
- "Reorganize the imports and structure of this legacy file."