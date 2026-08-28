const path = require('node:path');

const SKILL_DEFINITIONS = {
  'analyze-system': {
    id: 'analyze-system',
    commandName: 'analyze-system',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'analyze-system', 'SKILL.md'),
  },
  'design-api': {
    id: 'design-api',
    commandName: 'design-api',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'design-api', 'SKILL.md'),
  },
  'design-db-schema': {
    id: 'design-db-schema',
    commandName: 'design-db-schema',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'design-db-schema', 'SKILL.md'),
  },
  'design-ui-ux': {
    id: 'design-ui-ux',
    commandName: 'design-ui-ux',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'design-ui-ux', 'SKILL.md'),
  },
  'design-wireframe': {
    id: 'design-wireframe',
    commandName: 'design-wireframe',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'design-wireframe', 'SKILL.md'),
  },
  'audit-code': {
    id: 'audit-code',
    commandName: 'audit-code',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'audit-code', 'SKILL.md'),
  },
  'audit-parity': {
    id: 'audit-parity',
    commandName: 'audit-parity',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'audit-parity', 'SKILL.md'),
  },
  'audit-security': {
    id: 'audit-security',
    commandName: 'audit-security',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'audit-security', 'SKILL.md'),
  },
  'test-system': {
    id: 'test-system',
    commandName: 'test-system',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'test-system', 'SKILL.md'),
  },
  'build-ci-cd': {
    id: 'build-ci-cd',
    commandName: 'build-ci-cd',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'build-ci-cd', 'SKILL.md'),
  },
  'build-logging': {
    id: 'build-logging',
    commandName: 'build-logging',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'build-logging', 'SKILL.md'),
  },
  'refactor': {
    id: 'refactor',
    commandName: 'refactor',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'refactor', 'SKILL.md'),
  },
  'generate-api-contract': {
    id: 'generate-api-contract',
    commandName: 'generate-api-contract',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'generate-api-contract', 'SKILL.md'),
  },
  'analyze-design': {
    id: 'analyze-design',
    commandName: 'analyze-design',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'analyze-design', 'SKILL.md'),
  },
  'generate-fsd': {
    id: 'generate-fsd',
    commandName: 'generate-fsd',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'generate-fsd', 'SKILL.md'),
  },
  'generate-task-tracker': {
    id: 'generate-task-tracker',
    commandName: 'generate-task-tracker',
    repoRelativePath: path.join('docs', 'templates', 'skills', 'generate-task-tracker', 'SKILL.md'),
  },
};

function listSkills() {
  return Object.values(SKILL_DEFINITIONS).map((skill) => ({ ...skill }));
}

module.exports = {
  listSkills,
};
