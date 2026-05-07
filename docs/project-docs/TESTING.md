# Testing & Verification

Last updated: 2026-05-07

Status: Template baseline

---

## Verification Policy

This document tells agents and humans **how to choose, run, and report verification** for the current repository.

Rules and skills should consult this file before assuming a test framework, command, or quality gate.

### Default policy

1. Run the **narrowest applicable check** for the change.
2. Prefer executable validation when the repository provides it.
3. Fall back to documentation, structural, or consistency checks only when executable validation does not exist yet.
4. State clearly when a stronger check could not be run.

---

## Current Repository Mode

This repository is currently a **template and documentation workspace**.

At the time of writing:

- There is no buildable application source tree.
- There is no project-wide automated test command.
- Most validation for template work is currently structural rather than executable.

Because of that, changes in this repository should usually be validated through targeted documentation and consistency checks unless and until executable tooling is added.

---

## Template Verification Focus

When validating the template itself, prioritize checks that confirm ownership and structural consistency:

- required docs still match `TEMPLATE_CONTRACT.md`
- mirrored rule files still agree with each other
- skills still declare and read the correct project-doc inputs
- prompts still target the correct docs and output shapes
- no sample-project truth leaked into template-owned surfaces

---

## Verification Matrix

| Change type | Read first | Preferred validation | Fallback |
| --- | --- | --- | --- |
| Rule or instruction update | `TEMPLATE_CONTRACT.md`, this file | Structural review of changed rules; targeted search for stale stack-specific wording | Manual consistency review across mirrored rule files |
| Skill update | `TEMPLATE_CONTRACT.md`, this file, `ARCHITECTURE.md` if project-specific examples exist | Structural review of required project-doc inputs, procedure clarity, and stack neutrality | Manual example review |
| Prompt update | `TEMPLATE_CONTRACT.md`, prompt system docs | Validate prompt outputs, targets, and required project docs are explicit | Manual consistency review |
| Project-doc update | Owning doc + this file | Cross-check dependent docs and references | Manual review with targeted search |
| Code change in an adopted repo | This file + `ARCHITECTURE.md` + feature docs | Run the narrowest applicable command defined by the project | Manual review only if no executable command exists |

---

## Commands

### Template / docs-only repository

Use these checks when the repo does not yet contain executable project code:

| Goal | Method |
| --- | --- |
| Check for stale hardcoded stack commands | Targeted text search in changed rule, skill, or prompt files |
| Check mirrored rule files stay aligned | Compare both rule files after updates |
| Check a new doc matches the contract | Review headings and responsibilities against `TEMPLATE_CONTRACT.md` |
| Check cross-doc consistency | Search for outdated terminology or broken ownership assumptions |

### Adopted code repository

Every project that uses this template should replace this section with its own concrete commands, for example:

- lint / static analysis
- unit tests
- integration tests
- API contract checks
- database migration checks
- build or packaging checks

Do not leave this section generic once a repository has executable code.

---

## Test Layers / Check Types

When a repository using this template becomes executable, this file should define the available layers explicitly.

Typical categories include:

- Unit
- Component / module
- API / contract
- Persistence / migration
- Integration
- UI / end-to-end
- Security / policy checks
- Documentation / consistency checks

The exact layers depend on the project and must be documented here, not inferred from the rule files.

---

## Naming and File Conventions

Every adopted repository should document:

- where tests live
- how test files are named
- how fixtures are stored
- how mocks or stubs are chosen
- which frameworks or libraries are standard

If the repo has no executable code yet, this section may stay brief.

---

## CI / Release Gates

When CI exists, this file should document:

- required pre-merge checks
- required pre-release checks
- which failures are blocking
- which checks are advisory only

For this repository today, no CI-based executable gates are defined.

---

## Manual Checks

Manual checks are acceptable when executable checks do not exist, but they must be explicit.

Examples:

- review changed docs against `TEMPLATE_CONTRACT.md`
- check that rules and skills still point back to project docs
- confirm no duplicated ownership was introduced
- confirm new prompts specify both input contract and output targets

---

## Required Update Rule

If a repository adopts a new framework, test runner, CI workflow, or release gate, update this file before relying on that change operationally.

This file is the first stop for verification decisions.
