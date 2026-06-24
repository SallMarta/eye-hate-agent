const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadAgentContent, loadRuleContent, buildDeviceRulesContent, buildSubagentRoutingSection } = require('./shared');

function buildClaudeCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---
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

function buildClaudeAgentFile(agent) {
  // Claude agents are written in canonical YAML; pass the template through
  // unchanged (frontmatter with name/description/tools is consumed directly).
  return loadAgentContent(agent);
}

function buildClaudeRuleFile(options = {}) {
  return `---
description: "EHA agent rules"
---

${loadRuleContent('claude')}${buildSubagentRoutingSection(options)}`;
}

module.exports = {
  id: 'claude',
  name: 'Claude',
  description: 'Generates .claude/commands/eha/ slash command files, .claude/skills/, .claude/agents/, and .claude/rules/',
  generateFiles(rootDir, workflows, skills, agents, options = {}) {
    const files = [];
    for (const workflow of workflows) {
      files.push({
        relativePath: path.join('.claude', 'commands', 'eha', `eha-${workflow.commandName}.md`),
        content: buildClaudeCommandFile(workflow),
      });
    }
    for (const skill of skills) {
      files.push({
        relativePath: path.join('.claude', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildClaudeSkillFile(skill),
      });
    }
    for (const agent of agents) {
      files.push({
        relativePath: path.join('.claude', 'agents', `eha-${agent.commandName}.md`),
        content: buildClaudeAgentFile(agent),
      });
    }

    files.push({
      relativePath: path.join('.claude', 'rules', 'eha-agent-rules.md'),
      content: buildClaudeRuleFile(options),
    });

    return files;
  },
  generateDeviceFiles(homeDir, workflows, skills, agents, options = {}) {
    const files = [];

    for (const workflow of workflows) {
      files.push({
        absolutePath: path.join(homeDir, '.claude', 'commands', 'eha', `eha-${workflow.commandName}.md`),
        content: buildClaudeCommandFile(workflow),
        isSentinel: false,
      });
    }

    for (const skill of skills) {
      files.push({
        absolutePath: path.join(homeDir, '.claude', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildClaudeSkillFile(skill),
        isSentinel: false,
      });
    }

    for (const agent of agents) {
      files.push({
        absolutePath: path.join(homeDir, '.claude', 'agents', `eha-${agent.commandName}.md`),
        content: buildClaudeAgentFile(agent),
        isSentinel: false,
      });
    }

    files.push({
      absolutePath: path.join(homeDir, '.claude', 'rules', 'eha-agent-rules.md'),
      content: buildDeviceRulesContent('claude', workflows, options),
      isSentinel: false,
    });

    return files;
  },
};
