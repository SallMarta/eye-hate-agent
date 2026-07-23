---
trigger: always_on
---

# EHA Repository Agent Rules

> **Supplements the user-level EHA agent rules** (`~/.<agent>/rules/eha-agent-rules.md`) with constraints specific to maintaining the EHA source repository.
> This is a **project-level rules file** — it applies when working in the EHA source repository itself, not in target projects that use EHA.
> Behavioral rules (guardrails, cache integrity, intake, contract essentials) are governed by the user-level rules and are NOT repeated here.

---

## 1. Hard Constraints

These rules are non-negotiable. Violating any of them breaks the build, tests, or user trust.

1. **Registry-Adapter Pattern.** EHA uses a strict Registry-Adapter-Action-State architecture. Do not bypass `src/engine/index.js` for internal cross-module imports. The CLI (`bin/eha.js`) imports **only** from this façade — never directly from sub-modules.
2. **Native Test Runner Only.** Use `node:test` and `node:assert` exclusively. Do not install or configure third-party test runners (Jest, Mocha, Vitest).
3. **File System Sandbox.** When writing tests, NEVER write to the actual repository file system. Always use the `createSandbox()` helper (in `test/engine.test.js`) via `os.tmpdir()`. Clean up the sandbox in a `finally` block. For device-level tests, use `createFakeHome()` instead.
4. **Core Rules Mutability.** Do not manually edit the `EHA_COMPACT_RULES` string in `src/engine/adapters/shared.js` unless explicitly instructed by the user. This string is foundational and injected into every generated file globally.
5. **No Stubbing.** Write complete implementations. Do not use placeholders like `/* ... */` or `// rest of code` in code examples or actual edits.
6. **Bidirectional Sync.** Templates on disk and registry entries must be in 1:1 sync. Adding a template file without registering it (or vice versa) will cause the H4 test to fail.
7. **CLI Display Names.** The `AGENT_DISPLAY_NAMES` constant at the top of `bin/eha.js` must be updated whenever a new agent is added.

---

## 2. How EHA Works (Mental Model)

EHA is a text-processing and file-routing engine. It reads platform-agnostic Markdown templates, wraps them in agent-specific formats (YAML frontmatter, XML tags), and writes them to targeted directories on the user's disk.

### Component Flow

Execution flows through four architectural layers:

| Layer | Location | Function | Constraint |
|---|---|---|---|
| **CLI** | `bin/eha.js` | Parses arguments (Commander.js), manages terminal UI (readline), top-level error catching | Must contain NO business logic. Only collects inputs and passes to Actions. |
| **Actions** | `src/engine/actions/` | Orchestrators. Request adapter, request templates, pass to adapter for translation, pass to State for writing. | Each action is a self-contained orchestrator. |
| **Adapters** | `src/engine/adapters/` | Translation layer. Format standard EHA markdown into agent-specific structure. | Pure transformation logic. No side effects. |
| **State** | `src/engine/state/` | Raw OS/FS operations: `fs.js` (safe wrappers), `paths.js` (resolution), `manifest.js` (install tracking). | Lowest level boundary. No business logic. |

### Key Concepts

- **The Façade (`src/engine/index.js`):** All inter-module communication goes through this file. When adding a new public function, you must export it here.
- **Multi-Agent Accumulation:** `initProject()` supports installing multiple agents in one project. Each call appends without removing previous agents' files. `config.agents` tracks all active agents; `config.agent` points to the most recently installed.
- **Manifest Versioning:** Project manifest migrated from v1 (single agent) to v2 (multi-agent). `readManifest()` in `src/engine/actions/project.js` transparently upgrades v1 to v2 on read.
- **Sentinel Blocks (`src/engine/state/sentinel.js`):** Some agents require global config files that may contain user content. `upsertSentinelBlock()` replaces only content between `<!-- EHA:START ... -->` and `<!-- EHA:END -->` markers. Use `isSentinel: true` in adapters when the target file might contain user content; `isSentinel: false` for files EHA fully owns.
- **Device vs. Project Installation:**
  - **Project** (`eha init`): writes to project root (`.claude/`, `.github/`, `.agents/`). Tracked by `.eha/manifest.json` and `.eha/config.json`. Adapters use `generateFiles(rootDir, workflows, skills)`.
  - **Device** (`eha` scope "device"): writes to user home directory (`~/.claude/`, `~/.copilot/`, `~/.gemini/`). Tracked by `~/.eha/manifest.json`. Adapters use `generateDeviceFiles(homeDir, workflows, skills)`. Supports multi-agent in a single call.

---

## 3. Recipe-Aware Execution

When a task matches one of the known maintenance recipes in the **Maintainer Reference** (`docs/project-docs/development/maintainer-reference.md`), **use the recipe directly**. The recipe IS the plan — do not overlay the generic intake checklist on top of it.

Available recipes (read the reference doc for full details and code templates):

1. **Add a Skill or Workflow** — create template + register in registry
2. **Add a New AI Agent Target** — 7-step implementation path with full adapter template
3. **Add a New CLI Command** — 3-step path with action + CLI code templates
4. **Modify Agent Rules** — Type A (agent-rules.md) vs Type B (EHA_COMPACT_RULES)

The reference doc also contains: slash command mapping table, testing & verification procedures, and a quick reference of files touched per operation.

---

## 4. Documentation Sync & Release Management

### 4.1 Post-Task Documentation Sync

Apply the user-level 4.5 post-task sync checklist to `docs/project-docs/` when modifying EHA templates, rules, adapters, or engine source code. The checklist is not repeated here — find it in the user-level agent rules.

### 4.2 Change Classification

After completing any task that modifies **published EHA artifacts** (templates, rules, adapters, engine source code, CLI commands), evaluate whether a release is needed:

| Change Type | Release Level | Examples |
|---|---|---|
| **New capability** | Minor (`1.x.0`) | New agent adapter, new skill, new workflow, new CLI command |
| **Behavior change** | Minor (`1.x.0`) | Template logic change, rule modification, adapter output format change |
| **Bug fix** | Patch (`1.0.x`) | Fix broken generation, fix registry mismatch, fix CLI crash |
| **Breaking change** | Major (`x.0.0`) | Remove supported agent, change manifest format, rename CLI commands |
| **Internal only** | None | Test updates, README changes, CI config, comments |

**If a release is warranted:**

1. Bump `"version"` in `package.json` accordingly.
2. Run `npm install` to update `package-lock.json`.
3. Add a changelog entry to `docs/project-docs/foundation/changelog.md` describing the change.
4. Update `docs/project-docs/foundation/status.md` if the change affects roadmap or current phase.
5. Commit all changes with a descriptive message.
6. Inform the user that a release is ready: *"Changes are committed. To publish, push to main and create a GitHub release with tag `v<version>` — the CI workflow will publish automatically."*

**Do not run `npm publish` locally.** EHA uses NPM Provenance via GitHub Actions. Publishing is: push to main → create GitHub Release with version tag → CI auto-publishes with provenance badge.

### 4.3 When NOT to Trigger Release

Skip release evaluation for:
- Changes to `docs/project-docs/` that document EHA itself (not the shipped product)
- Changes to MAINTAINER-README.md
- Changes to `.claude/rules/` or session-level files
- Test-only changes that don't affect shipped output
- Comments, formatting, or whitespace changes
