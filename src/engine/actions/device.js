const path = require('node:path');
const os = require('node:os');
const { version: EHA_PACKAGE_VERSION } = require('../../../package.json');

const { listWorkflows } = require('../registry/workflows');
const { listSkills } = require('../registry/skills');
const { listAgents } = require('../registry/agents');
const { getRuntimeAdapter } = require('../adapters');
const { isSentinelFilename, sweepNamespaceRoots } = require('../adapters/shared');
const { resolveAgentId } = require('./project');
const {
  ensureDir,
  removeEmptyParents,
  removeFileIfExists,
  writeText,
} = require('../state/fs');
const { getDeviceManifestPath, getEnginePaths } = require('../state/paths');
const { readDeviceManifest, writeDeviceManifest } = require('../state/manifest');
const { upsertSentinelBlock, removeSentinelBlock } = require('../state/sentinel');

function installDevice({ agentIds, homeDir, options = {} }) {
  const home = homeDir || os.homedir();
  const workflows = listWorkflows();
  const skills = listSkills();
  const agents = listAgents();
  const subagentRouting = options.subagentRouting ?? false;
  const results = {};

  for (const agentId of agentIds) {
    const normalizedId = resolveAgentId(agentId);
    const adapter = getRuntimeAdapter(normalizedId);

    if (typeof adapter.generateDeviceFiles !== 'function') {
      throw new Error(`Agent '${normalizedId}' does not support device-level installation.`);
    }

    const files = adapter.generateDeviceFiles(home, workflows, skills, agents, { subagentRouting });
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

function uninstallDevice({ agentId = null, homeDir } = {}) {
  const home = homeDir || os.homedir();
  const manifest = readDeviceManifest(home);
  const removedFiles = [];
  const reportedFiles = new Set();

  if (!manifest.agents || manifest.agents.length === 0) {
    return { homeDir: home, removedFiles, message: 'No device-level EHA installation found.' };
  }

  // Track a removed path for reporting exactly once, whether it came from the
  // manifest or was discovered by the namespace sweep.
  function reportRemoved(absolutePath) {
    const displayPath = absolutePath.replace(home, '~');
    if (reportedFiles.has(displayPath)) return;
    reportedFiles.add(displayPath);
    removedFiles.push(displayPath);
  }

  // Remove one manifest-listed file. Sentinel-named files may carry
  // user-authored content, so only the EHA block is stripped — and only when
  // no agent that remains installed still references that file (~/.gemini/
  // GEMINI.md is written by both gemini and antigravity).
  function removeTrackedFile(filePath, keepFiles) {
    if (isSentinelFilename(filePath) && (!keepFiles || !keepFiles.has(filePath))) {
      const removed = removeSentinelBlock(filePath, home);
      if (removed) reportRemoved(filePath);
    } else if (!isSentinelFilename(filePath)) {
      removeFileIfExists(filePath);
      removeEmptyParents(path.dirname(filePath), home);
      reportRemoved(filePath);
    }
  }

  // Sweep the adapter's device namespace roots to catch orphaned files left
  // behind by renames in older EHA versions. Paths still referenced by agents
  // that remain installed are skipped.
  function sweepAgentNamespaces(agentIdToSweep, keepFiles) {
    const adapter = getRuntimeAdapter(agentIdToSweep);
    const roots = adapter.deviceSweepRoots || [];
    const removedAbsolute = sweepNamespaceRoots(roots, home);
    for (const absolutePath of removedAbsolute) {
      if (keepFiles && keepFiles.has(absolutePath)) continue;
      reportRemoved(absolutePath);
    }
  }

  const agentsToRemove = agentId
    ? manifest.agents.filter(a => a.id === resolveAgentId(agentId))
    : manifest.agents;

  // Files still owned by agents that stay installed must not be touched.
  const remainingAgents = agentId
    ? manifest.agents.filter(a => a.id !== resolveAgentId(agentId))
    : [];
  const keepFiles = new Set();
  for (const a of remainingAgents) {
    for (const f of a.files || []) keepFiles.add(f);
  }

  for (const agent of agentsToRemove) {
    for (const filePath of agent.files || []) {
      removeTrackedFile(filePath, keepFiles);
    }
    sweepAgentNamespaces(agent.id, keepFiles);
  }

  if (agentId) {
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
  installDevice,
  uninstallDevice,
};
