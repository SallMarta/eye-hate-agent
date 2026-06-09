const fs = require('node:fs');
const path = require('node:path');
const { getEnginePaths } = require('../state/paths');
const { readConfig } = require('../state/config');
const { readManifest } = require('./project');
const { listSupportedRuntimes } = require('../adapters');

function doctor({ rootDir }) {
  const enginePaths = getEnginePaths(rootDir);
  const manifest = readManifest(enginePaths.manifestPath);
  const config = readConfig(rootDir);

  const generatedFiles = (manifest.files || []).map((relativePath) => ({
    relativePath,
    exists: fs.existsSync(path.join(rootDir, relativePath)),
  }));

  return {
    rootDir,
    config,
    agentId: config.agent,
    paths: enginePaths,
    supportedAgents: listSupportedRuntimes(),
    generatedFiles,
    isInitialized: Boolean(config.agent),
  };
}

module.exports = {
  doctor,
};
