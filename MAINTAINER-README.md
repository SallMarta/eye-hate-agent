# Maintaining Eye Hate Agent (EHA)

> **[IMPORTANT]**
> This repository adheres to **Spec-Driven Development (SDD)**. Before modifying the architecture, refer to `docs/project-docs/index.md`.
> This document is the exhaustive Developer Cookbook and Onboarding Manual for Eye Hate Agent. It is designed for both human maintainers and AI agents tasked with modifying this repository. Do not skip steps or assume undocumented side effects.

---

## 1. AI Agent Directives

<ai_directives>
If you are an AI agent operating in this repository, you MUST adhere to the following rules:
1.  **Architecture:** EHA uses a strict Registry-Adapter pattern. Do not bypass `src/engine/index.js` for internal cross-module imports.
2.  **Testing Framework:** We use the native Node.js test runner (`node:test`) and the native `node:assert` module. Do not install or configure third-party test runners like Jest, Mocha, or Vitest.
3.  **File System Sandbox:** When modifying or writing tests, NEVER write to the actual repository file system. Always use the `createSandbox()` helper (found in `test/engine.test.js`) to generate temporary directories via `os.tmpdir()`. Clean up the sandbox in a `finally` block.
4.  **Core Rules Mutability:** Do not manually edit the `EHA_COMPACT_RULES` string in `src/engine/adapters/shared.js` unless explicitly instructed by the user. This string is foundational and injected into every generated file globally.
5.  **No Stubbing:** When generating code examples or making actual code edits based on this document, write complete implementations. Do not use placeholders like `/* ... */` or `// rest of code`.
6.  **Bidirectional Sync:** Templates on disk and registry entries must be in 1:1 sync. Adding a template file without registering it (or vice versa) will cause the H4 test to fail.
7.  **CLI Display Names:** The CLI display names are stored in `AGENT_DISPLAY_NAMES` at the top of `bin/eha.js`. Always update this constant when adding a new agent.
</ai_directives>

---

## 2. The Mental Model: How EHA Works

EHA is a text-processing and file-routing engine. It reads raw, platform-agnostic Markdown templates, wraps them in agent-specific proprietary formats (e.g., specific YAML frontmatter or XML tags), and writes them to targeted directories on the user's disk.

### The Component Flow
Execution of any EHA command flows sequentially through four distinct architectural layers:

1.  **CLI (`bin/eha.js`)**: 
    *   *Function:* Parses arguments using `Commander.js`, manages the interactive terminal UI (using `readline`), and handles top-level error catching.
    *   *Constraint:* Must contain NO business logic regarding file generation. It only collects inputs and passes them to the Action layer.
2.  **Actions (`src/engine/actions/`)**: 
    *   *Function:* The orchestrators. For example, `project.js` receives an agent ID, requests the correct adapter from the Adapter layer, requests the templates from the Registry layer, passes the templates to the adapter for translation, and finally passes the translated files to the State layer to be written to disk.
3.  **Adapters (`src/engine/adapters/`)**: 
    *   *Function:* The translation layer. These files (`claude.js`, `copilot.js`, etc.) contain the pure logic required to format standard EHA markdown into the specific structure required by the target AI agent.
4.  **State (`src/engine/state/`)**: 
    *   *Function:* The lowest level boundary. Handles raw OS/FS operations. Contains `fs.js` (safe wrappers for `fs.mkdirSync`, etc.), `paths.js` (path resolution), and `manifest.js` (tracking what was installed).

### The Façade: `src/engine/index.js`
All inter-module communication goes through `src/engine/index.js`. This file re-exports a curated public API from all layers. The CLI (`bin/eha.js`) imports **only** from this façade — never directly from sub-modules. When adding a new public function, you must export it here.

### Multi-Agent Accumulation
`initProject()` supports installing multiple agents in the same project. Each call appends the new agent's files to the project manifest without removing files from previously installed agents. The `config.agents` array tracks all active agents, and `config.agent` always points to the most recently installed one.

### Manifest Versioning
The project manifest format migrated from v1 (single agent) to v2 (multi-agent). `readManifest()` in `src/engine/actions/project.js` transparently upgrades v1 manifests to v2 format on read.

