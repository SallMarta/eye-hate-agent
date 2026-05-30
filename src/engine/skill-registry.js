const path = require('node:path');

const SKILL_DEFINITIONS = {
  analysis: {
    id: 'analysis',
    commandName: 'analysis',
    repoRelativePath: path.join('docs', 'vibes', 'skills', 'analysis', 'SKILL.md'),
  },
  'api-design': {
    id: 'api-design',
    commandName: 'api-design',
    repoRelativePath: path.join('docs', 'vibes', 'skills', 'api-design', 'SKILL.md'),
  },
  'code-audit': {
    id: 'code-audit',
    commandName: 'code-audit',
    repoRelativePath: path.join('docs', 'vibes', 'skills', 'code-audit', 'SKILL.md'),
  },
  'full-verification': {
    id: 'full-verification',
    commandName: 'full-verification',
    repoRelativePath: path.join('docs', 'vibes', 'skills', 'full-verification', 'SKILL.md'),
  },
  parity: {
    id: 'parity',
    commandName: 'parity',
    repoRelativePath: path.join('docs', 'vibes', 'skills', 'parity', 'SKILL.md'),
  },
  'project-elevation': {
    id: 'project-elevation',
    commandName: 'project-elevation',
    repoRelativePath: path.join('docs', 'vibes', 'skills', 'project-elevation', 'SKILL.md'),
  },
  'test-authoring': {
    id: 'test-authoring',
    commandName: 'test-authoring',
    repoRelativePath: path.join('docs', 'vibes', 'skills', 'test-authoring', 'SKILL.md'),
  },
};

function listSkills() {
  return Object.values(SKILL_DEFINITIONS).map((skill) => ({ ...skill }));
}

module.exports = {
  listSkills,
};
