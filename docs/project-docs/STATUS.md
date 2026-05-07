# Status — Template Repository

Last updated: 2026-05-07

---

## Current State

- This repository is maintained as a template-only workspace.
- The active source of truth is the documentation contract plus the rule, skill, and reusable prompt systems that depend on it.
- Live sample products and historical example projects are intentionally excluded from the active template tree.

---

## Roadmap

```text
contract upkeep -> reusable prompt upkeep -> skill upkeep -> consistency checks -> adoption guidance upkeep
```

---

## Workstreams

| Workstream | Goal | Status |
| --- | --- | --- |
| Contract maintenance | Keep the project-doc contract stable and explicit | Active |
| Rule alignment | Keep mirrored instruction files aligned with the contract | Active |
| Skill alignment | Keep reusable procedures generic and project-aware | Active |
| Reusable prompt alignment | Keep bootstrap, refresh, and audit reusable prompts aligned with the contract | Active |
| Repo hygiene | Prevent sample drift, placeholders, and historical artifacts from re-entering the template | Active |

---

## Risks / Blockers

- template drift returns if maintainers start storing project-specific truth in reusable prompts or skills
- mirrored rule files can diverge if only one is updated during maintenance
- optional docs can become clutter if created without durable ownership needs
