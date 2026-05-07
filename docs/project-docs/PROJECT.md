# Project — Project-Aware Agent Template

Last updated: 2026-05-07

---

## Summary

This repository is a reusable template for AI-assisted software delivery in VS Code.

It provides:

- generic instruction and rule files
- reusable skills and reusable prompts
- a stable project-documentation contract
- adoption guidance for repositories that want project-specific truth to live in `docs/project-docs/`

The template repository itself intentionally does not carry a live sample product or stack-specific implementation plan.

---

## Problem

AI customization repos become difficult to trust when rules, skills, reusable prompts, and project docs each contain their own version of the truth.

That drift usually shows up as:

- stale project names
- hardcoded stack commands in the wrong layer
- reusable prompt outputs that no longer match the expected document contract
- skills that silently assume one framework or runtime

This template exists to keep ownership explicit so adopted repositories can update project-specific facts in one place.

---

## Goals

- keep rules generic and reusable
- keep skills procedural and reusable
- keep reusable prompts responsible for creating and refreshing project docs
- make `docs/project-docs/` the only project-specific truth layer in adopted repos
- keep the template repository itself clean, generic, and free of embedded sample products

---

## Non-Goals

- shipping a sample application or service inside this repository
- storing historical project snapshots in the active template tree
- embedding framework-specific implementation guidance in template-owned docs
- using reusable prompt text or skill text as the durable source of project truth

---

## Stakeholders

- template maintainers
- teams adopting the template in their own repositories
- AI agents that read the docs to plan, implement, and verify work

---

## Success Metrics

| Goal | Signal |
| --- | --- |
| Template cleanliness | No active sample project or stack-specific implementation docs remain in template-owned surfaces |
| Ownership clarity | A maintainer can explain where any fact belongs using `TEMPLATE_CONTRACT.md` alone |
| Adoption speed | A new repository can populate the required docs without copying a sample product |
| Drift resistance | Structural checks find no stale project names or hidden implementation assumptions in template-owned docs |
| Maintainability | Rule, skill, and reusable prompt updates can be made without rewriting project-specific examples |
