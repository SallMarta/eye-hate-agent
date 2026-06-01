# Feature Inventory

Last update: 2026-05-30

Status: Live

---

## 1. Description
This document catalogs the core capabilities, commands, and active feature set of the Eye Hate Agent (EHA) CLI tool and its engine.

## 2. Important
This inventory must be updated when a new agent adapter is added or a new major workflow is introduced.

## 3. Table of Contents
- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Goals](#5-goals)
- [6. Non Goals](#6-non-goals)
- [7. Feature Summary](#7-feature-summary)
- [8. Core Functions (Epic-level)](#8-core-functions-epic-level)
- [9. Sub-Functions (Task-level)](#9-sub-functions-task-level)
- [10. Deprecated / Removed Features](#10-deprecated--removed-features)
- [11. Success Metrics](#11-success-metrics)
- [12. Related Documents](#12-related-documents)
- [13. Open Questions](#13-open-questions)

## 4. Scope
Covers CLI commands, runtime adapters, and template capabilities.

## 5. Goals
Provide a single, comprehensive list of what EHA can do.

## 6. Non Goals
Does not document how the features are implemented (see `architecture.md`).

## 7. Feature Summary
EHA provides an interactive CLI that generates AI-specific instruction files into target repositories using a set of pre-defined Markdown templates (skills and workflows).

## 8. Core Functions (Epic-level)
- **CLI Orchestrator:** The `eha` command-line interface.
- **Template Engine:** Reads and processes `docs/templates/`.
- **Runtime Adapters:** Formats the output for specific agents (e.g., Claude, GitHub Copilot, Antigravity).

## 9. Sub-Functions (Task-level)
- `eha init`: Prompts user to select an agent, generates files, and saves manifest.
- `eha remove`: Reads manifest, deletes generated files, and uninstalls cleanly.
- `eha doctor`: Validates the generated files against the manifest.
- **Auto-Update**: Prompts regeneration if installed version mismatches manifest version.
- **Domain Skills:** Structured taxonomy providing skills across `architecture`, `engineering`, `auditing`, and `operations`.

## 10. Deprecated / Removed Features
- **Gemini Adapter:** Completely replaced by `antigravity` adapter in v1.0.3.
- **Project Elevation Skills:** Removed in favor of strict domain architectures.
- **Guided/Automated Modes:** Removed to favor pure CLI initialization.

## 11. Success Metrics
Features are accurately cataloged and correspond 1:1 with engine implementation.

## 12. Related Documents
- [Architecture](architecture.md) - Deep dive into how these features are built.

## 13. Open Questions
None.
