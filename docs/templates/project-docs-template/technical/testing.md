# Testing & Verification

Last update: YYYY-MM-DD

Status: [Proposed | Draft | Live | Deprecated | Archived]

---

## 1. Description
Briefly describe the purpose of this document and what it contains.

## 2. Important
Notes of important findings or critical constraints. Can be empty.

## 3. Table of Contents
TOC goes here.

## 4. Scope
The boundaries of what this document covers.

## 5. Goals
What we aim to achieve with this specific document.

## 6. Non Goals
What is explicitly excluded from the scope of this document.

## 7. Verification Policy & Objectives
Define the overarching philosophy for how this repository chooses, runs, and reports testing. What are we trying to prove with our test suite?

## 8. Verification Matrix & Coverage
The required types of testing (Blackbox, Unit, Security) mapping against expected coverage metrics (e.g., 85% branch coverage).

| Change type | Preferred validation | Fallback |
| --- | --- | --- |
| Code change | TBD | TBD |
| Documentation change | TBD | TBD |

## 9. Test Layers & Environments
Detail the exact split of Unit, Component, Integration, and E2E tests. Include the required infrastructure, mocks, and seed data needed to run them.

## 10. Commands & CI Gates
The exact terminal commands for linting and testing. Outline the required pre-merge CI checks (blocking vs advisory).

## 11. Naming & File Conventions
Where tests live, how test files are named (e.g., `*.spec.ts`), and how fixtures are stored.

## 12. Manual Checks & Fallbacks
Necessary manual testing steps and fallback procedures for human verification when automation is impossible.

## 13. Success Metrics
How we measure if the goals of this document are achieved.

## 14. Related Documents
[Link to related document](path) - Short brief note about why it's related.

## 15. Open Questions
Any unresolved questions or assumptions. Can be empty.
