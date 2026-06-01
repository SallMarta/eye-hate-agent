const path = require('node:path');

const SKILL_DEFINITIONS = {
  'system-analysis': {
    id: 'system-analysis',
    commandName: 'system-analysis',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'system-analysis', 'SKILL.md'),
  },
  'api-design': {
    id: 'api-design',
    commandName: 'api-design',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'api-design', 'SKILL.md'),
  },
  'db-schema-design': {
    id: 'db-schema-design',
    commandName: 'db-schema-design',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'db-schema-design', 'SKILL.md'),
  },
  'ui-ux-design': {
    id: 'ui-ux-design',
    commandName: 'ui-ux-design',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'ui-ux-design', 'SKILL.md'),
  },
  'wireframing': {
    id: 'wireframing',
    commandName: 'wireframing',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'wireframing', 'SKILL.md'),
  },
  'code-audit': {
    id: 'code-audit',
    commandName: 'code-audit',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'code-audit', 'SKILL.md'),
  },
  'parity-audit': {
    id: 'parity-audit',
    commandName: 'parity-audit',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'parity-audit', 'SKILL.md'),
  },
  'security-audit': {
    id: 'security-audit',
    commandName: 'security-audit',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'security-audit', 'SKILL.md'),
  },
  'system-tester': {
    id: 'system-tester',
    commandName: 'system-tester',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'system-tester', 'SKILL.md'),
  },
  'devops-ci-cd': {
    id: 'devops-ci-cd',
    commandName: 'devops-ci-cd',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'devops-ci-cd', 'SKILL.md'),
  },
  'observability': {
    id: 'observability',
    commandName: 'observability',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'observability', 'SKILL.md'),
  },
  'refactor': {
    id: 'refactor',
    commandName: 'refactor',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'refactor', 'SKILL.md'),
  },
};

function listSkills() {
  return Object.values(SKILL_DEFINITIONS).map((skill) => ({ ...skill }));
}

module.exports = {
  listSkills,
};
