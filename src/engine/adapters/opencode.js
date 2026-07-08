const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadAgentContent, loadRuleContent, buildDeviceRulesContent, buildSubagentRoutingSection } = require('./shared');

// ─── Project-Level Builders ──────────────────────────────────────────────────

// OpenCode commands use YAML frontmatter with a `description` field.
// They live in .opencode/commands/ and are invoked via `/command-name`.
function buildOpenCodeCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---
description: "EHA ${workflow.id} — ${workflow.description}"
---

${EHA_COMPACT_RULES}

---

${promptContent}`;
}

function buildOpenCodeSkillFile(skill) {
  return `---
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

// OpenCode agents use YAML frontmatter with `description` and optional
// `model`, `permissions` fields. Placed in .opencode/agents/.
function buildOpenCodeAgentFile(agent) {
  return loadAgentContent(agent);
}

function buildProjectRulesContent(workflows, options = {}) {
  const rulesContent = loadRuleContent('opencode');
  const routes = workflows
    .map(w => `- \`${w.commandName}\` → \`.opencode/commands/eha-${w.commandName}.md\``)
    .join('\n');
  const routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching command file:\n\n${routes}`;
  return `${rulesContent}${routingSection}${buildSubagentRoutingSection(options)}`;
}

// ─── Adapter Export ──────────────────────────────────────────────────────────

module.exports = {
  id: 'opencode',
  name: 'Open Code',
  description: 'Generates OpenCode-compatible commands in .opencode/commands/, agents in .opencode/agents/, and appends rules to AGENTS.md',
  generateFiles(rootDir, workflows, skills, agents, options = {}) {
    const files = [];

    // Generate Workflows → .opencode/commands/eha-<name>.md
    for (const workflow of workflows) {
      files.push({
        relativePath: path.join('.opencode', 'commands', `eha-${workflow.commandName}.md`),
        content: buildOpenCodeCommandFile(workflow),
        isSentinel: false,
      });
    }

    // Generate Skills → .opencode/commands/eha-<name>.md
    // OpenCode commands are the closest native equivalent to skills.
    for (const skill of skills) {
      files.push({
        relativePath: path.join('.opencode', 'commands', `eha-${skill.commandName}.md`),
        content: buildOpenCodeSkillFile(skill),
        isSentinel: false,
      });
    }

    // Generate Agents (subagents) → .opencode/agents/eha-<name>.md
    for (const agent of agents) {
      files.push({
        relativePath: path.join('.opencode', 'agents', `eha-${agent.commandName}.md`),
        content: buildOpenCodeAgentFile(agent),
        isSentinel: false,
      });
    }

    // Generate Rules → AGENTS.md (sentinel block — OpenCode reads this file)
    files.push({
      relativePath: 'AGENTS.md',
      content: buildProjectRulesContent(workflows, options),
      isSentinel: true,
    });

    return files;
  },
  generateDeviceFiles(homeDir, workflows, skills, agents, options = {}) {
    const files = [];

    // Generate Workflows → ~/.opencode/commands/eha-<name>.md
    for (const workflow of workflows) {
      files.push({
        absolutePath: path.join(homeDir, '.opencode', 'commands', `eha-${workflow.commandName}.md`),
        content: buildOpenCodeCommandFile(workflow),
        isSentinel: false,
      });
    }

    // Generate Skills → ~/.opencode/commands/eha-<name>.md
    for (const skill of skills) {
      files.push({
        absolutePath: path.join(homeDir, '.opencode', 'commands', `eha-${skill.commandName}.md`),
        content: buildOpenCodeSkillFile(skill),
        isSentinel: false,
      });
    }

    // Generate Agents (subagents) → ~/.opencode/agents/eha-<name>.md
    for (const agent of agents) {
      files.push({
        absolutePath: path.join(homeDir, '.opencode', 'agents', `eha-${agent.commandName}.md`),
        content: buildOpenCodeAgentFile(agent),
        isSentinel: false,
      });
    }

    // Generate Rules → ~/.opencode/rules/eha-agent-rules.md (EHA-owned, non-sentinel)
    files.push({
      absolutePath: path.join(homeDir, '.opencode', 'rules', 'eha-agent-rules.md'),
      content: buildDeviceRulesContent('opencode', workflows, options),
      isSentinel: false,
    });

    return files;
  },
};
