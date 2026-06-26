const path = require('node:path');

const WORKFLOW_DEFINITIONS = {
  help: {
    id: 'help',
    commandName: 'help',
    description: 'Get help and tutorial on EHA workflows and philosophy',
    repoRelativePath: path.join('docs', 'templates', 'reusable-prompts', '00-eha-help.md'),
  },
  bootstrap: {
    id: 'bootstrap',
    commandName: 'bootstrap',
    description: 'Generate the initial project documentation set',
    repoRelativePath: path.join('docs', 'templates', 'reusable-prompts', '00-project-docs-bootstrap.md'),
  },
  refresh: {
    id: 'refresh',
    commandName: 'refresh',
    description: 'Refresh project docs after a change in scope, stack, or behavior',
    repoRelativePath: path.join('docs', 'templates', 'reusable-prompts', '00-project-docs-refresh.md'),
  },
  discuss: {
    id: 'discuss',
    commandName: 'discuss',
    description: 'Brainstorm and finalize a feature spec before implementation',
    repoRelativePath: path.join('docs', 'templates', 'reusable-prompts', '02-sdd-discuss.md'),
  },
  'sdd-execute': {
    id: 'sdd-execute',
    commandName: 'sdd-execute',
    description: 'Translate a project specification into tested, working code',
    repoRelativePath: path.join('docs', 'templates', 'reusable-prompts', '01-sdd-execute.md'),
  },
  'execute-phase': {
    id: 'execute-phase',
    commandName: 'execute-phase',
    description: 'Execute a specific project phase from docs/project-docs/foundation/phases/',
    repoRelativePath: path.join('docs', 'templates', 'reusable-prompts', '03-execute-phase.md'),
  },
};

const WORKFLOW_ALIASES = {
  'phase-execute': 'execute-phase',
  'run-phase': 'execute-phase',
};

function normalizeWorkflowId(input) {
  if (!input) {
    throw new Error('Workflow id is required');
  }

  const key = String(input).trim().toLowerCase();
  return WORKFLOW_ALIASES[key] || key;
}

function getWorkflow(workflowId) {
  const normalizedId = normalizeWorkflowId(workflowId);
  const workflow = WORKFLOW_DEFINITIONS[normalizedId];

  if (!workflow) {
    throw new Error(`Unknown workflow: ${workflowId}`);
  }

  return { ...workflow };
}

function listWorkflows() {
  return Object.values(WORKFLOW_DEFINITIONS).map((workflow) => ({ ...workflow }));
}

module.exports = {
  getWorkflow,
  listWorkflows,
  normalizeWorkflowId,
};
