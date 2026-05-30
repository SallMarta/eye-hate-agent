# Testing & Verification

Last update: 2026-05-30

Status: Live

---

## 1. Description
This document outlines the testing strategies and validation loops for the Eye Hate Agent (EHA) project. EHA is tested primarily via end-to-end (E2E) generation validation.

## 2. Important
Since EHA is a meta-tool generating files, the primary validation is ensuring the generated folder structures map 1:1 with the expected template formats.

## 3. Table of Contents
1. Verification Policy & Objectives
2. Verification Matrix & Coverage
3. Test Layers & Environments
4. Commands & CI Gates
5. Naming & File Conventions
6. Manual Checks & Fallbacks

## 4. Scope
Covers local CLI tests, template validity checks, and NPM package testing.

## 5. Goals
Guarantee that `eha init` and `eha remove` execute deterministically and do not corrupt the target repository.

## 6. Non Goals
Unit testing individual node modules. We prioritize E2E integration testing.

## 7. Verification Policy & Objectives
We verify EHA by running it in isolated "dummy" directories. The objective is to prove that running `eha init` produces exactly the expected number of `.agents/` files, and `eha remove` leaves no trace.

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
CI currently uses GitHub Actions (`publish.yml`) to automatically publish. There is no automated test suite gate yet; Sulyadee executes the dummy loop locally before merging.

## 11. Naming & File Conventions
No automated test files (`*.spec.js`) exist. The engine is small enough that manual E2E validation is sufficient.

## 12. Manual Checks & Fallbacks
If the CLI prompt fails, manually review `src/engine/runtime-adapters.js` to ensure the adapter string processing didn't drop characters.

## 13. Success Metrics
- 0 generation failures for supported IDEs (Cursor, Copilot, Antigravity, Claude).

## 14. Related Documents
- [Workflow](../foundation/workflow.md) - Day-to-day development loop.

## 15. Open Questions
None.
