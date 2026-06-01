---
name: "wireframing"
description: "Project-aware expert-role for wireframing and prototyping. Reads project docs first, then translates requirements into structural UI flows, low-fidelity layouts, and component hierarchies without getting bogged down in visual design details."
---

# wireframing

Produces a project-aware, expert-level wireframe or prototype structure by reading the repository's project docs first, then applying a user-centric structural design methodology.

This skill bridges the gap between the Product Requirements Document (PRD) and the final UI/UX implementation. It focuses on layout, information architecture, user journeys, and component structure, deferring specific styling decisions to the UI/UX phase.

## Required Project Inputs

| Document | Why it matters |
| --- | --- |
| `docs/project-docs/foundation/prd.md` | Defines the user personas, core workflows, and required data points for the interface. |
| `docs/project-docs/development/ui-ux.md` | Provides the baseline component vocabulary (e.g., standard layouts, navigation patterns) to reuse. |
| `docs/project-docs/foundation/architecture.md` | Clarifies constraints on client-side vs server-side rendering and data availability. |

If the repository lacks a PRD for the feature being wireframed, call that out and define the user goals before attempting to draw layouts.

## When to Use

Use this skill when planning the structure of a new interface before committing to high-fidelity design or code.

| Boundary type | Typical artifacts |
| --- | --- |
| Page Layout | Grid structures, navigation placement, content zones. |
| User Flow | Multi-step wizards, checkout processes, onboarding journeys. |
| Component Hierarchy | Identifying which logical components are needed on a screen. |
| Information Architecture | Grouping related data, defining hierarchy of importance. |

## Procedure

### Step 1 — Extract User Goals
Extract from `prd.md`: What is the primary objective of the user on this screen? What are the secondary actions? What data must be visible for them to make decisions?

### Step 2 — Define the Information Architecture
Determine the hierarchy of information. The most critical data and primary calls-to-action (CTAs) must sit prominently (e.g., above the fold or in highly accessible areas). Group related information into logical sections or cards.

### Step 3 — Draft the Component Structure
Without writing CSS or final HTML, outline the required components.
For example:
- Navigation Header (Logo, User Menu)
- Hero Section (Primary Title, Main CTA)
- Data Grid (List of items with specific columns)
- Sidebar (Filters, Categories)

### Step 4 — Map the Interaction Flow
Define how the user navigates between states:
- What happens when a button is clicked? (Modal opens, navigation occurs, inline expansion).
- How are empty states represented?
- How are loading and error states handled structurally?

### Step 5 — Produce the Wireframe Representation
Generate a structural representation. This could be a text-based ASCII wireframe, a markdown-based component hierarchy tree, or a Mermaid state diagram representing the flow. Keep it strictly low-fidelity.

## Quality Check

- Is the primary call-to-action immediately obvious in the structure?
- Does the layout follow established patterns from `ui-ux.md`?
- Are edge cases (empty states, errors) accounted for in the flow?
- Is the information hierarchy logical and aligned with the PRD?
- Is the structure free of distracting styling details (colors, exact fonts)?

## Anti-Pattern

- Focusing on colors, typography, or exact pixel padding during the wireframing stage.
- Designing layouts that assume perfect, fully populated data at all times.
- Creating disjointed screens without defining the navigation flow between them.
- Ignoring accessibility concerns regarding logical reading order.

## Output Contract

When using this skill, the output should include:
1. the project docs consulted and user goals assumed
2. the proposed information architecture and data hierarchy
3. a structural wireframe (ASCII, Markdown list, or Diagram)
4. defined interaction flows between states
5. identified edge cases (empty, loading, error states)

## Neutral Prompt Shape
`@agent use wireframing on [Target Feature/Page] focusing on [Specific User Journey].`

## Example Prompt
- "Create a structural wireframe for the new user dashboard."
- "Map out the component hierarchy and interaction flow for the checkout process."
- "Draft a low-fidelity layout for the data analytics page."
