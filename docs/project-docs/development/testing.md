# Testing & Verification

Last update: 2026-05-30

Status: Live

---

## 1. Description
This document outlines the testing strategies and validation loops for the Eye Hate Agent (EHA) project. EHA is tested primarily via end-to-end (E2E) generation validation.

## 2. Important
Since EHA is a meta-tool generating files, the primary validation is ensuring the generated folder structures map 1:1 with the expected template formats without breaking markdown formatting.

## 3. Table of Contents
- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Goals](#5-goals)
- [6. Non Goals](#6-non-goals)
- [7. Verification Policy & Objectives](#7-verification-policy--objectives)
- [8. Verification Matrix & Coverage](#8-verification-matrix--coverage)
- [9. Test Layers & Environments](#9-test-layers--environments)
- [10. Commands & CI Gates](#10-commands--ci-gates)
- [11. Naming & File Conventions](#11-naming--file-conventions)
- [12. Manual Checks & Fallbacks](#12-manual-checks--fallbacks)
- [13. Success Metrics](#13-success-metrics)
- [14. Related Documents](#14-related-documents)
- [15. Open Questions](#15-open-questions)

## 4. Scope
Covers local CLI tests, template validity checks, and NPM package testing.

## 5. Goals
Guarantee that `eha init`, `eha doctor`, and `eha remove` execute deterministically and do not corrupt the target repository.

## 6. Non Goals
Unit testing individual node modules. We prioritize E2E integration testing over unit tests for this CLI tool.

## 7. Verification Policy & Objectives
We verify EHA by running it in isolated "dummy" directories. The objective is to prove that running `eha init` produces exactly the expected number of files (e.g., in `.agents/`), and `eha remove` leaves no trace.

## 8. Verification Matrix & Coverage
| Change type | Preferred validation | Fallback |
| --- | --- | --- |
| CLI logic change | E2E loop in dummy directory | Manual review |
| Template changes | `eha init` test | None |
| Registry changes | Validate registry arrays | None |

## 9. Test Layers & Environments
EHA uses a manual E2E loop:
1. `mkdir dummy-eha-test`
2. `cd dummy-eha-test`
3. `echo '{"name":"dummy"}' > package.json`
4. `node ../bin/eha.js init antigravity`
5. Verify `.agents/` and `.eha/` are generated perfectly.
6. `node ../bin/eha.js remove`
7. Verify clean state.

## 10. Commands & CI Gates
CI uses GitHub Actions (`publish.yml`) to automatically run the automated test suite via `npm test` before any package is published.

## 11. Naming & File Conventions
Automated tests are located in the `test/` directory (e.g., `test/engine.test.js`). Run `npm test` to execute the suite.

## 12. Manual Checks & Fallbacks
If the CLI prompt fails, manually review `src/engine/runtime-adapters.js` to ensure the adapter string processing didn't drop characters.

## 13. Success Metrics
- 0 generation failures for supported IDEs/CLI (Copilot, Antigravity, Claude, Gemini CLI).

## 14. Related Documents
- [Workflow](../foundation/workflow.md) - Day-to-day development loop.

## 15. Open Questions
None.
