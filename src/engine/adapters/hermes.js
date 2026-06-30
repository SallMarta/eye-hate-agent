const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadAgentContent, loadRuleContent, buildDeviceRulesContent, buildSubagentRoutingSection } = require('./shared');

function buildHermesCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `---
name: "eha-${workflow.commandName}"
description: "EHA ${workflow.id} — ${workflow.description}"
---

${EHA_COMPACT_RULES}

---

${promptContent}`;
}

function buildHermesSkillFile(skill) {
  return `---
name: "eha-${skill.commandName}"
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

function buildHermesAgentFile(agent) {
  // Hermes does not yet support user-defined agent files natively, but generating
  // them in a sensible location means support is ready when the platform adds it.
  return loadAgentContent(agent);
}

function buildProjectRulesContent(workflows, options = {}) {
  const rulesContent = loadRuleContent('hermes');
  const routes = workflows
    .map(w => `- \`${w.commandName}\` → \`.hermes/skills/eha-${w.commandName}/SKILL.md\``)
    .join('\n');
  const routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching skill:\n\n${routes}`;
  return `${rulesContent}${routingSection}${buildSubagentRoutingSection(options)}`;
}

module.exports = {
  id: 'hermes',
  name: 'Hermes',
  description: 'Generates Hermes-compatible skills in .hermes/skills/, agents in .hermes/agents/, and appends rules to HERMES.md',
  generateFiles(rootDir, workflows, skills, agents, options = {}) {
    const files = [];

    // Generate Workflows (mapped to skills — Hermes treats all skills as slash commands)
    for (const workflow of workflows) {
      files.push({
        relativePath: path.join('.hermes', 'skills', `eha-${workflow.commandName}`, 'SKILL.md'),
        content: buildHermesCommandFile(workflow),
        isSentinel: false,
      });
    }

    // Generate Skills
    for (const skill of skills) {
      files.push({
        relativePath: path.join('.hermes', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildHermesSkillFile(skill),
        isSentinel: false,
      });
    }

    // Generate Agents (subagents)
    for (const agent of agents) {
      files.push({
        relativePath: path.join('.hermes', 'agents', `eha-${agent.commandName}.md`),
        content: buildHermesAgentFile(agent),
        isSentinel: false,
      });
    }

    // Generate Rules — written to HERMES.md with sentinel block
    files.push({
      relativePath: 'HERMES.md',
      content: buildProjectRulesContent(workflows, options),
      isSentinel: true,
    });

    return files;
  },
  generateDeviceFiles(homeDir, workflows, skills, agents, options = {}) {
    const files = [];

    // Generate Workflows (mapped to skills)
    for (const workflow of workflows) {
      files.push({
        absolutePath: path.join(homeDir, '.hermes', 'skills', `eha-${workflow.commandName}`, 'SKILL.md'),
        content: buildHermesCommandFile(workflow),
        isSentinel: false,
      });
    }

    // Generate Skills
    for (const skill of skills) {
      files.push({
        absolutePath: path.join(homeDir, '.hermes', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildHermesSkillFile(skill),
        isSentinel: false,
      });
    }

    // Generate Agents (subagents) — placed in skills dir as skill-based agents
    for (const agent of agents) {
      files.push({
        absolutePath: path.join(homeDir, '.hermes', 'skills', `eha-${agent.commandName}-agent`, 'SKILL.md'),
        content: buildHermesAgentFile(agent),
        isSentinel: false,
      });
    }

    // Generate Rules — written to ~/.hermes/SOUL.md with sentinel block
    files.push({
      absolutePath: path.join(homeDir, '.hermes', 'SOUL.md'),
      content: buildDeviceRulesContent('hermes', workflows, options),
      isSentinel: true,
    });

    return files;
  },
};
