const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadRuleContent, buildDeviceRulesContent } = require('./shared');

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

function buildClaudeRuleFile() {
  return `---
description: "EHA agent rules"
---

${loadRuleContent('claude')}`;
}

module.exports = {
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
        relativePath: path.join('.claude', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
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

    files.push({
      absolutePath: path.join(homeDir, '.claude', 'rules', 'eha-agent-rules.md'),
      content: buildDeviceRulesContent('claude', workflows),
      isSentinel: false,
    });

    return files;
  },
};
