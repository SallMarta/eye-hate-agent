const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { version: EHA_PACKAGE_VERSION } = require('../../package.json');

const { listWorkflows } = require('./workflow-registry');
const { listSkills } = require('./skill-registry');
const { getRuntimeAdapter, listSupportedRuntimes, SUPPORTED_AGENT_IDS } = require('./runtime-adapters');
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
  getDeviceManifestPath,
  readDeviceManifest,
  writeDeviceManifest,
  upsertSentinelBlock,
  removeSentinelBlock,
} = require('./state');

function resolveAgentId(agentId) {
  const normalized = String(agentId || '').trim().toLowerCase();
  if (!SUPPORTED_AGENT_IDS.includes(normalized)) {
    throw new Error(`Unsupported agent: ${agentId}. Choose one of: ${SUPPORTED_AGENT_IDS.join(', ')}.`);
  }
  return normalized;
}

function readManifest(manifestPath) {
  const data = readJsonIfExists(manifestPath);
  if (!data) {
    return {
      manifestVersion: 2,
      agent: null,
      agents: [],
      files: [],
    };
  }
  
  const manifestVersion = data.manifestVersion || 1;
  const agent = data.agent || null;
  let agents = data.agents || [];
  let files = data.files || [];
  
  if (manifestVersion === 1 && agent && agents.length === 0) {
    agents = [
      {
        id: agent,
        files: [...files],
        updatedAt: data.updatedAt || new Date().toISOString(),
        packageVersion: data.packageVersion || EHA_PACKAGE_VERSION,
      }
    ];
  }

  return {
    manifestVersion: 2,
    agent,
    agents,
    files,
    updatedAt: data.updatedAt,
    packageVersion: data.packageVersion,
  };
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
  const existingManifest = readManifest(enginePaths.manifestPath);
  const existingAgents = existingManifest.agents || [];

  const agentEntry = {
    id: normalizedAgentId,
    files: files.map((f) => f.relativePath),
    updatedAt: new Date().toISOString(),
    packageVersion: EHA_PACKAGE_VERSION,
  };

  const updatedAgents = existingAgents.filter((a) => a.id !== normalizedAgentId);
  updatedAgents.push(agentEntry);

  const allFiles = new Set();
  for (const agent of updatedAgents) {
    for (const f of agent.files || []) {
      allFiles.add(f);
    }
  }

  const manifest = {
    manifestVersion: 2,
    agent: normalizedAgentId,
    agents: updatedAgents,
    files: [...allFiles],
    updatedAt: new Date().toISOString(),
    packageVersion: EHA_PACKAGE_VERSION,
  };
  writeJson(enginePaths.manifestPath, manifest);

  const existingConfig = readConfig(rootDir);
  const allAgents = [...new Set([...(existingConfig.agents || []), normalizedAgentId])];
  const config = writeConfig(rootDir, { agent: normalizedAgentId, agents: allAgents });

  return {
    rootDir,
    agentId: normalizedAgentId,
    config,
    files: files.map((f) => f.relativePath),
    fileCount: files.length,
  };
}

