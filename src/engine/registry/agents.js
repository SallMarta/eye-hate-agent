const path = require('node:path');

const AGENT_DEFINITIONS = {
  'security': {
    id: 'security',
    commandName: 'security',
    // Routing hint: when subagent auto-routing is enabled, requests matching
    // this pattern are delegated to this subagent instead of handled inline.
    trigger: 'Security review, vulnerabilities, auth/session/secret handling',
    repoRelativePath: path.join('docs', 'templates', 'agents', 'security', 'AGENT.md'),
  },
  'tester': {
    id: 'tester',
    commandName: 'tester',
    trigger: 'Writing, running, or verifying tests for a change',
    repoRelativePath: path.join('docs', 'templates', 'agents', 'tester', 'AGENT.md'),
  },
  'parity': {
    id: 'parity',
    commandName: 'parity',
    trigger: 'Doc drift / spec-vs-code mismatch / parity check',
    repoRelativePath: path.join('docs', 'templates', 'agents', 'parity', 'AGENT.md'),
  },
  'analyst': {
    id: 'analyst',
    commandName: 'analyst',
    trigger: 'Exploring, explaining, or summarizing an unfamiliar area',
    repoRelativePath: path.join('docs', 'templates', 'agents', 'analyst', 'AGENT.md'),
  },
};

function listAgents() {
  return Object.values(AGENT_DEFINITIONS).map((agent) => ({ ...agent }));
}

module.exports = {
  listAgents,
};
