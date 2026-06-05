const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const ROOT_MARKERS = ['package.json', '.git'];
const DEFAULT_CONFIG = {
  configVersion: 2,
  agent: null,
  agents: [],
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

const EHA_SENTINEL_START = '<!-- EHA:START — managed by eye-hate-agent, do not edit manually -->';
const EHA_SENTINEL_END = '<!-- EHA:END -->';

function getDeviceManifestPath(homeDir) {
  return path.join(homeDir || os.homedir(), '.eha', 'manifest.json');
}

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

function upsertSentinelBlock(filePath, content) {
  const block = `${EHA_SENTINEL_START}\n${content}\n${EHA_SENTINEL_END}`;

  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, block + '\n');
    return 'created';
  }

  const existing = fs.readFileSync(filePath, 'utf8');
  const startIdx = existing.indexOf(EHA_SENTINEL_START);
  const endIdx = existing.indexOf(EHA_SENTINEL_END);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = existing.substring(0, startIdx);
    const after = existing.substring(endIdx + EHA_SENTINEL_END.length);
    fs.writeFileSync(filePath, before + block + after);
    return 'updated';
  }

  const separator = existing.endsWith('\n') ? '\n' : '\n\n';
  fs.writeFileSync(filePath, existing + separator + block + '\n');
  return 'appended';
}

function removeSentinelBlock(filePath, stopPath) {
  if (!fs.existsSync(filePath)) return false;

  const existing = fs.readFileSync(filePath, 'utf8');
  const startIdx = existing.indexOf(EHA_SENTINEL_START);
  const endIdx = existing.indexOf(EHA_SENTINEL_END);

  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) return false;

  const before = existing.substring(0, startIdx);
  const after = existing.substring(endIdx + EHA_SENTINEL_END.length);
  const result = (before + after).replace(/\n{3,}/g, '\n\n').trim();

  if (!result) {
    fs.unlinkSync(filePath);
    removeEmptyParents(path.dirname(filePath), stopPath || os.homedir());
  } else {
    fs.writeFileSync(filePath, result + '\n');
  }
  return true;
}

module.exports = {
  EHA_SENTINEL_START,
  EHA_SENTINEL_END,
  deviceManifestExists,
  ensureDir,
  findRepoRoot,
  getBundledAssetPath,
  getDeviceManifestPath,
  getEnginePaths,
  getPackageRoot,
  readConfig,
  readDeviceManifest,
  readJsonIfExists,
  removeEmptyParents,
  removeFileIfExists,
  removeSentinelBlock,
  upsertSentinelBlock,
  writeConfig,
  writeDeviceManifest,
  writeJson,
  writeText,
};
