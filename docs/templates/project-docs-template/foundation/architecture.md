# Architecture

Last update: YYYY-MM-DD

Status: [Proposed | Draft | Live | Deprecated | Archived]

---

## 1. Description
Briefly describe the purpose of this document and what it contains.

## 2. Important
Notes of important findings or critical constraints. Can be empty.

## 3. Table of Contents
[Generate a hyperlinked table of contents here containing ALL headings in this file (1 through N). Use standard markdown links, e.g., - [1. Description](#1-description)]

## 4. Scope
The boundaries of what this document covers.

## 5. Goals
What we aim to achieve with this specific document.

## 6. Non Goals
What is explicitly excluded from the scope of this document.

## 7. Tech Stack Overview
| Area | Choice | Notes |
| --- | --- | --- |
| Application or service | TBD | |
| Runtime or platform | TBD | |
| Storage | TBD | |
| External integrations | TBD | |

## 8. Architecture Pattern
Describe architecture design pattern, system topology, component boundaries, and foundational control flow.

## 9. System Flow
General overview of how the system work from start to end. Diagram or flowchart visual are preferred. Use mermaid.

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -- Yes --> C[Result 1]
    B -- No --> D[Result 2]
```

## 10. Data Flow
General overview of inter-feature data flow, mapped against architectural patterns and system flow. Diagram or flowchart visual are preferred. Use mermaid.

```mermaid
sequenceDiagram
    participant User
    participant System
    User->>System: Data Request
    System-->>User: Data Response
```

## 11. Tools Integration
Such as hardware or software or external api and relevant tools. Can be empty.

| Integration | Purpose | Kind | Notes |
| --- | --- | --- | --- |
| TBD | TBD | TBD | *Software/Hardware/APIs/Other* |

## 12. Global Parameters and Constraints
Detail the system's global restrictions, such as performance requirements, caching policies, and error-handling mechanisms (e.g., "Supports offline execution for core features" or "Memory footprint restricted to 50MB").

## 13. Architecture Decision Records (ADRs)
A collection of ADRs documenting the rationale behind technical decision (e.g., "Choosing React over Vue for state management flexibility" or "Adopting Domain-Driven Design to leverage bounded contexts").

## 14. Success Metrics
How we measure if the goals of this document are achieved.

## 15. Related Documents
[Link to related document](path) - Short brief note about why it's related (e.g., [Guidelines](path) - technical implementation rules).

## 16. Open Questions
Unresolved architectural questions or assumptions. Can be empty.
