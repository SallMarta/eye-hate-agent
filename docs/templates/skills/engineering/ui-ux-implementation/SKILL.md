---
name: ui-ux-implementation
description: "Project-aware expert-role for frontend UI/UX design and implementation. Reads project docs first, enforces design systems, responsive bounds, accessibility, and visual testing constraints."
argument-hint: "Describe the component, page, or interaction to build or review"
---

# UI/UX Implementation — Project-Aware

Produces a **project-aware, expert-level frontend implementation** by reading the repository's project docs first, then applying a rigorous component-driven methodology.

This skill is reusable across any frontend framework (React, Vue, Svelte, plain HTML/CSS) or styling solution (Tailwind, CSS Modules, Styled Components).

It should **not** assume a specific component library (like Material UI) or styling engine until the project docs confirm them.

---

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/project-docs/technical/ui-ux.md` | Defines the design system, color palette, typography, accessibility (a11y) targets, and responsive breakpoints. |
| `docs/project-docs/foundation/prd.md` | Clarifies the target audience and expected user flows. |
| `docs/project-docs/foundation/architecture.md` | Defines where state management lives versus pure presentation components. |
| `docs/project-docs/technical/testing.md` | Defines how the UI should be validated (e.g., unit tests, visual regression, e2e). |

If the repository lacks the UI docs needed for styling or layout, call that out and create or update the missing docs instead of inventing arbitrary colors or padding values.

---

## When To Use

Use this skill when building or reviewing one of these boundary types.

| Boundary type | Typical artifacts |
| --- | --- |
| Presentation Component | Buttons, inputs, cards, typography components. |
| Layout / Page | Grid structures, responsive containers, navigation shells. |
| Interaction / Animation | Modals, dropdowns, transitions, hover states. |
| State-Connected Component | Forms, data tables, fetching wrappers. |

---

## Procedure

### Step 1 — Extract Design Constraints
Extract from `ui-ux.md`:
- CSS variables, Tailwind config, or design token values.
- Responsive breakpoints (e.g., mobile-first vs desktop-first).
- Required a11y standards (e.g., WCAG AA).

### Step 2 — Separate State from Presentation
Extract from `architecture.md`:
- Identify if this component is "dumb" (presentation only) or "smart" (data fetching/stateful).
- Do not mix complex global state logic into a simple presentational button.

### Step 3 — Design for Edge Cases
Before writing HTML/CSS, define:
- Empty states (what if the data array is empty?)
- Loading states (skeletons vs spinners).
- Error states (inline validation vs toast notifications).
- Overflow states (what if the text is 100 characters long?).

### Step 4 — Implement with Accessibility (A11y)
Ensure the implementation includes:
- Proper semantic HTML (`<button>` instead of `<div onClick>`).
- ARIA labels where semantics fall short.
- Keyboard navigation support (focus states).
- Sufficient color contrast.

### Step 5 — Verify Responsive Behavior
Write the code to adapt gracefully across the breakpoints defined in `ui-ux.md`. Ensure touch targets are large enough on mobile.

### Step 6 — Define Verification Requirements
Use `testing.md` to decide how this will be validated.
Examples:
- Component tests (e.g., React Testing Library) asserting ARIA roles.
- Storybook stories for visual isolation.

---

## Output Contract

When using this skill, the output should include:

1. the project docs consulted (specifically the design system tokens)
2. the component API (props/inputs)
3. the implementation code (separated by state vs presentation if applicable)
4. the edge cases handled (loading, empty, error, overflow)
5. accessibility and responsive verification steps

---

## Quality Checks

Use this checklist when reviewing an existing UI component:

- Does it use hardcoded hex colors or arbitrary pixel values instead of the design system tokens?
- Is it accessible via keyboard only?
- Does it break layout on mobile screens?
- Are loading and error states handled gracefully?
- Is state managed at the correct architectural layer?

---

## Anti-Patterns

- Inventing new colors, fonts, or padding values that aren't in `ui-ux.md`.
- Writing `<div onClick={...}>` instead of semantic interactive elements.
- Ignoring loading/error states in asynchronous components.
- Coupling global state management (like Redux or Zustand) directly into low-level UI components.
