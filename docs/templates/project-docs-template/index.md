# Project Docs Registry

Last update: 2026-06-01

Status: Live

---

## 1. Description
This index is the master registry and layout definition for all Spec-Driven Development (SDD) documentation within EHA-adopting repositories. It defines the universal stable headings schema and active document types.

## 2. Important
All documentation generated under `docs/project-docs/` (except `index.md`, `getting-started.md`, and guideline registries) must strictly implement the Universal Stable Headings schema and incorporate the unique domain-specific headings defined below.

## 3. Table of Contents
- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Goals](#5-goals)
- [6. Non Goals](#6-non-goals)
- [7. Universal Stable Headings](#7-universal-stable-headings)
- [8. Active Doc Type Registry](#8-active-doc-type-registry)
- [9. Domain-Specific Headings Catalog](#9-domain-specific-headings-catalog)

## 4. Scope
Covers the structural headings, layers (`foundation/`, `development/`, `operations/`), and domain headings for EHA-governed repositories.

## 5. Goals
Eliminate template boilerplate redundancy, prevent cross-document drift, and lower agent context consumption.

## 6. Non Goals
Does not define technical guidelines rules (refer to `technical-guidelines/index.md`).

## 7. Universal Stable Headings
Every project document must include these numbered headings in this exact order. Domain-specific headings go after § 6 and before the closing set. Feel free to add extra domain-specific headings if needed to capture important project context.

### Opening Set:
1. Description
2. Important
3. Table of Contents
4. Scope
5. Goals
6. Non Goals

### Closing Set (always last, in this order):
- Success Metrics
- Related Documents
- Open Questions

## 8. Active Doc Type Registry

| Doc Type | Layer | Tier | Description |
| :--- | :--- | :--- | :--- |
| `getting-started.md` | Root | 1 | Orientation and local setup instructions. |
| `foundation/prd.md` | foundation | 1 | Vision statement, target personas, user journeys, features. |
| `foundation/architecture.md` | foundation | 1 | System architecture, tech stack, data flow, system flows, ADRs. |
| `foundation/status.md` | foundation | 1 | High-level status, recent wins, roadmap. |
| `foundation/workflow.md` | foundation | 1 | Branching, local development loop, PRs, code reviews. |
| `foundation/phases.md` | foundation | 3 | Overall timelines, features, sub-functions, sprints. (Merged phases + feature inventory) |
| `foundation/changelog.md` | foundation | 3 | Historical releases log. |
| `development/testing.md` | development | 2 | QA policy, matrices, environments, gates, naming standards. |
| `development/api-contract.md` | development | 2 | API authentication, endpoints, payloads, webhooks, rate limits. |
| `development/database.md` | development | 2 | Schema, entity models, indexes, migrations, data dictionary. |
| `development/ui-ux.md` | development | 2 | Design rules, wireframes, screen layouts, design tokens, responsive, a11y. |
| `development/internationalization.md` | development | 3 | Languages support, translations flow, currency, dates. |
| `operations/ci-cd.md` | operations | 2 | CI/CD pipelines, test gates, secrets handling, deploys. |
| `operations/production-runbook.md` | operations | 3 | Release procedures, rollback, environment config, smoke checks. |
| `operations/governance.md` | operations | 3 | Versioning policy, release cadence, code ownership rules. |
| `operations/security-compliance.md` | operations | 3 | Threat mitigation, RBAC, encryption, data privacy/retention, audit logging. (Merged security + compliance) |
| `operations/observability-error-handling.md` | operations | 3 | Log levels, error payloads, server fallbacks, alerts, dashboard metrics. (Merged observability + error handling) |
| `[custom-path].md` | [layer] | [tier] | [Add custom document templates here as needed to activate additional files] |

## 9. Domain-Specific Headings Catalog

This catalog defines the baseline required domain-specific headings for each document type. When documenting a repository, both developers and AI agents are **NOT** limited to this baseline catalog; they must actively append additional, custom domain-specific headings to capture the unique features, patterns, and architectural realities discovered in the codebase.

### `getting-started.md`
- Prerequisites
- First Steps
- Local Setup
- Verification
- Troubleshooting

### `foundation/prd.md`
- Vision Statement
- Target Personas
- Core Business Value
- User Journeys & App Flow
- Feature Workflows
- Functional Requirements
- Non-Functional Requirements
- Acceptance Criteria
- External Dependencies & Partners

### `foundation/architecture.md`
- Tech Stack Overview
- Architecture Pattern
- System Flow
- Data Flow
- Tools Integration
- Global Parameters and Constraints
- Architecture Decision Records

### `foundation/status.md`
- Current State
- Recent Accomplishments
- Upcoming Focus
- Key Metrics
- Roadmap
- Epics
- Risks/Blockers

### `foundation/workflow.md`
- Local Dev Loop
- Branching Strategy
- PR & Code Review
- Issue Tracking

### `foundation/phases.md`
- Overall Timeline
- Feature Summary & Core Functions
- Sub-Functions
- Deprecated Features
- Phase Registry
- Sprint Tracker

### `foundation/changelog.md`
- [Unreleased] (Added/Changed/Deprecated/Removed/Fixed/Security entries)

### `development/testing.md`
- Verification Policy & Objectives
- Verification Matrix & Coverage
- Test Layers & Environments
- Commands & CI Gates
- Naming & File Conventions
- Manual Checks & Fallbacks

### `development/api-contract.md`
- Base URL & Auth
- Request/Response Format
- Endpoints
- Webhooks
- Rate Limiting

### `development/database.md`
- DB Architecture
- Schema Definitions
- Indexes
- Migration Strategy
- Data Dictionary

### `development/ui-ux.md`
- Design Philosophy
- Design System
- Wireframing
- Screen Layouts
- Component Library
- Responsive
- Accessibility (A11y)
- Design Handoff

### `development/internationalization.md`
- Supported Languages
- Translation Workflow
- Fallback Locales
- Date & Currency

### `operations/ci-cd.md`
- Pipeline Architecture
- Build Steps
- Testing & Quality Gates
- Deployment Environments
- Secrets

### `operations/production-runbook.md`
- Environment Overview
- Prerequisites & Access
- Release Procedure
- Smoke Checks
- Rollback
- Operational Notes

### `operations/governance.md`
- Versioning Policy
- Release Cadence
- Code Ownership
- Contribution Guidelines

### `operations/security-compliance.md`
- Security Objectives & Threats
- Access Control & RBAC
- Data Encryption & Privacy
- Data Retention
- Audit Logging
- Compliance Audits & Legal Disclaimers

### `operations/observability-error-handling.md`
- Logging Strategy
- Standard Error Payloads
- Global Error Codes
- Client-Side Rules & Server Fallbacks
- Metrics & Dashboards
- Alerting Rules
- Distributed Tracing

### `[custom-path].md`
- [Add the custom document's unique domain headings here, e.g., "Caching Strategy" or "Performance Budgets"]