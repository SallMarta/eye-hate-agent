# Feature Inventory

Last update: 2026-05-30

Status: Live

---

## 1. Description
This document catalogs the core capabilities, commands, and active feature set of the Eye Hate Agent (EHA) CLI tool and its engine.

## 2. Important
This inventory must be updated when a new agent adapter is added or a new major workflow is introduced.

## 3. Table of Contents
1. Feature Summary
> 2. Core Functions
> 3. Sub-Functions
> 4. Deprecated Features

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
> - **Template Engine:** Reads and processes `docs/templates/`.
> - **Runtime Adapters:** Formats the output for specific agents (e.g., Cursor, GitHub Copilot, Antigravity).

## 9. Sub-Functions (Task-level)
- `eha init`: Prompts user to select an agent, generates files, and saves manifest.
> - `eha remove`: Reads manifest, deletes generated files, and uninstalls cleanly.
> - `eha update`: Prompts regeneration if installed version mismatches manifest version.
> - **Domain Skills:** `architecture`, `engineering`, `auditing`, `operations`.

## 10. Deprecated / Removed Features
- Gemini Adapter: Completely replaced by `antigravity` adapter in v1.0.3.
> - Project Elevation Skills: Removed in favor of strict domain architectures.

## 11. Success Metrics
Features are accurately cataloged and correspond 1:1 with engine implementation.

## 12. Related Documents
- [Architecture](architecture.md) - Deep dive into how these features are built.

## 13. Open Questions
None.