function removeProject({ rootDir, agentId = null }) {
  const enginePaths = getEnginePaths(rootDir);
  const manifest = readManifest(enginePaths.manifestPath);
  const removedFiles = [];

  if (agentId) {
    const normalizedAgentId = resolveAgentId(agentId);
    const agentEntry = manifest.agents.find((a) => a.id === normalizedAgentId);
    if (!agentEntry) {
      return { rootDir, removedFiles };
    }

    const otherAgents = manifest.agents.filter((a) => a.id !== normalizedAgentId);
    const otherFiles = new Set();
    for (const other of otherAgents) {
      for (const f of other.files || []) {
        otherFiles.add(f);
      }
    }

    const filesToRemove = (agentEntry.files || []).filter((f) => !otherFiles.has(f));

    for (const relativePath of filesToRemove) {
      const absolutePath = path.join(rootDir, relativePath);
      removeFileIfExists(absolutePath);
      removeEmptyParents(path.dirname(absolutePath), rootDir);
      removedFiles.push(relativePath);
    }

    const remainingAgents = otherAgents;
    if (remainingAgents.length === 0) {
      removeFileIfExists(enginePaths.manifestPath);
      removeEmptyParents(path.dirname(enginePaths.manifestPath), rootDir);
      removeFileIfExists(enginePaths.configPath);
      removeEmptyParents(path.dirname(enginePaths.configPath), rootDir);
    } else {
      const lastAgent = remainingAgents[remainingAgents.length - 1].id;
      const allFiles = new Set();
      for (const other of remainingAgents) {
        for (const f of other.files || []) {
          allFiles.add(f);
        }
      }

      const updatedManifest = {
        manifestVersion: 2,
        agent: lastAgent,
        agents: remainingAgents,
        files: [...allFiles],
        updatedAt: new Date().toISOString(),
        packageVersion: EHA_PACKAGE_VERSION,
      };
      writeJson(enginePaths.manifestPath, updatedManifest);

      writeConfig(rootDir, {
        agent: lastAgent,
        agents: remainingAgents.map((a) => a.id),
      });
    }
  } else {
    const allFiles = new Set();
    if (manifest.agents && manifest.agents.length > 0) {
      for (const agentEntry of manifest.agents) {
        for (const f of agentEntry.files || []) {
          allFiles.add(f);
        }
      }
    } else {
      for (const f of manifest.files || []) {
        allFiles.add(f);
      }
    }

    for (const relativePath of allFiles) {
      const absolutePath = path.join(rootDir, relativePath);
      removeFileIfExists(absolutePath);
      removeEmptyParents(path.dirname(absolutePath), rootDir);
      removedFiles.push(relativePath);
    }

    removeFileIfExists(enginePaths.manifestPath);
    removeEmptyParents(path.dirname(enginePaths.manifestPath), rootDir);
    removeFileIfExists(enginePaths.configPath);
    removeEmptyParents(path.dirname(enginePaths.configPath), rootDir);
  }

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

/**
 * Install EHA files to the user's device (global/user-level directories).
 *
 * @param {Object} options
 * @param {string[]} options.agentIds - Array of agent IDs to install
 * @param {string} [options.homeDir] - Override home dir (for testing)
 * @returns {Object} Result with per-agent file lists and summary
 */
function installDevice({ agentIds, homeDir }) {
  const home = homeDir || os.homedir();
  const workflows = listWorkflows();
  const skills = listSkills();
  const results = {};

  for (const agentId of agentIds) {
    const normalizedId = resolveAgentId(agentId);
    const adapter = getRuntimeAdapter(normalizedId);

    if (typeof adapter.generateDeviceFiles !== 'function') {
      throw new Error(`Agent '${normalizedId}' does not support device-level installation.`);
    }

    const files = adapter.generateDeviceFiles(home, workflows, skills);
    const written = [];

    for (const file of files) {
      if (file.isSentinel) {
        const action = upsertSentinelBlock(file.absolutePath, file.content);
        written.push({
          absolutePath: file.absolutePath,
          displayPath: file.absolutePath.replace(home, '~'),
          action,
          isSentinel: true,
        });
      } else {
        ensureDir(path.dirname(file.absolutePath));
        writeText(file.absolutePath, file.content);
        written.push({
          absolutePath: file.absolutePath,
          displayPath: file.absolutePath.replace(home, '~'),
          action: 'written',
          isSentinel: false,
        });
      }
    }

    results[normalizedId] = {
      agentId: normalizedId,
      files: written,
      fileCount: written.length,
    };
  }

  // Write/update device manifest
  const existingManifest = readDeviceManifest(home);
  const existingAgents = existingManifest.agents || [];

  const updatedAgents = [...existingAgents];
  for (const agentId of agentIds) {
    const normalizedId = resolveAgentId(agentId);
    const idx = updatedAgents.findIndex(a => a.id === normalizedId);
    const entry = {
      id: normalizedId,
      files: results[normalizedId].files.map(f => f.absolutePath),
      updatedAt: new Date().toISOString(),
      packageVersion: EHA_PACKAGE_VERSION,
    };
    if (idx !== -1) updatedAgents[idx] = entry;
    else updatedAgents.push(entry);
  }

  const allFiles = new Set();
  for (const agent of updatedAgents) {
    for (const f of agent.files || []) allFiles.add(f);
  }

  writeDeviceManifest({
    manifestVersion: 1,
    agents: updatedAgents,
    files: [...allFiles],
    installedAt: existingManifest.installedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    packageVersion: EHA_PACKAGE_VERSION,
  }, home);

  return {
    homeDir: home,
    agentIds: agentIds.map(a => resolveAgentId(a)),
    results,
    totalFiles: Object.values(results).reduce((sum, r) => sum + r.fileCount, 0),
  };
}

/**
 * Remove EHA device-level files.
 * If agentId is provided, removes only that agent's files.
 * If agentId is null, removes all device-level EHA files.
 */
function uninstallDevice({ agentId = null, homeDir } = {}) {
  const home = homeDir || os.homedir();
  const manifest = readDeviceManifest(home);
  const removedFiles = [];

  if (!manifest.agents || manifest.agents.length === 0) {
    return { homeDir: home, removedFiles, message: 'No device-level EHA installation found.' };
  }

  const agentsToRemove = agentId
    ? manifest.agents.filter(a => a.id === resolveAgentId(agentId))
    : manifest.agents;

  for (const agent of agentsToRemove) {
    for (const filePath of agent.files || []) {
      const basename = path.basename(filePath);
      // Sentinel files: GEMINI.md is current; CLAUDE.md is legacy (pre-1.0.10 installs)
      if (basename === 'CLAUDE.md' || basename === 'GEMINI.md') {
        const removed = removeSentinelBlock(filePath, home);
        if (removed) removedFiles.push(filePath.replace(home, '~'));
      } else {
        removeFileIfExists(filePath);
        removeEmptyParents(path.dirname(filePath), home);
        removedFiles.push(filePath.replace(home, '~'));
      }
    }
  }

  if (agentId) {
    const remainingAgents = manifest.agents.filter(a => a.id !== resolveAgentId(agentId));
    if (remainingAgents.length === 0) {
      removeFileIfExists(getDeviceManifestPath(home));
      removeEmptyParents(path.dirname(getDeviceManifestPath(home)), home);
    } else {
      const allFiles = new Set();
      for (const a of remainingAgents) {
        for (const f of a.files || []) allFiles.add(f);
      }
      writeDeviceManifest({
        manifestVersion: 1,
        agents: remainingAgents,
        files: [...allFiles],
        installedAt: manifest.installedAt,
        updatedAt: new Date().toISOString(),
        packageVersion: EHA_PACKAGE_VERSION,
      }, home);
    }
  } else {
    removeFileIfExists(getDeviceManifestPath(home));
    removeEmptyParents(path.dirname(getDeviceManifestPath(home)), home);
  }

  return { homeDir: home, removedFiles };
}

module.exports = {
  SUPPORTED_AGENT_IDS,
  doctor,
  initProject,
  installDevice,
  readProjectManifest,
  removeProject,
  uninstallDevice,
};
