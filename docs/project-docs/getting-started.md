# Getting Started

Last update: 2026-06-01

Status: Live

---

## 1. Description
This document provides local environment setup and workspace orientation instructions for developers and AI agents working on the Eye Hate Agent (EHA) repository itself.

## 2. Important
Since EHA is a meta-tool (meaning EHA is used to maintain EHA), all code or registry modifications must be thoroughly tested against regressions using the test suite prior to committing.

## 3. Table of Contents
- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Goals](#5-goals)
- [6. Non Goals](#6-non-goals)
- [7. Prerequisites](#7-prerequisites)
- [8. First Steps](#8-first-steps)
- [9. Local Setup](#9-local-setup)
- [10. Verification](#10-verification)
- [11. Troubleshooting](#11-troubleshooting)
- [12. Success Metrics](#12-success-metrics)
- [13. Related Documents](#13-related-documents)
- [14. Open Questions](#14-open-questions)

## 4. Scope
Covers local environment setup, dependency management, CLI testing execution, and template/registry modification procedures.

## 5. Goals
Onboard developers or agent operators to quickly understand, run, and modify the EHA engine safely.

## 6. Non Goals
Does not cover production NPM deployment procedures (refer to `operations/ci-cd.md`).

## 7. Prerequisites
- **Node.js**: Version 18.0 or higher.
- **NPM**: Version 9.0 or higher.

## 8. First Steps
1. Clone or open the repository.
2. Install npm dependencies:
   ```bash
   npm install
   ```

## 9. Local Setup
EHA's CLI entry point is located at `bin/eha.js`. For local development, you do not need to globally install the package. Run the CLI directly via node:
```bash
node bin/eha.js doctor
```

## 10. Verification
EHA is armed with a native Node.js test runner suite. Validate all engine features, CLI exit codes, and registry synchronizations using:
```bash
npm test
```
See `technical/testing.md` for specific test strategies and verification matrices.

## 11. Troubleshooting
- **Error: "Could not find a project root"**
  - EHA requires a `package.json` or `.git` directory to resolve the repository root. Ensure you are running commands from within a directory mapped as a valid repository.

## 12. Success Metrics
- Workspace setup from zero to passing local test suite within 2 minutes.

## 13. Related Documents
- [Index](index.md) - The active document catalog.
- [Architecture](foundation/architecture.md) - Deeper layout details.
- [Testing](technical/testing.md) - Detailed E2E loop procedures.
- [CI/CD Configuration](operations/ci-cd.md) - Deployment automation pipeline.

## 14. Open Questions
None.