### Core Concept: The Sentinel Block
Some agents require global configuration files (e.g., `~/.example-agent/config.md`). EHA cannot blindly overwrite these files, as it would destroy the user's existing manual configurations. 
Instead, EHA uses **Sentinel Blocks** managed by `src/engine/state/sentinel.js`. The function `upsertSentinelBlock()` reads the target file, looks for exact string markers (`<!-- EHA:START ... -->` and `<!-- EHA:END -->`), and replaces only the content *between* those markers, leaving the rest of the user's file untouched.

**When to use Sentinel Blocks:** In an adapter's `generateDeviceFiles()` method, mark a file with `isSentinel: true` if the target file might contain the user's own content (e.g., `~/.gemini/GEMINI.md`). Use `isSentinel: false` for files that EHA fully owns (e.g., files in dedicated EHA subdirectories).

---

## 3. The Cookbook: Maintenance Recipes

### Recipe 1: How to Add a New Skill or Workflow

To add a new capability (e.g., `generate-example`), you must name it per the Naming Standard, create the template, and register it in memory.

**Step 0: Name It (Naming Standard)**
Skills follow `<verb>-<object>` (kebab-case). The verb must come from the **closed taxonomy of seven**: `design`, `build`, `generate`, `analyze`, `audit`, `test`, `refactor` (bare, grandfathered). Quick discriminators: `design` creates new / `generate` documents existing; `build` outputs code / `generate` outputs a doc; `analyze` yields understanding / `audit` yields a verdict. The object is the narrowest accurate scope, singular, with **no language/framework names ever** (that's `build-logging`, never `build-go-logging`) and no gerunds or agent nouns (`wireframing`, `fsd-generator`). Frontmatter `description:` must be one real line — "<what it produces> from/for <input>. Use when <trigger>." — it propagates to generated files. A naming-convention test enforces the verb taxonomy and language denylist; full rules and the verb table live in the Maintainer Reference (Recipe 1, Step 0). Grep the skills **and** agents registries for collisions before registering.

**Step 1: Write the Template**
Create a new markdown file. For a skill, create `docs/templates/skills/generate-example/SKILL.md`. For a workflow, create `docs/templates/reusable-prompts/03-example-workflow.md`.

*Template Anatomy:* Do not include EHA core rules or overarching project contexts. Write the standard EHA frontmatter (`name`, `description`) plus only the specific instructions for the agent.
```markdown
## Example Skill Instructions

When invoked, perform the following steps:
1. Analyze the user's input.
2. Generate the required example output.
3. Validate the structure before responding.
```

**Step 2: Register the Template**
Open `src/engine/registry/skills.js` (or `workflows.js`). Locate the `SKILL_DEFINITIONS` object and append your new entry with exact paths:
```javascript
const SKILL_DEFINITIONS = {
  // ... existing skills ...
  'generate-example': {
    id: 'generate-example',
    commandName: 'generate-example',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'generate-example', 'SKILL.md'),
  },
};
```

> **⚠️ Bidirectional Sync Requirement:** A test (`H4`) enforces that every subdirectory under `docs/templates/skills/` has a matching entry in `SKILL_DEFINITIONS`, and every registered skill has a matching directory on disk. Similarly for workflows: every `.md` file in `docs/templates/reusable-prompts/` must have a matching `WORKFLOW_DEFINITIONS` entry. Forgetting either side will cause `npm test` to fail.

**No further changes are needed.** All adapters iterate `listWorkflows()` / `listSkills()` in their `generateFiles()` and `generateDeviceFiles()` methods, so your new template is automatically generated for every supported agent.

### Slash Commands and Workflows

In EHA, "slash commands" and "workflows" are the same thing. Workflows are the platform-agnostic definition; each adapter translates them into the agent's native command format:

| Agent | Generated Slash Command | File Location |
|:---|:---|:---|
| Claude | `/eha-<commandName>` | `.claude/commands/eha/eha-<name>.md` |
| Copilot | Prompt attachment `eha-<name>` | `.github/prompts/eha-<name>.prompt.md` |
| Antigravity | `/eha-<commandName>` | `.agents/workflows/eha-<name>.md` |
| Gemini CLI | `/eha-<commandName>` | `.gemini/commands/eha-<name>.toml` |
| Hermes | `/eha-<commandName>` (auto-registered skill) | `.hermes/skills/eha-<name>/SKILL.md` |
| Open Code | `/eha-<commandName>` | `.opencode/commands/eha-<name>.md` |

To add a new slash command, simply follow the workflow recipe above. The `eha-` prefix is added automatically by each adapter.

---

### Recipe 2: How to Add a New AI Agent Target

To support a brand new AI assistant (e.g., `example-agent`), follow this exhaustive implementation path.

**Step 1: Update the Supported List**
Open `src/engine/adapters/shared.js`. Append the lowercase agent ID to the exported array.
```javascript
const SUPPORTED_AGENT_IDS = ['claude', 'copilot', 'antigravity', 'example-agent'];
```

**Step 2: Create the Adapter Module**
Create a new file: `src/engine/adapters/example-agent.js`. You must implement full file generation logic, merging the shared `EHA_COMPACT_RULES` with the raw template content, and structuring it for the target directories.

```javascript
const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadSkillDescription, loadAgentContent, loadRuleContent, buildDeviceRulesContent } = require('./shared');

function buildExampleAgentCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---\ndescription: "EHA ${workflow.id} — ${workflow.description}"\n---\n\n${EHA_COMPACT_RULES}\n\n---\n\n${promptContent}`;
}

