const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadRuleContent, buildDeviceRulesContent } = require('./shared');

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

function buildProjectRulesContent(workflows) {
  const rulesContent = loadRuleContent('gemini');
  const routes = workflows
    .map(w => `- \`${w.commandName}\` → \`.gemini/commands/eha-${w.commandName}.toml\``)
    .join('\n');
  const routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching command file:\n\n${routes}`;
  return `${rulesContent}${routingSection}`;
}

module.exports = {
  id: 'gemini',
  name: 'Gemini CLI',
  description: 'Generates Gemini CLI-compatible workflows in .gemini/commands/, skills in .gemini/skills/, and appends rules to GEMINI.md',
  generateFiles(rootDir, workflows, skills) {
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

    files.push({
      relativePath: 'GEMINI.md',
      content: buildProjectRulesContent(workflows),
      isSentinel: true,
    });

    return files;
  },
  generateDeviceFiles(homeDir, workflows, skills) {
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

    files.push({
      absolutePath: path.join(homeDir, '.gemini', 'GEMINI.md'),
      content: buildDeviceRulesContent('gemini', workflows),
      isSentinel: true,
    });

    return files;
  },
};
