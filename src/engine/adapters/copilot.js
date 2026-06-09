const path = require('node:path');
const { EHA_COMPACT_RULES, loadPromptContent, loadSkillContent, loadRuleContent } = require('./shared');

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

function buildCopilotSkillFile(skill) {
  return `---
mode: agent
description: "EHA skill — ${skill.commandName}"
---

${EHA_COMPACT_RULES}

---

${loadSkillContent(skill)}`;
}

function buildCopilotRuleFile() {
  return `---
description: "EHA agent rules"
applyTo: "**"
---

${loadRuleContent('copilot')}`;
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
    .map(w => `- \`${w.commandName}\` → \`~/.copilot/skills/eha-${w.commandName}/SKILL.md\``)
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

module.exports = {
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

    for (const workflow of workflows) {
      files.push({
        absolutePath: path.join(homeDir, '.copilot', 'skills', `eha-${workflow.commandName}`, 'SKILL.md'),
        content: buildCopilotPromptFile(workflow),
        isSentinel: false,
      });
    }

    for (const skill of skills) {
      files.push({
        absolutePath: path.join(homeDir, '.copilot', 'skills', `eha-${skill.commandName}`, 'SKILL.md'),
        content: buildCopilotDeviceSkillFile(skill),
        isSentinel: false,
      });
    }

    files.push({
      absolutePath: path.join(homeDir, '.copilot', 'instructions', 'eha-agent-rules.instructions.md'),
      content: buildCopilotDeviceInstructionsFile(workflows),
      isSentinel: false,
    });

    return files;
  },
};