function buildExampleAgentSkillFile(skill) {
  const skillContent = loadSkillContent(skill);
  return `---\ndescription: "EHA skill — ${skill.commandName}: ${loadSkillDescription(skill)}"\n---\n\n${EHA_COMPACT_RULES}\n\n---\n\n${skillContent}`;
}

function buildExampleAgentAgentFile(agent) {
  // Subagent definitions are pass-through: frontmatter (name/description/
  // tools/wraps) is consumed directly by the platform — no wrapping needed.
  return loadAgentContent(agent);
}

function buildExampleAgentRuleFile() {
  const ruleContent = loadRuleContent('example-agent');
  return `---\ndescription: "EHA agent rules"\n---\n\n${ruleContent}`;
}

module.exports = {
  id: 'example-agent',
  name: 'Example Agent',
  description: 'Generates .example-agent/rules/ files',
  projectSweepRoots: [
    path.join('.example-agent', 'skills'),
  ],
  deviceSweepRoots: [
    path.join('.example-agent', 'skills'),
  ],
  generateFiles(rootDir, workflows, skills, agents) {
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

    // Generate Agents (subagents)
    for (const agent of agents) {
      files.push({
        relativePath: path.join('.example-agent', 'agents', `eha-${agent.commandName}.md`),
        content: buildExampleAgentAgentFile(agent),
      });
    }

    // Generate Rules
    files.push({
      relativePath: path.join('.example-agent', 'rules', 'eha-agent-rules.md'),
      content: buildExampleAgentRuleFile(),
    });

    return files;
  },
  generateDeviceFiles(homeDir, workflows, skills, agents) {
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
        absolutePath: path.join(homeDir, '.example-agent', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildExampleAgentSkillFile(skill),
        isSentinel: false,
      });
    }

    for (const agent of agents) {
      files.push({
        absolutePath: path.join(homeDir, '.example-agent', 'agents', `eha-${agent.commandName}.md`),
        content: buildExampleAgentAgentFile(agent),
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

**Step 3: Register the Adapter**
Open `src/engine/adapters/index.js`. Require your new module and map it in the `RUNTIME_ADAPTERS` object.
```javascript
const RUNTIME_ADAPTERS = {
  claude: require('./claude'),
  copilot: require('./copilot'),
  antigravity: require('./antigravity'),
  'example-agent': require('./example-agent'),
};
```

**Step 4: Add Workflow Routing (if applicable)**
Open `src/engine/adapters/shared.js` and locate `buildDeviceRulesContent()` (around line 74). If the new agent needs a workflow routing section in its device-level rules file, add an `else if` branch:
```javascript
} else if (agentId === 'example-agent') {
  const routes = workflows
    .map(w => `- \`${w.commandName}\` → \`~/.example-agent/commands/eha-${w.commandName}.md\``)
    .join('\n');
  routingSection = `\n\n# EHA Workflow Routing\n\n${routes}`;
}
```

**Step 5: Add CLI Display Name**
Open `bin/eha.js` and update the `AGENT_DISPLAY_NAMES` constant near the top of the file:
```javascript
const AGENT_DISPLAY_NAMES = {
  claude: 'Claude',
  copilot: 'GitHub Copilot',
  antigravity: 'Antigravity',
  'example-agent': 'Example Agent',
};
```

**Step 6: Update Sentinel Cleanup (if applicable)**
If the new agent uses a sentinel-injected global config file, open `src/engine/actions/device.js` and add the filename to the sentinel check in `uninstallDevice()` (around line 119):
```javascript
if (basename === 'CLAUDE.md' || basename === 'GEMINI.md' || basename === 'EXAMPLE.md') {
```

**Step 7: Write Tests**
Add test blocks to `test/engine.test.js` covering:
- Project-level init (modeled after L51-L128)
- Device-level install (modeled after L464-L523)
- File count assertions using the formula: `listWorkflows().length + listSkills().length + N` where N is the adapter's extra file count

**Generated File Count Reference:**

Where `A = listAgents().length`. Each adapter emits exactly one file per registered subagent.

| Agent | Extra Files | Total Formula |
|:---|:---|:---|
| Claude | 1 (rules) | `W + S + A + 1` |
| Copilot | 2 (routing + rules) | `W + S + A + 2` |
| Antigravity | 1 (rules) | `W + S + A + 1` |
| Gemini CLI | 1 (GEMINI.md) | `W + S + A + 1` |
| Hermes | 1 (HERMES.md) | `W + S + A + 1` |
| OpenCode | 1 (rules) | `W + S + A + 1` |

---

### Recipe 3: How to Add a New CLI Command

To add a new operational command (e.g., `eha verify`), follow this layered approach.

**Step 1: Create the Orchestrator Action**
Create `src/engine/actions/verify.js`. Implement the core business logic using existing state and registry helpers.
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

**Step 2: Expose the Action**
Open `src/engine/index.js`. Import and export your new function to maintain the API boundary.
```javascript
const { verifyProject } = require('./actions/verify');

module.exports = {
  // ... existing exports ...
  verifyProject,
};
```

**Step 3: Define the CLI Command**
Open `bin/eha.js`. Use Commander.js to define the interface and wire it to your action.
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

---

### Recipe 4: How to Modify Agent Rules

EHA distributes two types of rules to agents:

**Type A: Agent Rules (`docs/templates/rules/agent-rules.md`)**
This is the global behavioral rules template covering guardrails, context management, intake workflow, and verification steps. It is the single source of truth for all agent behavioral rules.

*Agent-Specific Filtering:* The function `loadRuleContent(agentId)` in `src/engine/adapters/shared.js` uses a regex to strip bullet points containing other agents' names. This means you can write agent-specific content (e.g., cache strategies) in a single file — just format agent-specific bullets as:
```markdown
- **Claude (Prefix & Lookback Integrity):** ...
- **Antigravity (Prefix Stability):** ...
- **Copilot (Context Efficiency):** ...
```
When generating for Claude, the Antigravity and Copilot bullets are automatically removed.

**Type B: Compact Rules (`EHA_COMPACT_RULES` in `src/engine/adapters/shared.js`)**
This is a condensed inline string that is injected into **every generated workflow and skill file**. It covers the 4-layer taxonomy, SDD rules, and doc ownership.

> **⚠️ CAUTION:** Editing `EHA_COMPACT_RULES` has cascading global impact. Every generated file for every agent will change. Only modify this when there are fundamental changes to the EHA documentation taxonomy or SDD philosophy.

---

### Recipe 5: Understanding Device vs. Project Installation

EHA supports two installation scopes:

**Project-Level (`eha` → scope "project" or `eha init`):**
- Writes files relative to the current project root (e.g., `.claude/`, `.github/`, `.agents/`)
- Tracked by `.eha/manifest.json` (project manifest) and `.eha/config.json`
- Orchestrated by `src/engine/actions/project.js` → `initProject()`
- Adapters use `generateFiles(rootDir, workflows, skills, agents)` → returns `{ relativePath, content }[]`

**Device-Level (`eha` → scope "device"):**
- Writes files to the user's home directory (e.g., `~/.claude/`, `~/.copilot/`, `~/.gemini/`)
- Tracked by `~/.eha/manifest.json` (device manifest)
- Orchestrated by `src/engine/actions/device.js` → `installDevice()`
- Adapters use `generateDeviceFiles(homeDir, workflows, skills, agents)` → returns `{ absolutePath, content, isSentinel }[]`
- Files marked `isSentinel: true` use sentinel block injection instead of full file writes

The device flow supports multi-agent installation in a single call (pass `agentIds: ['claude', 'copilot']`).

---

## 4. Quality Assurance (Testing)

EHA strictly uses the native Node.js test runner (`node:test`) and the native `node:assert` library. 

### Writing Sandbox Tests
Tests must never modify the actual repository contents. `test/engine.test.js` provides a `createSandbox()` function that utilizes `os.tmpdir()` to generate isolated directories.

Always wrap sandbox tests in a `try...finally` block to ensure cleanup, even on assertion failures:

```javascript
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { verifyProject } = require('../src/engine'); // Testing the public boundary

test('verifyProject returns failed status when uninitialized', () => {
  const rootDir = createSandbox(); 
  try {
    const result = verifyProject({ rootDir });
    assert.strictEqual(result.status, 'failed');
    assert.strictEqual(result.message, 'No agent configured.');
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});
```
To run the test suite, execute: `npm test`

### File Count Assertions
When writing tests for `initProject()`, the expected file count differs per agent (`A = listAgents().length`):
- **Claude:** `listWorkflows().length + listSkills().length + listAgents().length + 1` (1 rules file)
- **Copilot:** `listWorkflows().length + listSkills().length + listAgents().length + 2` (1 routing file + 1 rules file)
- **Antigravity:** `listWorkflows().length + listSkills().length + listAgents().length + 1` (1 rules file)
- **Gemini CLI:** `listWorkflows().length + listSkills().length + listAgents().length + 1` (1 GEMINI.md sentinel)
- **Hermes:** `listWorkflows().length + listSkills().length + listAgents().length + 1` (1 HERMES.md sentinel)
- **OpenCode:** `listWorkflows().length + listSkills().length + listAgents().length + 1` (1 rules file)

### Device-Level Tests
Use `createFakeHome()` (creates a temp directory simulating `$HOME`) instead of `createSandbox()` for device-level tests. Pass `homeDir: fakeHome` to `installDevice()` / `uninstallDevice()` to avoid touching the real home directory.

---

## 5. Local Testing & Verification

Before opening a PR, manually test the CLI in a dummy external project.

**Method A: npm link (Recommended)**
Symlinks your active EHA dev folder into your system's global `node_modules`.
```bash
# 1. In the EHA repository root:
$ npm link

# 2. In a separate dummy test project:
$ eha init
$ eha doctor

# 3. Cleanup when finished testing:
$ npm unlink -g @sallmarta/eye-hate-agent
```

**Method B: Direct Binary Invocation**
Execute the local binary directly in your test project to test changes without modifying global symlinks:
```bash
$ node /absolute/path/to/eye-hate-agent/bin/eha.js init
```

---

## 6. Publishing to NPM

EHA uses **NPM Provenance** via GitHub Actions. Maintainers should **never** run `npm publish` locally.

1.  Bump the `"version"` field in `package.json`.
2.  Run `npm install` to update `package-lock.json` accordingly.
3.  Commit all changes and push to the `main` branch.
4.  Navigate to the GitHub Repository → **Releases** → **Draft a new release**.
5.  Create a tag matching your exact version (e.g., `v1.0.4`), insert release notes, and click **Publish release**.
6.  The GitHub Action `.github/workflows/publish.yml` will automatically detect the release, securely authenticate via OIDC, and publish the package with a provenance badge.

---

## 7. Quick Reference: Files Touched per Operation

| Operation | Files Modified |
|:---|:---|
| Add a workflow | `docs/templates/reusable-prompts/<name>.md` (NEW), `src/engine/registry/workflows.js` |
| Add a skill | `docs/templates/skills/<name>/SKILL.md` (NEW), `src/engine/registry/skills.js` |
| Add a new agent | `src/engine/adapters/shared.js` (L5), `src/engine/adapters/<name>.js` (NEW), `src/engine/adapters/index.js`, `src/engine/adapters/shared.js` (L74+), `src/engine/actions/device.js` (L119), `bin/eha.js` (`AGENT_DISPLAY_NAMES` constant), `test/engine.test.js` |
| Add a CLI command | `src/engine/actions/<name>.js` (NEW or modify), `src/engine/index.js`, `bin/eha.js`, `test/engine.test.js` |
| Modify agent rules | `docs/templates/rules/agent-rules.md` |
| Modify compact rules | `src/engine/adapters/shared.js` (L7-L35) — **⚠️ global impact** |
| Add a state module | `src/engine/state/<name>.js` (NEW), optionally `src/engine/index.js` |