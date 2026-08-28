const path = require('node:path');
const { version: EHA_PACKAGE_VERSION } = require('../../../package.json');

const { listWorkflows } = require('../registry/workflows');
const { listSkills } = require('../registry/skills');
const { listAgents } = require('../registry/agents');
const { getRuntimeAdapter, SUPPORTED_AGENT_IDS } = require('../adapters');
const { isSentinelFilename, sweepNamespaceRoots } = require('../adapters/shared');
const {
  ensureDir,
  readJsonIfExists,
  removeEmptyParents,
  removeFileIfExists,
  writeJson,
  writeText,
} = require('../state/fs');
const { getEnginePaths } = require('../state/paths');
const { readConfig, writeConfig } = require('../state/config');
const { upsertSentinelBlock, removeSentinelBlock } = require('../state/sentinel');

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

function initProject({ rootDir, agentId, options = {} }) {
  const normalizedAgentId = resolveAgentId(agentId);
  const adapter = getRuntimeAdapter(normalizedAgentId);
  const workflows = listWorkflows();
  const skills = listSkills();
  const agents = listAgents();

  // Subagent auto-routing is opt-in. An explicit option wins; otherwise the
  // prior config value is preserved across re-init; default is off.
  const existingConfig = readConfig(rootDir);
  const subagentRouting = options.subagentRouting ?? existingConfig.subagentRouting ?? false;

  const files = adapter.generateFiles(rootDir, workflows, skills, agents, { subagentRouting });

  for (const file of files) {
    const absolutePath = path.join(rootDir, file.relativePath);
    if (file.isSentinel) {
      upsertSentinelBlock(absolutePath, file.content);
    } else {
      ensureDir(path.dirname(absolutePath));
      writeText(absolutePath, file.content);
    }
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

  const allAgents = [...new Set([...(existingConfig.agents || []), normalizedAgentId])];
  const config = writeConfig(rootDir, { agent: normalizedAgentId, agents: allAgents, subagentRouting });

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
  const reportedFiles = new Set();

  // Track a removed path for reporting exactly once, whether it came from the
  // manifest or was discovered by the namespace sweep.
  function reportRemoved(relativePath) {
    const normalized = path.normalize(relativePath);
    if (reportedFiles.has(normalized)) return;
    reportedFiles.add(normalized);
    removedFiles.push(relativePath);
  }

  // Remove one manifest-listed file. Sentinel-named files at the project root
  // may carry user-authored content, so only the EHA block is stripped; all
  // other files are deleted outright.
  function removeTrackedFile(relativePath) {
    const absolutePath = path.join(rootDir, relativePath);
    if (isSentinelFilename(absolutePath)) {
      removeSentinelBlock(absolutePath, rootDir);
    } else {
      removeFileIfExists(absolutePath);
      removeEmptyParents(path.dirname(absolutePath), rootDir);
    }
    reportRemoved(relativePath);
  }

  // Sweep the adapter's namespace roots to catch orphaned files that older EHA
  // versions left behind after skill/workflow renames (the manifest no longer
  // lists them, so tracked-file removal alone would miss them). Paths other
  // agents still reference are skipped by the caller-provided keep set.
  function sweepAgentNamespaces(agentIdToSweep, keepFiles) {
    const adapter = getRuntimeAdapter(agentIdToSweep);
    const roots = adapter.projectSweepRoots || [];
    const removedAbsolute = sweepNamespaceRoots(roots, rootDir);
    for (const absolutePath of removedAbsolute) {
      const relativePath = path.relative(rootDir, absolutePath);
      if (keepFiles && keepFiles.has(path.normalize(relativePath))) continue;
      reportRemoved(relativePath);
    }
  }

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
        otherFiles.add(path.normalize(f));
      }
    }

    const filesToRemove = (agentEntry.files || []).filter((f) => !otherFiles.has(path.normalize(f)));

    for (const relativePath of filesToRemove) {
      removeTrackedFile(relativePath);
    }

    sweepAgentNamespaces(normalizedAgentId, otherFiles);

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
      removeTrackedFile(relativePath);
    }

    // Sweep the namespace roots of every agent this project ever had
    // installed, not just the ones the manifest still lists. The config may
    // know about agents the manifest lost (and vice versa in v1 fallback), so
    // the union covers both sources.
    const config = readConfig(rootDir);
    const sweepAgentIds = new Set([
      ...(manifest.agents || []).map((a) => a.id),
      ...(config.agents || []),
    ]);
    if (sweepAgentIds.size === 0 && manifest.agent) {
      sweepAgentIds.add(manifest.agent);
    }

    for (const sweepAgentId of sweepAgentIds) {
      if (!SUPPORTED_AGENT_IDS.includes(sweepAgentId)) continue;
      sweepAgentNamespaces(sweepAgentId, null);
    }

    removeFileIfExists(enginePaths.manifestPath);
    removeEmptyParents(path.dirname(enginePaths.manifestPath), rootDir);
    removeFileIfExists(enginePaths.configPath);
    removeEmptyParents(path.dirname(enginePaths.configPath), rootDir);
  }

  return { rootDir, removedFiles };
}

function readProjectManifest(rootDir) {
  const { manifestPath } = getEnginePaths(rootDir);
  return readManifest(manifestPath);
}

module.exports = {
  resolveAgentId,
  readManifest,
  initProject,
  removeProject,
  readProjectManifest,
};
