# Maintainer Reference

Last update: 2026-06-22

Status: Live

---

## 1. Description

On-demand reference for maintaining the EHA source repository. Contains maintenance recipes with full code templates, testing & verification procedures, and quick reference tables. This document is read by AI agents when a task matches one of the known maintenance recipes (see project rules §3).

## 2. Important

This file supplements the project-level rules (`.claude/rules/eha-repository-rules.md`). The rules file contains the always-on constraints; this file contains the detailed reference material loaded on demand.

## 3. Table of Contents

- [1. Description](#1-description)
- [2. Important](#2-important)
- [3. Table of Contents](#3-table-of-contents)
- [4. Scope](#4-scope)
- [5. Slash Commands & Workflows](#5-slash-commands--workflows)
- [6. Recipe 1: Add a New Skill or Workflow](#6-recipe-1-add-a-new-skill-or-workflow)
- [7. Recipe 2: Add a New AI Agent Target](#7-recipe-2-add-a-new-ai-agent-target)
- [8. Recipe 3: Add a New CLI Command](#8-recipe-3-add-a-new-cli-command)
- [9. Recipe 4: Modify Agent Rules](#9-recipe-4-modify-agent-rules)
- [10. Recipe 5: Add a New Subagent](#10-recipe-5-add-a-new-subagent)
- [11. Testing & Verification](#11-testing--verification)
- [12. Quick Reference: Files Touched per Operation](#12-quick-reference-files-touched-per-operation)
- [13. Related Documents](#13-related-documents)
- [14. Open Questions](#14-open-questions)

## 4. Scope

Covers all maintenance operations, testing procedures, and operational reference material for the EHA repository.

## 5. Slash Commands & Workflows

In EHA, "slash commands" and "workflows" are the same thing. Workflows are the platform-agnostic definition; each adapter translates them into the agent's native command format:

| Agent | Generated Slash Command | File Location |
| --- | --- | --- |
| Claude | `/eha-<commandName>` | `.claude/commands/eha/eha-<name>.md` |
| Copilot | Prompt attachment `eha-<name>` | `.github/prompts/eha-<name>.prompt.md` |
| Antigravity | `/eha-<commandName>` | `.agents/workflows/eha-<name>.md` |
| Gemini CLI | `/eha-<commandName>` | `.gemini/settings/eha-<name>.md` |

To add a new slash command, follow Recipe 1 below. The `eha-` prefix is added automatically by each adapter.

## 6. Recipe 1: Add a New Skill or Workflow

**Step 1 — Write the Template:**
- Skill: create `docs/templates/skills/<skill-name>/SKILL.md`
- Workflow: create `docs/templates/reusable-prompts/<NN>-<name>.md` (NN = next available number)

Template anatomy: Do not include EHA core rules or overarching project contexts. Write only the specific instructions for the agent.

> **Registry Token Expansion:** Prompt templates can use `{{REGISTRY:path/relative/to/project-docs-template}}` tokens to embed template registry content inline. The `loadPromptContent()` function in `shared.js` expands these tokens at projection time by reading the corresponding file from `docs/templates/project-docs-template/` and wrapping it in `<!-- === EHA ... === -->` boundary markers. This ensures projected prompt files are self-contained and don't reference files that only exist in the EHA source repo.

**Step 2 — Register the Template:**
- Skills: add entry to `SKILL_DEFINITIONS` in `src/engine/registry/skills.js`
- Workflows: add entry to `WORKFLOW_DEFINITIONS` in `src/engine/registry/workflows.js`

```javascript
const SKILL_DEFINITIONS = {
  // ... existing skills ...
  'example-skill': {
    id: 'example-skill',
    commandName: 'example-skill',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'example-skill', 'SKILL.md'),
  },
};
```

> **Bidirectional Sync:** Test H4 enforces that every template on disk has a registry entry and vice versa. Forgetting either side will cause `npm test` to fail.

**No further changes needed.** All adapters iterate `listWorkflows()` / `listSkills()` in their `generateFiles()` and `generateDeviceFiles()` methods — new templates propagate to all supported agents automatically.

## 7. Recipe 2: Add a New AI Agent Target

Seven-step implementation path:

1. **Update supported list:** Add lowercase agent ID to `SUPPORTED_AGENT_IDS` in `src/engine/adapters/shared.js`.
```javascript
const SUPPORTED_AGENT_IDS = ['claude', 'copilot', 'antigravity', 'example-agent'];
```

2. **Create adapter:** `src/engine/adapters/<agent-id>.js`. Must implement `generateFiles(rootDir, workflows, skills)` and `generateDeviceFiles(homeDir, workflows, skills)`. Use shared helpers: `loadPromptContent()`, `loadSkillContent()`, `loadRuleContent()`, `buildDeviceRulesContent()`, `EHA_COMPACT_RULES`.

**Full adapter template:**
```javascript
const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadRuleContent, buildDeviceRulesContent } = require('./shared');

function buildExampleAgentCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---\ndescription: "EHA ${workflow.id} — ${workflow.description}"\n---\n\n${EHA_COMPACT_RULES}\n\n---\n\n${promptContent}`;
}

function buildExampleAgentSkillFile(skill) {
  const skillContent = loadSkillContent(skill);
  return `---\ndescription: "EHA skill — ${skill.commandName}"\n---\n\n${EHA_COMPACT_RULES}\n\n---\n\n${skillContent}`;
}

function buildExampleAgentRuleFile() {
  const ruleContent = loadRuleContent('example-agent');
  return `---\ndescription: "EHA agent rules"\n---\n\n${ruleContent}`;
}

module.exports = {
  id: 'example-agent',
  name: 'Example Agent',
  description: 'Generates .example-agent/rules/ files',
  generateFiles(rootDir, workflows, skills) {
    const files = [];

    // Generate Workflows
    for (const workflow of workflows) {
      files.push({
        relativePath: path.join('.example-agent', 'rules', `eha-${workflow.commandName}.md`),
        content: buildExampleAgentCommandFile(workflow),
      });
    }

    // Generate Skills
    for (const skill of skills) {
      files.push({
        relativePath: path.join('.example-agent', 'rules', `eha-${skill.commandName}.md`),
        content: buildExampleAgentSkillFile(skill),
      });
    }

    // Generate Rules
    files.push({
      relativePath: path.join('.example-agent', 'rules', 'eha-agent-rules.md'),
      content: buildExampleAgentRuleFile(),
    });

    return files;
  },
  generateDeviceFiles(homeDir, workflows, skills) {
    const files = [];

    for (const workflow of workflows) {
      files.push({
        absolutePath: path.join(homeDir, '.example-agent', 'rules', `eha-${workflow.commandName}.md`),
        content: buildExampleAgentCommandFile(workflow),
        isSentinel: false,
      });
    }

    for (const skill of skills) {
      files.push({
        absolutePath: path.join(homeDir, '.example-agent', 'rules', `eha-${skill.commandName}.md`),
        content: buildExampleAgentSkillFile(skill),
        isSentinel: false,
      });
    }

    files.push({
      absolutePath: path.join(homeDir, '.example-agent', 'config.md'),
      content: buildDeviceRulesContent('example-agent', workflows),
      isSentinel: true, // Uses Sentinel Block for global config
    });

    return files;
  }
};
```

3. **Register adapter:** Require and map in `RUNTIME_ADAPTERS` in `src/engine/adapters/index.js`.
```javascript
const RUNTIME_ADAPTERS = {
  claude: require('./claude'),
  copilot: require('./copilot'),
  antigravity: require('./antigravity'),
  'example-agent': require('./example-agent'),
};
```

4. **Add workflow routing:** If the agent needs routing in its device-level rules, add an `else if` branch in `buildDeviceRulesContent()` in `src/engine/adapters/shared.js`.
```javascript
} else if (agentId === 'example-agent') {
  const routes = workflows
    .map(w => `- \`${w.commandName}\` → \`~/.example-agent/commands/eha-${w.commandName}.md\``)
    .join('\n');
  routingSection = `\n\n# EHA Workflow Routing\n\n${routes}`;
}
```

5. **Add CLI display name:** Update `AGENT_DISPLAY_NAMES` in `bin/eha.js`.
```javascript
const AGENT_DISPLAY_NAMES = {
  claude: 'Claude',
  copilot: 'GitHub Copilot',
  antigravity: 'Antigravity',
  'example-agent': 'Example Agent',
};
```

6. **Update sentinel cleanup:** If the agent uses a sentinel-injected config, add its filename to the sentinel check in `uninstallDevice()` in `src/engine/actions/device.js`.
```javascript
if (basename === 'CLAUDE.md' || basename === 'GEMINI.md' || basename === 'EXAMPLE.md') {
```

7. **Write tests:** Add test blocks to `test/engine.test.js`:
   - Project-level init (modeled after L51–L128)
   - Device-level install (modeled after L464–L523)
   - File count assertion using formula: `listWorkflows().length + listSkills().length + N` where N is the adapter's extra file count

**Generated File Count Reference:**

Where `A = listAgents().length`. Each adapter emits exactly one file per registered subagent.

| Agent | Extra Files | Total Formula |
|---|---|---|
| Claude | 1 (rules) | `W + S + A + 1` |
| Copilot | 2 (routing + rules) | `W + S + A + 2` |
| Antigravity | 1 (rules) | `W + S + A + 1` |
| Gemini | 1 (GEMINI.md) | `W + S + A + 1` |

## 8. Recipe 3: Add a New CLI Command

Three-step path:

1. **Create orchestrator action:** `src/engine/actions/<name>.js` using existing state and registry helpers.

```javascript
const path = require('node:path');
const { getEnginePaths } = require('../state/paths');
const { readConfig } = require('../state/config');

function verifyProject({ rootDir }) {
  const { configPath } = getEnginePaths(rootDir);
  const config = readConfig(rootDir);

  if (!config.agent) {
    return { status: 'failed', message: 'No agent configured.' };
  }
  return { status: 'success', agent: config.agent, configPath };
}

module.exports = {
  verifyProject,
};
```

2. **Expose the action:** Import and export in `src/engine/index.js` to maintain the API boundary.

```javascript
const { verifyProject } = require('./actions/verify');

module.exports = {
  // ... existing exports ...
  verifyProject,
};
```

3. **Define CLI command:** Use Commander.js in `bin/eha.js`, wire to your action.

```javascript
program
  .command('verify')
  .description('Verify the current EHA configuration setup')
  .action(() => {
    const rootDir = resolveRootDir(); // Existing helper in bin/eha.js
    const result = verifyProject({ rootDir });

    if (result.status === 'success') {
      console.log(chalk.green(`✓ Verification passed for agent: ${result.agent}`));
    } else {
      console.log(chalk.red(`✗ Verification failed: ${result.message}`));
      process.exitCode = 1;
    }
  });
```

## 9. Recipe 4: Modify Agent Rules

Two types of rules with different scopes:

- **Type A — Agent Rules (`docs/templates/rules/agent-rules.md`):** Global behavioral rules template. Single source of truth for all agent behavioral rules. Agent-specific content (e.g., cache strategies) is auto-filtered per agent via `loadRuleContent(agentId)` regex in `shared.js`.

- **Type B — Compact Rules (`EHA_COMPACT_RULES` in `src/engine/adapters/shared.js`):** Condensed inline string injected into **every** generated workflow and skill file. **CAUTION:** editing this has cascading global impact. Only modify for fundamental taxonomy or SDD philosophy changes.

## 10. Recipe 5: Add a New Subagent

**Step 1 — Write the Template:**
Create `docs/templates/agents/<agent-name>/AGENT.md`.

Template anatomy (AGENT.md):
- YAML frontmatter: `name` (use the `eha-<name>` namespace — adapters are pass-through, so the source file carries the final rendered value), `description`, `tools` (canonical Claude-style whitelist such as `Read`, `Grep`, `Glob`, `Write`, `Bash`, `WebSearch`; adapters will translate platform-specific names later), and `wraps` (the existing skill/workflow ID this subagent delegates to).
- Markdown body: persona, hard constraints, and expected output format. The body carries **subagent-specific framing** (e.g. read-only enforcement, scoping, output contract) — it does **not** duplicate the skill's procedure.
- **`{{WRAPS}}` token (required when `wraps:` is set):** place this token where the wrapped skill/workflow procedure should land. At build time, `loadAgentContent()` resolves `wraps:` → finds the matching skill (via `listSkills()`) or workflow (via `listWorkflows()`) → injects its body in place of the token. This is how a subagent inherits the skill's depth without duplicating it (single source of truth: edit `SKILL.md` once). A `wraps:` declaration with no token — or a token with no `wraps:` — makes generation **throw** rather than silently ship a thin agent.
- Do **not** include `EHA_COMPACT_RULES` — subagents inherit behavioral rules from the orchestrator's session, not from their own definition file.
- Frontmatter is **preserved** end-to-end. The agent's own `name`/`description`/`tools`/`wraps` stay intact because the consuming platform reads them directly from YAML. The injected skill body is frontmatter-stripped (via `loadSkillContent()`), so no second `name:` field appears.

```yaml
---
name: "eha-example-agent"
description: "One-line specialist role description."
tools: ["Read", "Grep", "Glob"]
wraps: "system-analysis"
---

# Example Agent

You are a delegated specialist performing a focused, read-only analysis.

**Hard constraints:**
- Read-only: never modify files.

**Operating procedure — execute the wrapped `system-analysis` skill in full:**

{{WRAPS}}

**Output:** A structured summary, not a full transcript.
```

**Step 2 — Register the Template:**
Add an entry to `AGENT_DEFINITIONS` in `src/engine/registry/agents.js`:

```javascript
const AGENT_DEFINITIONS = {
  // ... existing agents ...
  'example-agent': {
    id: 'example-agent',
    commandName: 'example-agent',
    repoRelativePath: path.join('docs', 'templates', 'agents', 'example-agent', 'AGENT.md'),
  },
};
```

> **Bidirectional Sync:** Test H4 enforces that every agent directory under `docs/templates/agents/` has a registry entry and vice versa. Forgetting either side causes `npm test` to fail.

**No further changes needed.** All four adapters iterate `listAgents()` in both `generateFiles()` and `generateDeviceFiles()` — new agent templates propagate to every supported platform automatically.

**Platform output paths:**

| Platform | Project-Level Path | Device-Level Path |
| --- | --- | --- |
| Claude | `.claude/agents/eha-<name>.md` | `~/.claude/agents/eha-<name>.md` |
| Copilot | `.github/agents/eha-<name>.agent.md` | `~/.copilot/agents/eha-<name>.agent.md` |
| Antigravity | `.agents/agents/eha-<name>.md` | `~/.gemini/config/agents/eha-<name>.md` |
| Gemini CLI | `.gemini/agents/eha-<name>.md` | `~/.gemini/agents/eha-<name>.md` |

> **Platform support note:** Claude and Copilot actively consume subagent files today. Antigravity and Gemini CLI do not yet support user-defined agent discovery — files are pre-installed in sensible locations so support is ready when those platforms add it.

**Subagent auto-routing (opt-in):** By default subagents are invoked manually (`@eha-<name>`). To make the orchestrator *delegate by default*, enable auto-routing — a `## EHA Subagent Routing` section is appended to each platform's rules file, built dynamically from every agent's `trigger` hint.

- Enable at install time with the `--subagent-routing` flag: `eha --subagent-routing` (wizard), `eha --subagent-routing init claude`, or `eha init claude --subagent-routing`. Device install honors it too.
- The setting is persisted to `.eha/config.json` (`subagentRouting: true`) and survives re-init; pass it again (or edit config) to change.
- To add/route a new subagent, give it a `trigger` string in `src/engine/registry/agents.js`. The routing table regenerates automatically on the next `eha init` — no rule-file editing.
- Routing is **soft** (model-judgment): the orchestrator is told when to delegate, but it is not a hard trigger. Disable by re-running without the flag (or deleting the section).

---

## 11. Testing & Verification

### Core Principle

Since EHA is a meta-tool generating files, the primary validation is ensuring the generated folder structures map **1:1** with the expected template formats without breaking markdown formatting.

### Framework

- Native Node.js test runner (`node:test`) and `node:assert` only.
- Automated tests: `test/engine.test.js`. Run: `npm test`.
- CI: GitHub Actions (`publish.yml`) runs `npm test` before any package publish.

### Verification Matrix

| Change type | Preferred validation | Fallback |
|---|---|---|
| CLI logic change | E2E loop in dummy directory | Manual review |
| Template changes | `npm test` (H4 bidirectional sync) + `eha init` visual check | None |
| Registry changes | `npm test` (H4) | None |
| Adapter changes | `npm test` + device-level test block | Manual review |
| Rule changes | `npm test` + visual diff of generated output | Manual review |

### Sandbox Testing

Never modify the actual repository in tests. Use:
- `createSandbox()` — generates isolated temp directories via `os.tmpdir()` for project-level tests
- `createFakeHome()` — generates temp directory simulating `$HOME` for device-level tests

Always wrap in `try...finally` to ensure cleanup:

```javascript
test('example', () => {
  const rootDir = createSandbox();
  try {
    // ... test logic ...
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});
```

### File Count Assertions

When testing `initProject()`, expected file count per agent:
- Claude: `listWorkflows().length + listSkills().length + listAgents().length + 1`
- Copilot: `listWorkflows().length + listSkills().length + listAgents().length + 2`
- Antigravity: `listWorkflows().length + listSkills().length + listAgents().length + 1`
- Gemini: `listWorkflows().length + listSkills().length + listAgents().length + 1`

### Local Testing Methods

Before opening a PR, test the CLI in a dummy external project:

**npm link (recommended):**
```bash
npm link                                    # in EHA repo root
cd /path/to/dummy-project && eha init       # in test project
npm unlink -g @sallmarta/eye-hate-agent     # cleanup
```

**Direct binary invocation:**
```bash
node /path/to/eye-hate-agent/bin/eha.js init
```

### Manual E2E Loop

When automated tests don't cover the full generation flow, run this manual E2E loop:

1. `mkdir dummy-eha-test && cd dummy-eha-test`
2. `echo '{"name":"dummy"}' > package.json`
3. `node ../path/to/eye-hate-agent/bin/eha.js init <agent-id>`
4. Verify the target directory (e.g., `.agents/`, `.claude/`, `.github/`) and `.eha/` are generated with correct file count and content.
5. `node ../path/to/eye-hate-agent/bin/eha.js remove`
6. Verify clean state — no residual files.

### Manual Fallback

If the CLI prompt fails, manually review the relevant adapter in `src/engine/adapters/` to ensure the adapter string processing didn't drop characters.

### Success Metrics

- 0 generation failures for supported agents (Claude, Copilot, Antigravity, Gemini CLI).
- All `npm test` assertions pass.
- Generated file count matches the formula `W + S + N` (workflows + skills + adapter extras).

## 12. Quick Reference: Files Touched per Operation

| Operation | Files Modified |
|---|---|
| Add a workflow | `docs/templates/reusable-prompts/<name>.md` (NEW), `src/engine/registry/workflows.js` |
| Add a skill | `docs/templates/skills/<name>/SKILL.md` (NEW), `src/engine/registry/skills.js` |
| Add a subagent | `docs/templates/agents/<name>/AGENT.md` (NEW), `src/engine/registry/agents.js` |
| Add a new agent target | `src/engine/adapters/shared.js` (supported IDs), `src/engine/adapters/<name>.js` (NEW), `src/engine/adapters/index.js`, `src/engine/adapters/shared.js` (routing), `src/engine/actions/device.js` (sentinel cleanup), `bin/eha.js` (display names), `test/engine.test.js` |
| Add a CLI command | `src/engine/actions/<name>.js` (NEW or modify), `src/engine/index.js`, `bin/eha.js`, `test/engine.test.js` |
| Modify agent rules | `docs/templates/rules/agent-rules.md` |
| Modify compact rules | `src/engine/adapters/shared.js` (`EHA_COMPACT_RULES`) — **⚠️ global impact** |
| Add a state module | `src/engine/state/<name>.js` (NEW), optionally `src/engine/index.js` |
| Modify project docs template registry | `docs/templates/project-docs-template/index.md` or `technical-guidelines/index.md` — changes auto-propagate to all projected prompts on next `eha init` / `eha` run |

## 13. Related Documents

- [Testing & Verification](testing.md) - Testing strategy overview (this doc absorbs and supersedes its content)
- [Workflow](../foundation/workflow.md) - Day-to-day development loop
- [Project Rules](../../../.claude/rules/eha-repository-rules.md) - Always-on project-level constraints
- [MAINTAINER-README.md](../../../MAINTAINER-README.md) - Human-facing maintainer guide

## 14. Open Questions

None.
