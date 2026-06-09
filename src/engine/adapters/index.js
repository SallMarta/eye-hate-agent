const { SUPPORTED_AGENT_IDS } = require('./shared');

const RUNTIME_ADAPTERS = {
  claude: require('./claude'),
  copilot: require('./copilot'),
  antigravity: require('./antigravity'),
};

function getRuntimeAdapter(agentId) {
  const adapter = RUNTIME_ADAPTERS[String(agentId).trim().toLowerCase()];
  if (!adapter) {
    throw new Error(`Unsupported agent: ${agentId}. Choose one of: ${Object.keys(RUNTIME_ADAPTERS).join(', ')}.`);
  }
  return adapter;
}

function listSupportedRuntimes() {
  return Object.values(RUNTIME_ADAPTERS).map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
  }));
}

module.exports = {
  getRuntimeAdapter,
  listSupportedRuntimes,
  SUPPORTED_AGENT_IDS,
};
