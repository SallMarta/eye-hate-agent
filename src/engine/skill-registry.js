const path = require('node:path');

const SKILL_DEFINITIONS = {
  'system-analysis': {
    id: 'system-analysis',
    commandName: 'system-analysis',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'architecture', 'system-analysis', 'SKILL.md'),
  },
  'api-design': {
    id: 'api-design',
    commandName: 'api-design',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'architecture', 'api-design', 'SKILL.md'),
  },
  'db-schema-design': {
    id: 'db-schema-design',
    commandName: 'db-schema-design',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'architecture', 'db-schema-design', 'SKILL.md'),
  },
  'test-authoring': {
    id: 'test-authoring',
    commandName: 'test-authoring',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'engineering', 'test-authoring', 'SKILL.md'),
  },
  'ui-ux-implementation': {
    id: 'ui-ux-implementation',
    commandName: 'ui-ux-implementation',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'engineering', 'ui-ux-implementation', 'SKILL.md'),
  },
  'refactor-specialist': {
    id: 'refactor-specialist',
    commandName: 'refactor-specialist',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'engineering', 'refactor-specialist', 'SKILL.md'),
  },
  'security-audit': {
    id: 'security-audit',
    commandName: 'security-audit',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'auditing', 'security-audit', 'SKILL.md'),
  },
  'full-verification': {
    id: 'full-verification',
    commandName: 'full-verification',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'auditing', 'full-verification', 'SKILL.md'),
  },
  'parity': {
    id: 'parity',
    commandName: 'parity',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'auditing', 'parity', 'SKILL.md'),
  },
  'ci-cd-authoring': {
    id: 'ci-cd-authoring',
    commandName: 'ci-cd-authoring',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'operations', 'ci-cd-authoring', 'SKILL.md'),
  },
  'observability-setup': {
    id: 'observability-setup',
    commandName: 'observability-setup',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'operations', 'observability-setup', 'SKILL.md'),
  },
};

function listSkills() {
  return Object.values(SKILL_DEFINITIONS).map((skill) => ({ ...skill }));
}

module.exports = {
  listSkills,
};
