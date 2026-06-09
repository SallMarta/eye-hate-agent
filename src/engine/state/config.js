const { getEnginePaths } = require('./paths');
const { readJsonIfExists, writeJson } = require('./fs');

const DEFAULT_CONFIG = {
  configVersion: 2,
  agent: null,
  agents: [],
};

function normalizeConfig(config) {
  const candidate = config && typeof config === 'object' ? config : {};
  const agent = candidate.agent ? String(candidate.agent).trim().toLowerCase() : null;
  let agents = Array.isArray(candidate.agents) ? candidate.agents : [];
  if (agent && agents.length === 0) {
    agents = [agent];
  }
  return {
    configVersion: 2,
    agent,
    agents: [...new Set(agents)],
  };
}

function readConfig(rootDir) {
  const { configPath } = getEnginePaths(rootDir);
  return normalizeConfig(readJsonIfExists(configPath) || DEFAULT_CONFIG);
}

function writeConfig(rootDir, value) {
  const { configPath } = getEnginePaths(rootDir);
  const normalizedConfig = normalizeConfig(value);
  writeJson(configPath, normalizedConfig);
  return normalizedConfig;
}

module.exports = {
  normalizeConfig,
  readConfig,
  writeConfig,
};
