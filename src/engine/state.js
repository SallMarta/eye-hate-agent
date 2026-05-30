const fs = require('node:fs');
const path = require('node:path');

const ROOT_MARKERS = ['package.json', '.git'];
const DEFAULT_CONFIG = {
  configVersion: 1,
  agent: null,
};

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, value);
}

function fileExists(rootDir, relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function getPackageRoot() {
  return path.resolve(__dirname, '..', '..');
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
        `Could not find a project root from ${initialDir}. Expected one of: ${ROOT_MARKERS.join(', ')}.`,
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

function normalizeConfig(config) {
  const candidate = config && typeof config === 'object' ? config : {};
  return {
    configVersion: Number.isInteger(candidate.configVersion) ? candidate.configVersion : DEFAULT_CONFIG.configVersion,
    agent: candidate.agent ? String(candidate.agent).trim().toLowerCase() : null,
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

function removeFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function removeEmptyParents(startPath, stopPath) {
  let currentPath = path.resolve(startPath);
  const normalizedStop = path.resolve(stopPath);

  while (currentPath.startsWith(normalizedStop) && currentPath !== normalizedStop) {
    if (!fs.existsSync(currentPath)) {
      currentPath = path.dirname(currentPath);
      continue;
    }

    if (fs.readdirSync(currentPath).length > 0) {
      break;
    }

    fs.rmdirSync(currentPath);
    currentPath = path.dirname(currentPath);
  }
}

module.exports = {
  ensureDir,
  findRepoRoot,
  getBundledAssetPath,
  getEnginePaths,
  getPackageRoot,
  readConfig,
  readJsonIfExists,
  removeEmptyParents,
  removeFileIfExists,
  writeConfig,
  writeJson,
  writeText,
};
