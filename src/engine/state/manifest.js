const fs = require('node:fs');
const { getDeviceManifestPath } = require('./paths');
const { readJsonIfExists, writeJson } = require('./fs');

function readDeviceManifest(homeDir) {
  const manifestPath = getDeviceManifestPath(homeDir);
  return readJsonIfExists(manifestPath) || {
    manifestVersion: 1,
    agents: [],
    files: [],
    installedAt: null,
    updatedAt: null,
    packageVersion: null,
  };
}

function writeDeviceManifest(manifest, homeDir) {
  const manifestPath = getDeviceManifestPath(homeDir);
  writeJson(manifestPath, manifest);
}

function deviceManifestExists(homeDir) {
  return fs.existsSync(getDeviceManifestPath(homeDir));
}

module.exports = {
  readDeviceManifest,
  writeDeviceManifest,
  deviceManifestExists,
};
