'use strict';

const fs = require('node:fs');
const path = require('node:path');

const { getBundledAssetPath } = require('./state');

const SUPPORTED_AGENT_IDS = ['claude', 'copilot', 'antigravity'];

// Compact EHA rules embedded in every generated command file so the agent
// has all structural context without needing any external file reference.
const EHA_COMPACT_RULES = `## EHA Project Doc Rules

**4-Layer Taxonomy.** All project docs live under \`docs/project-docs/\`:
- \`foundation/\` — prd, architecture, workflow, status, phases, changelog, feature-inventory
- \`operations/\` — ci-cd, production-runbook, governance, compliance, observability, security
- \`development/\` — testing, api-contract, database, ui-ux, error-handling, internationalization
- \`technical-guidelines/\` — domain-specific cross-cutting rules (API, database, logging, etc.)

**Legacy/Reference Docs:** Treat folders named \`archive/\`, \`docs-legacy/\`, or \`reference/\` as secondary migration input only, never as authoritative active truth.

**Mandatory core docs:** \`index.md\`, \`getting-started.md\`, \`foundation/prd.md\`, \`foundation/architecture.md\`, \`foundation/workflow.md\`, \`foundation/status.md\`, \`operations/ci-cd.md\`, \`operations/production-runbook.md\`, \`development/testing.md\`, \`development/api-contract.md\`, \`development/database.md\`, \`development/ui-ux.md\`.

**Authority order:** project docs → codebase → agent judgment. When docs conflict, the owning doc wins. When code and docs conflict and authority is unclear, surface the conflict and ask the user — do not guess.

**Universal stable headings (every file):** Description, Important, Table of Contents, Scope, Goals, Non Goals.

**Key ownership rules:**
- Vision, personas, requirements → \`foundation/prd.md\`
- Stack and architecture → \`foundation/architecture.md\`
- Dev loop and PR process → \`foundation/workflow.md\`
- Verification commands and quality gates → \`development/testing.md\`
- Execution plan and progress → \`foundation/status.md\`
- Sprint tracking and backlogs → \`foundation/phases/\`
- Optional doc inventory → \`index.md\`
- Domain-specific technical rules → \`technical-guidelines/\` (Create these only for durable cross-cutting rules; avoid placeholders).

**SDD rule:** Specifications dictate implementation. Follow a strict 4-step workflow: 1. Update project docs first, 2. Generate tests based on the specs, 3. Generate code to pass the tests, 4. Logically map every code change back to a spec requirement. Refuse to write code for features not in the spec.

**Flexible Baselines Principle:** Omit docs the repo doesn't need. Mark unknowns as \`TBD\` or \`Assumption\`. Mark inferred facts as \`Inferred from codebase\` until the user confirms them.`;

function loadPromptContent(workflow) {
  const promptPath = getBundledAssetPath(workflow.repoRelativePath);
  const raw = fs.readFileSync(promptPath, 'utf8');
  // Remove the "Read `docs/eyehateagent-contract.md` first." line — the
  // compact rules block replaces that dependency.
  return raw
    .split('\n')
    .filter((line) => !line.includes('docs/eyehateagent-contract.md'))
    .join('\n')
    .replace(/^\n+/, '');
}

function loadSkillContent(skill) {
  const promptPath = getBundledAssetPath(skill.repoRelativePath);
  const raw = fs.readFileSync(promptPath, 'utf8');
  const parts = raw.split(/^---\r?\n/m);
  let body = parts.length > 2 ? parts.slice(2).join('---\n') : raw;
  return body
    .split('\n')
    .filter((line) => !line.includes('docs/eyehateagent-contract.md'))
    .join('\n')
    .replace(/^\n+/, '');
}

function loadRuleContent(agentId) {
  const rulePath = getBundledAssetPath(path.join('docs', 'templates', 'rules', 'agent-rules.md'));
  let content = fs.readFileSync(rulePath, 'utf8').replace(/^\n+/, '');
  
  if (agentId) {
    const agentsToFilter = SUPPORTED_AGENT_IDS.filter(a => a !== agentId.toLowerCase());
    for (const a of agentsToFilter) {
      const regex = new RegExp(`^\\s*-\\s*\\*\\*${a}.*$\\n?`, 'gmi');
      content = content.replace(regex, '');
    }
  }
  
  return content;
}

function buildClaudeCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---
description: "EHA ${workflow.id} — ${workflow.description}"
---

${EHA_COMPACT_RULES}

---

