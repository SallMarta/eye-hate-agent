---
name: "devops-ci-cd"
description: "Project-aware expert-role for CI/CD pipeline design and implementation. Reads project docs first, enforces build caching, security gates, test execution, and deployment safety."
argument-hint: "Describe the workflow, pipeline, or deployment stage to build or review"
---

# DevOps CI/CD

Produces a **project-aware, expert-level CI/CD pipeline implementation** by reading the repository's project docs first, then applying robust deployment engineering practices.

This skill is reusable across CI providers (GitHub Actions, GitLab CI, Jenkins) and deployment targets (AWS, GCP, Vercel, Kubernetes).

It should **not** assume a specific CI provider or deployment strategy until the project docs confirm them.

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/project-docs/operations/ci-cd.md` | Defines the required CI provider, branch protection rules, required jobs, and deployment environments. |
| `docs/project-docs/development/testing.md` | Defines which test suites must run and their coverage thresholds. |
| `docs/project-docs/operations/security.md` | Defines required security scanning tools (SAST, DAST, dependency checks). |

If the repository lacks the CI/CD docs needed for deployment, call that out and create or update the missing docs instead of blindly writing deployment scripts.

## When to Use

Use this skill when building or reviewing one of these boundary types.

| Boundary type | Typical artifacts |
| --- | --- |
| Continuous Integration (CI) | Build scripts, linter checks, test runners, Docker builds. |
| Continuous Deployment (CD) | Terraform/Pulumi execution, environment promotion, artifact publishing. |
| Security & Compliance | Dependabot configuration, secret scanning, static analysis gates. |
| Pipeline Optimization | Caching strategies, matrix builds, job parallelization. |

## Procedure

### Step 1 — Identify the Pipeline Engine and Target
Extract from `ci-cd.md`:
- The CI platform (e.g., GitHub Actions).
- The deployment target (e.g., AWS ECS).
- Authentication mechanisms (e.g., OIDC vs long-lived secrets).

### Step 2 — Define the Build Matrix and Caching
- Ensure language-specific dependencies (node_modules, pip cache, go mod cache) are aggressively cached to reduce build times.
- If building Docker images, implement layer caching.

### Step 3 — Enforce Testing and Security Gates
Consult `testing.md` and `security.md`:
- The pipeline MUST block merges if linters or tests fail.
- The pipeline MUST block merges if critical security vulnerabilities are detected.

### Step 4 — Implement Safe Deployment Strategies
If deploying to production:
- Ensure the pipeline respects environment segregation.
- Implement rollback capabilities or canary/blue-green deployment steps if specified in `ci-cd.md`.
- Never hardcode secrets in the pipeline file; always use the CI provider's secrets manager.

### Step 5 — Verify Pipeline Robustness
Ensure the pipeline:
- Only triggers on appropriate branches or tags.
- Has reasonable timeout limits to prevent hung jobs.
- Cleans up temporary artifacts after execution.

## Quality Check


Use this checklist when reviewing an existing CI/CD configuration:

- Are dependencies and build outputs being cached?
- Are secrets injected securely via environment variables?
- Does a failing test or linter correctly fail the entire job?
- Is the deployment step locked down to specific branches or environments?
- Are timeouts explicitly defined to prevent runaway costs?

## Anti-Pattern

- Hardcoding API keys or passwords directly in the YAML file.
- Writing a pipeline that deploys to production from any branch.
- Skipping tests to make the pipeline run faster.
- Downloading dependencies without verifying lockfiles.

## Output Contract

When using this skill, the output should include:

1. the project docs consulted
2. the proposed pipeline architecture (triggers, jobs, steps)
3. the caching and optimization strategies used
4. the security and testing gates enforced
5. the final pipeline YAML or script

## Neutral Prompt Shape
`@agent use devops-ci-cd on [Target Pipeline/Workflow] focusing on [Specific Optimizations/Security Gates].`

## Example Prompt
- "Create a GitHub Actions workflow that implements the CI caching strategy."
- "Review this Jenkinsfile for security issues and hardcoded secrets."
- "Design a deployment pipeline that supports blue-green rollout."