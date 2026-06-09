const path = require('node:path');
const os = require('node:os');
const { fileExists } = require('./fs');

const ROOT_MARKERS = ['package.json', '.git'];

function getPackageRoot() {
  return path.resolve(__dirname, '..', '..', '..');
}

function getBundledAssetPath(repoRelativePath) {
  return path.join(getPackageRoot(), repoRelativePath);
}

function findRepoRoot(startDir = process.cwd()) {
  let currentDir = path.resolve(startDir);
  const initialDir = currentDir;

  while (true) {
    if (ROOT_MARKERS.some((markerPath) => fileExists(currentDir, markerPath))) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error(
        `Could not find a project root from ${initialDir}. Expected one of: ${ROOT_MARKERS.join(', ')}.`
      );
    }

    currentDir = parentDir;
  }
}

function getEnginePaths(rootDir) {
  const ehaDir = path.join(rootDir, '.eha');
  return {
    ehaDir,
    configPath: path.join(ehaDir, 'config.json'),
    manifestPath: path.join(ehaDir, 'manifest.json'),
  };
}

function getDeviceManifestPath(homeDir) {
  return path.join(homeDir || os.homedir(), '.eha', 'manifest.json');
}

module.exports = {
  getPackageRoot,
  getBundledAssetPath,
  findRepoRoot,
  getEnginePaths,
  getDeviceManifestPath,
};