${promptContent}`;
}

function buildCopilotPromptFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---
mode: agent
description: "EHA ${workflow.id} — ${workflow.description}"
---

${EHA_COMPACT_RULES}

---

${promptContent}`;
}

function buildClaudeSkillFile(skill) {
  return `---
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

function buildCopilotSkillFile(skill) {
  return `---
mode: agent
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

function buildClaudeRuleFile() {
  return `---
description: "EHA agent rules"
---

${loadRuleContent('claude')}`;
}

function buildCopilotRuleFile() {
  return `---
description: "EHA agent rules"
applyTo: "**"
---

${loadRuleContent('copilot')}`;
}

function buildAntigravityCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---
name: "eha-${workflow.commandName}"
description: "EHA ${workflow.id} — ${workflow.description}"
---

${EHA_COMPACT_RULES}

---

${promptContent}`;
}

function buildAntigravitySkillFile(skill) {
  return `---
name: "eha-${skill.commandName}"
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

function buildAntigravityRuleFile() {
  return `---
name: "eha-agent-rules"
description: "EHA agent rules"
---

${loadRuleContent('antigravity')}`;
}

function buildCopilotInstructionsFile(workflows) {
  const workflowTable = workflows
    .map((w) => `- \`${w.commandName}\` → \`.github/prompts/eha-${w.commandName}.prompt.md\``)
    .join('\n');

  return `---
description: "EHA workflow routing for GitHub Copilot"
applyTo: "**"
---

# EHA Workflows

When a user asks to run an EHA workflow, use the matching prompt file below.

${workflowTable}`;
}

function buildDeviceRulesContent(agentId, workflows) {
  const rulesContent = loadRuleContent(agentId);

  let routingSection = '';
  if (agentId === 'claude') {
    const routes = workflows
      .map(w => `- \`${w.commandName}\` → \`~/.claude/commands/eha/eha-${w.commandName}.md\``)
      .join('\n');
    routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching command file:\n\n${routes}`;
  } else if (agentId === 'antigravity') {
    const routes = workflows
      .map(w => `- \`${w.commandName}\` → \`~/.gemini/config/global_workflows/eha-${w.commandName}.md\``)
      .join('\n');
    routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching workflow file:\n\n${routes}`;
  }

  return `${rulesContent}${routingSection}`;
}

function buildCopilotDeviceSkillFile(skill) {
  return `---
name: "eha-${skill.commandName}"
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

function buildCopilotDeviceInstructionsFile(workflows) {
  const workflowTable = workflows
    .map(w => `- \`${w.commandName}\` → \`~/.copilot/prompts/eha-${w.commandName}.prompt.md\``)
    .join('\n');

  return `---
description: "EHA workflow routing and agent rules for GitHub Copilot"
applyTo: "**"
---

${loadRuleContent('copilot')}

# EHA Workflow Routing

When a user asks to run an EHA workflow, use the matching prompt file:

${workflowTable}`;
}

const RUNTIME_ADAPTERS = {
  claude: {
    id: 'claude',
    name: 'Claude',
    description: 'Generates .claude/commands/eha/ slash command files, .claude/skills/ and .claude/rules/',
    generateFiles(rootDir, workflows, skills) {
      const files = [];
      for (const workflow of workflows) {
        files.push({
          relativePath: path.join('.claude', 'commands', 'eha', `eha-${workflow.commandName}.md`),
          content: buildClaudeCommandFile(workflow),
        });
      }
      for (const skill of skills) {
        files.push({
          relativePath: path.join('.claude', 'skills', `eha-${skill.commandName}.md`),
          content: buildClaudeSkillFile(skill),
        });
      }
      
      files.push({
        relativePath: path.join('.claude', 'rules', 'eha-agent-rules.md'),
        content: buildClaudeRuleFile(),
      });
      
      return files;
    },
    generateDeviceFiles(homeDir, workflows, skills) {
      const files = [];

      // Commands → ~/.claude/commands/eha/
      for (const workflow of workflows) {
        files.push({
          absolutePath: path.join(homeDir, '.claude', 'commands', 'eha', `eha-${workflow.commandName}.md`),
          content: buildClaudeCommandFile(workflow),
          isSentinel: false,
        });
      }

      // Skills → ~/.claude/skills/eha-<name>/SKILL.md
      for (const skill of skills) {
        files.push({
          absolutePath: path.join(homeDir, '.claude', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
          content: buildClaudeSkillFile(skill),
          isSentinel: false,
        });
      }

      // Rules → ~/.claude/rules/eha-agent-rules.md (own file, not sentinel)
      files.push({
        absolutePath: path.join(homeDir, '.claude', 'rules', 'eha-agent-rules.md'),
        content: buildDeviceRulesContent('claude', workflows),
        isSentinel: false,
      });

      return files;
    },
  },
  copilot: {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'Generates .github/prompts/ reusable prompt files, skills, and always-on instruction rules',
    generateFiles(rootDir, workflows, skills) {
      const files = [];
      for (const workflow of workflows) {
        files.push({
          relativePath: path.join('.github', 'prompts', `eha-${workflow.commandName}.prompt.md`),
          content: buildCopilotPromptFile(workflow),
        });
      }
      files.push({
        relativePath: path.join('.github', 'instructions', 'eha-workflows.instructions.md'),
        content: buildCopilotInstructionsFile(workflows),
      });
      
      for (const skill of skills) {
        files.push({
          relativePath: path.join('.github', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
          content: buildCopilotSkillFile(skill),
        });
      }
      
      files.push({
        relativePath: path.join('.github', 'instructions', 'eha-agent-rules.instructions.md'),
        content: buildCopilotRuleFile(),
      });
      
      return files;
    },
    generateDeviceFiles(homeDir, workflows, skills) {
      const files = [];

      // Prompts → ~/.copilot/prompts/eha-<name>.prompt.md
      for (const workflow of workflows) {
        files.push({
          absolutePath: path.join(homeDir, '.copilot', 'prompts', `eha-${workflow.commandName}.prompt.md`),
          content: buildCopilotPromptFile(workflow),
          isSentinel: false,
        });
      }

      // Skills → ~/.copilot/skills/eha-<name>/SKILL.md
      for (const skill of skills) {
        files.push({
          absolutePath: path.join(homeDir, '.copilot', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
          content: buildCopilotDeviceSkillFile(skill),
          isSentinel: false,
        });
      }

      // Instructions → ~/.copilot/instructions/eha.instructions.md (own file, NOT sentinel)
      files.push({
        absolutePath: path.join(homeDir, '.copilot', 'instructions', 'eha.instructions.md'),
        content: buildCopilotDeviceInstructionsFile(workflows),
        isSentinel: false,
      });

      return files;
    },
  },
  antigravity: {
    id: 'antigravity',
    name: 'Antigravity',
    description: 'Generates Antigravity-compatible workflows in .agents/workflows/, skills in .agents/skills/, and rules in .agents/rules/',
    generateFiles(rootDir, workflows, skills) {
      const files = [];
      for (const workflow of workflows) {
        files.push({
          relativePath: path.join('.agents', 'workflows', `eha-${workflow.commandName}`, 'SKILL.md'),
          content: buildAntigravityCommandFile(workflow),
        });
      }
      for (const skill of skills) {
        files.push({
          relativePath: path.join('.agents', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
          content: buildAntigravitySkillFile(skill),
        });
      }
      
      files.push({
        relativePath: path.join('.agents', 'rules', 'eha-agent-rules.md'),
        content: buildAntigravityRuleFile(),
      });
      
      return files;
    },
    generateDeviceFiles(homeDir, workflows, skills) {
      const files = [];

      // Workflows → ~/.gemini/config/global_workflows/eha-<name>.md
      for (const workflow of workflows) {
        files.push({
          absolutePath: path.join(homeDir, '.gemini', 'config', 'global_workflows', `eha-${workflow.commandName}.md`),
          content: buildAntigravityCommandFile(workflow),
          isSentinel: false,
        });
      }
      for (const skill of skills) {
        files.push({
          absolutePath: path.join(homeDir, '.gemini', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
          content: buildAntigravitySkillFile(skill),
          isSentinel: false,
        });
      }

      // Rules → ~/.gemini/GEMINI.md (sentinel block)
      files.push({
        absolutePath: path.join(homeDir, '.gemini', 'GEMINI.md'),
        content: buildDeviceRulesContent('antigravity', workflows),
        isSentinel: true,
      });

      return files;
    },
  },
};

function getRuntimeAdapter(agentId) {
  const adapter = RUNTIME_ADAPTERS[String(agentId).trim().toLowerCase()];
  if (!adapter) {
    throw new Error(`Unsupported agent: ${agentId}. Choose one of: ${Object.keys(RUNTIME_ADAPTERS).join(', ')}.`);
  }
  return adapter;
}

function listSupportedRuntimes() {
  return Object.values(RUNTIME_ADAPTERS).map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
  }));
}

module.exports = {
  getRuntimeAdapter,
  listSupportedRuntimes,
  SUPPORTED_AGENT_IDS,
};
