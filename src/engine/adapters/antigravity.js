const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadRuleContent, buildDeviceRulesContent } = require('./shared');

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

module.exports = {
  id: 'antigravity',
  name: 'Antigravity',
  description: 'Generates Antigravity-compatible workflows in .agents/workflows/, skills in .agents/skills/, and rules in .agents/rules/',
  generateFiles(rootDir, workflows, skills) {
    const files = [];
    for (const workflow of workflows) {
      files.push({
        relativePath: path.join('.agents', 'workflows', `eha-${workflow.commandName}.md`),
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

    for (const workflow of workflows) {
      files.push({
        absolutePath: path.join(homeDir, '.gemini', 'config', 'global_workflows', `eha-${workflow.commandName}.md`),
        content: buildAntigravityCommandFile(workflow),
        isSentinel: false,
      });
    }
    for (const skill of skills) {
      files.push({
        absolutePath: path.join(homeDir, '.gemini', 'config', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildAntigravitySkillFile(skill),
        isSentinel: false,
      });
    }

    files.push({
      absolutePath: path.join(homeDir, '.gemini', 'GEMINI.md'),
      content: buildDeviceRulesContent('antigravity', workflows),
      isSentinel: true,
    });

    return files;
  },
};
