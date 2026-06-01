---
name: "observability"
description: "Project-aware expert-role for system observability and SRE engineering. Reads project docs first, enforces structured logging, tracing context injection, PII masking rules, and actionable metric generation."
argument-hint: "Describe the component, service, or workflow to instrument with observability"
---

# Observability

Produces a **project-aware, expert-level observability implementation** by reading the repository's project docs first, then applying Site Reliability Engineering (SRE) standards for logging, metrics, and tracing.

This skill is reusable across logging frameworks (Winston, Logback, Zap), tracing standards (OpenTelemetry), and telemetry backends (Prometheus, Datadog, ELK).

It should **not** assume a specific logging library or metric format until the project docs confirm them.

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/project-docs/operations/observability.md` | Defines the required logging frameworks, metric standards, alerting thresholds, and tracing architectures. |
| `docs/project-docs/operations/compliance.md` | Defines PII (Personally Identifiable Information) masking and data retention rules. |
| `docs/project-docs/foundation/architecture.md` | Defines how context (e.g., request IDs, user IDs) flows across service boundaries. |

If the repository lacks the observability docs needed to understand the current stack, call that out and create or update the missing docs instead of inventing arbitrary logging formats.

## When to Use

Use this skill when tasked with improving system visibility or instrumenting code.

| Boundary type | Typical artifacts |
| --- | --- |
| Application Logging | Structured JSON logs, error stack traces, context injection. |
| Distributed Tracing | Spans, span contexts, OpenTelemetry configuration. |
| Application Metrics | Counters, gauges, histograms (e.g., request latency, error rates). |
| Alerting & Dashboards | Prometheus rules, Datadog monitors, Grafana dashboard JSON. |

## Procedure

### Step 1 — Extract Standards
Extract from `observability.md`:
- The approved logging library.
- Required log levels (e.g., `DEBUG` in dev, `INFO` in prod).
- Required structured fields (e.g., `requestId`, `tenantId`).

### Step 2 — Enforce Compliance and PII Masking
Extract from `compliance.md`:
- Identify fields that MUST NEVER be logged (e.g., passwords, credit card numbers, raw request bodies).
- Implement redaction/masking at the logger configuration level if possible.

### Step 3 — Instrument Tracing Context
When instrumenting a request flow:
- Ensure trace IDs (like `x-b3-traceid` or OpenTelemetry headers) are parsed at the entry point.
- Ensure the trace ID is attached to ALL subsequent log emissions and downstream HTTP calls.

### Step 4 — Define Actionable Metrics
Instead of generic logs, emit actionable metrics for:
- Throughput (requests per second).
- Error rates (4xx vs 5xx).
- Latency/Duration (histograms of processing time).

### Step 5 — Standardize Error Handling
When logging exceptions:
- Always log the full stack trace for unhandled errors.
- Do not swallow errors (e.g., `catch (e) { log(e.message) }` loses the stack trace).
- Ensure the log distinguishes between client errors (validation) and server errors (crashes).

## Quality Check

Use this checklist when reviewing observability code:

- Are logs structured (JSON) rather than plain text strings?
- Is context (like Request ID) present in every log entry for a transaction?
- Are sensitive fields (tokens, passwords, PII) explicitly redacted?
- Are metrics using standardized naming conventions (e.g., snake_case for Prometheus)?
- Are errors logged with stack traces and sufficient context to debug without guessing?

## Anti-Pattern

- `console.log()` or equivalent generic print statements in production code.
- Logging the entire raw HTTP Request or Response object.
- Silently swallowing exceptions without logging them.
- Emitting high-cardinality data (like User IDs) as metric labels/tags instead of log fields.

## Output Contract

When using this skill, the output should include:

1. the project docs consulted
2. the instrumentation code (logging, tracing, or metrics)
3. the structured payload shape being emitted
4. the PII masking and security constraints verified
5. how the new telemetry can be validated (e.g., local mock server, stdout check)

## Neutral Prompt Shape
`@agent use observability on [Target Service/Component] focusing on [Specific Metrics/Logs].`

## Example Prompt
- "Instrument this service with structured logging and trace context."
- "Review this controller to ensure PII is masked before logging."
- "Design Prometheus metrics for this asynchronous background job."