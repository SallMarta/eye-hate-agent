const fs = require('node:fs');
const path = require('node:path');
const { version: EHA_PACKAGE_VERSION } = require('../../package.json');

const { listWorkflows } = require('./workflow-registry');
const { listSkills } = require('./skill-registry');
const { getRuntimeAdapter, listSupportedRuntimes } = require('./runtime-adapters');
const {
  ensureDir,
  getBundledAssetPath,
  getEnginePaths,
  readConfig,
  readJsonIfExists,
  removeEmptyParents,
  removeFileIfExists,
  writeConfig,
  writeJson,
  writeText,
} = require('./state');

const SUPPORTED_AGENT_IDS = ['claude', 'copilot', 'gemini'];

function resolveAgentId(agentId) {
  const normalized = String(agentId || '').trim().toLowerCase();
  if (!SUPPORTED_AGENT_IDS.includes(normalized)) {
    throw new Error(`Unsupported agent: ${agentId}. Choose one of: ${SUPPORTED_AGENT_IDS.join(', ')}.`);
  }
  return normalized;
}

function readManifest(manifestPath) {
  return (
    readJsonIfExists(manifestPath) || {
      manifestVersion: 1,
      agent: null,
      files: [],
    }
  );
}

function initProject({ rootDir, agentId }) {
  const normalizedAgentId = resolveAgentId(agentId);
  const adapter = getRuntimeAdapter(normalizedAgentId);
  const workflows = listWorkflows();
  const skills = listSkills();
  const files = adapter.generateFiles(rootDir, workflows, skills);

  for (const file of files) {
    const absolutePath = path.join(rootDir, file.relativePath);
    ensureDir(path.dirname(absolutePath));
    writeText(absolutePath, file.content);
  }

  const enginePaths = getEnginePaths(rootDir);
  const manifest = {
    manifestVersion: 1,
    agent: normalizedAgentId,
    files: files.map((f) => f.relativePath),
    updatedAt: new Date().toISOString(),
    packageVersion: EHA_PACKAGE_VERSION,
  };
  writeJson(enginePaths.manifestPath, manifest);
  const config = writeConfig(rootDir, { agent: normalizedAgentId });

  return {
    rootDir,
    agentId: normalizedAgentId,
    config,
    files: manifest.files,
    fileCount: files.length,
  };
}

function removeProject({ rootDir }) {
  const enginePaths = getEnginePaths(rootDir);
  const manifest = readManifest(enginePaths.manifestPath);
  const removedFiles = [];

  for (const relativePath of manifest.files || []) {
    const absolutePath = path.join(rootDir, relativePath);
    removeFileIfExists(absolutePath);
    removeEmptyParents(path.dirname(absolutePath), rootDir);
    removedFiles.push(relativePath);
  }

  removeFileIfExists(enginePaths.manifestPath);
  removeEmptyParents(path.dirname(enginePaths.manifestPath), rootDir);
  removeFileIfExists(enginePaths.configPath);
  removeEmptyParents(path.dirname(enginePaths.configPath), rootDir);

  return { rootDir, removedFiles };
}

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

function readProjectManifest(rootDir) {
  const { manifestPath } = getEnginePaths(rootDir);
  return readManifest(manifestPath);
}

module.exports = {
  SUPPORTED_AGENT_IDS,
  doctor,
  initProject,
  readProjectManifest,
  removeProject,
};
