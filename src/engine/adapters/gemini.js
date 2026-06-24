const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadAgentContent, loadRuleContent, buildDeviceRulesContent, buildSubagentRoutingSection } = require('./shared');

function buildGeminiCommandFile(workflow) {
  const promptContent = loadPromptContent(workflow);
  return `description = "EHA ${workflow.id} — ${workflow.description}"
prompt = """
${EHA_COMPACT_RULES}

---

${promptContent}
"""`;
}

function buildGeminiSkillFile(skill) {
  return `---
name: "eha-${skill.commandName}"
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

function buildGeminiAgentFile(agent) {
  // Gemini CLI does not yet support user-defined agent files, but generating
  // them in a sensible location means support is ready when the platform adds it.
  return loadAgentContent(agent);
}

function buildProjectRulesContent(workflows, options = {}) {
  const rulesContent = loadRuleContent('gemini');
  const routes = workflows
    .map(w => `- \`${w.commandName}\` → \`.gemini/commands/eha-${w.commandName}.toml\``)
    .join('\n');
  const routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching command file:\n\n${routes}`;
  return `${rulesContent}${routingSection}${buildSubagentRoutingSection(options)}`;
}

module.exports = {
  id: 'gemini',
  name: 'Gemini CLI',
  description: 'Generates Gemini CLI-compatible workflows in .gemini/commands/, skills in .gemini/skills/, agents in .gemini/agents/, and appends rules to GEMINI.md',
  generateFiles(rootDir, workflows, skills, agents, options = {}) {
    const files = [];
    for (const workflow of workflows) {
      files.push({
        relativePath: path.join('.gemini', 'commands', `eha-${workflow.commandName}.toml`),
        content: buildGeminiCommandFile(workflow),
        isSentinel: false,
      });
    }
    for (const skill of skills) {
      files.push({
        relativePath: path.join('.gemini', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildGeminiSkillFile(skill),
        isSentinel: false,
      });
    }
    for (const agent of agents) {
      files.push({
        relativePath: path.join('.gemini', 'agents', `eha-${agent.commandName}.md`),
        content: buildGeminiAgentFile(agent),
        isSentinel: false,
      });
    }

    files.push({
      relativePath: 'GEMINI.md',
      content: buildProjectRulesContent(workflows, options),
      isSentinel: true,
    });

    return files;
  },
  generateDeviceFiles(homeDir, workflows, skills, agents, options = {}) {
    const files = [];

    for (const workflow of workflows) {
      files.push({
        absolutePath: path.join(homeDir, '.gemini', 'commands', `eha-${workflow.commandName}.toml`),
        content: buildGeminiCommandFile(workflow),
        isSentinel: false,
      });
    }
    for (const skill of skills) {
      files.push({
        absolutePath: path.join(homeDir, '.gemini', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildGeminiSkillFile(skill),
        isSentinel: false,
      });
    }
    for (const agent of agents) {
      files.push({
        absolutePath: path.join(homeDir, '.gemini', 'agents', `eha-${agent.commandName}.md`),
        content: buildGeminiAgentFile(agent),
        isSentinel: false,
      });
    }

    files.push({
      absolutePath: path.join(homeDir, '.gemini', 'GEMINI.md'),
      content: buildDeviceRulesContent('gemini', workflows, options),
      isSentinel: true,
    });

    return files;
  },
};
