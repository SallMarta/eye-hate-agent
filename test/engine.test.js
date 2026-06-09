'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  SUPPORTED_AGENT_IDS,
  doctor,
  findRepoRoot,
  initProject,
  readConfig,
  removeProject,
  listSkills,
  listWorkflows,
  installDevice,
  uninstallDevice,
  deviceManifestExists,
  listSupportedRuntimes,
} = require('../src/engine');

const {
  upsertSentinelBlock,
  removeSentinelBlock,
} = require('../src/engine/state/sentinel');

function createSandbox() {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eha-engine-'));
  fs.writeFileSync(path.join(rootDir, 'package.json'), '{"name":"sandbox"}\n');
  return rootDir;
}

// ─── findRepoRoot ──────────────────────────────────────────────────────────────

test('findRepoRoot discovers root from nested directories', () => {
  const rootDir = createSandbox();
  const nestedDir = path.join(rootDir, 'src', 'feature', 'deep');
  fs.mkdirSync(nestedDir, { recursive: true });
  assert.equal(findRepoRoot(nestedDir), rootDir);
});

test('findRepoRoot throws when no root marker is found', () => {
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'eha-no-root-'));
  assert.throws(() => findRepoRoot(isolated), /Could not find a project root/i);
});

// ─── initProject ──────────────────────────────────────────────────────────────

test('initProject generates Claude command files', () => {
  const rootDir = createSandbox();
  const result = initProject({ rootDir, agentId: 'claude' });

  assert.equal(result.agentId, 'claude');
  const expectedCount = listWorkflows().length + listSkills().length + 1;
  assert.equal(result.fileCount, expectedCount, `Expected exactly ${expectedCount} generated files`);

  const bootstrapPath = path.join(rootDir, '.claude', 'commands', 'eha', 'eha-bootstrap.md');
  assert.ok(fs.existsSync(bootstrapPath), 'eha-bootstrap.md must exist');

  const content = fs.readFileSync(bootstrapPath, 'utf8');
  assert.match(content, /description:/, 'Missing YAML frontmatter');
  assert.match(content, /4-Layer Taxonomy/, 'Missing compact EHA rules block');
  assert.match(content, /Project Docs Bootstrap/, 'Missing bootstrap prompt content');
  assert.ok(!content.includes('eyehateagent-contract.md'), 'Contract reference should not appear');

  const analysisSkillPath = path.join(rootDir, '.claude', 'skills', 'eha-system-analysis.md');
  assert.ok(fs.existsSync(analysisSkillPath), 'eha-system-analysis.md must exist');
  
  const rulesPath = path.join(rootDir, '.claude', 'rules', 'eha-agent-rules.md');
  assert.ok(fs.existsSync(rulesPath), 'eha-agent-rules.md must exist');

  assert.equal(readConfig(rootDir).agent, 'claude');
});

test('initProject generates Copilot prompt files', () => {
  const rootDir = createSandbox();
  const result = initProject({ rootDir, agentId: 'copilot' });

  assert.equal(result.agentId, 'copilot');
  const expectedCount = listWorkflows().length + listSkills().length + 2;
  assert.equal(result.fileCount, expectedCount, `Expected exactly ${expectedCount} generated files`);

  const promptPath = path.join(rootDir, '.github', 'prompts', 'eha-bootstrap.prompt.md');
  assert.ok(fs.existsSync(promptPath), 'eha-bootstrap.prompt.md must exist');

  const content = fs.readFileSync(promptPath, 'utf8');
  assert.match(content, /mode: agent/, 'Missing Copilot mode frontmatter');
  assert.match(content, /4-Layer Taxonomy/, 'Missing compact EHA rules block');

  const instructionsPath = path.join(rootDir, '.github', 'instructions', 'eha-workflows.instructions.md');
  assert.ok(fs.existsSync(instructionsPath), 'Instructions routing file must exist');

  const analysisSkillPath = path.join(rootDir, '.github', 'skills', 'eha-system-analysis', 'SKILL.md');
  assert.ok(fs.existsSync(analysisSkillPath), 'eha-system-analysis SKILL.md must exist in .github/skills/');

  const rulesPath = path.join(rootDir, '.github', 'instructions', 'eha-agent-rules.instructions.md');
  assert.ok(fs.existsSync(rulesPath), 'eha-agent-rules.instructions.md must exist');

  assert.equal(readConfig(rootDir).agent, 'copilot');
});

test('initProject generates Antigravity command files', () => {
  const rootDir = createSandbox();
  const result = initProject({ rootDir, agentId: 'antigravity' });

  assert.equal(result.agentId, 'antigravity');
  const expectedCount = listWorkflows().length + listSkills().length + 1;
  assert.equal(result.fileCount, expectedCount, `Expected exactly ${expectedCount} generated files`);

  const bootstrapPath = path.join(rootDir, '.agents', 'workflows', 'eha-bootstrap.md');
  assert.ok(fs.existsSync(bootstrapPath), 'eha-bootstrap.md must exist in .agents/workflows/');

  const content = fs.readFileSync(bootstrapPath, 'utf8');
  assert.match(content, /description:/, 'Missing YAML frontmatter');
  assert.match(content, /4-Layer Taxonomy/, 'Missing compact EHA rules block');
  assert.match(content, /Project Docs Bootstrap/, 'Missing bootstrap prompt content');
  assert.ok(!content.includes('eyehateagent-contract.md'), 'Contract reference should not appear');

  const analysisSkillPath = path.join(rootDir, '.agents', 'skills', 'eha-system-analysis', 'SKILL.md');
  assert.ok(fs.existsSync(analysisSkillPath), 'eha-system-analysis SKILL.md must exist');
  
  const rulesPath = path.join(rootDir, '.agents', 'rules', 'eha-agent-rules.md');
  assert.ok(fs.existsSync(rulesPath), 'eha-agent-rules.md must exist in .agents/rules/');

  assert.equal(readConfig(rootDir).agent, 'antigravity');
});

test('initProject throws for unsupported agent', () => {
  const rootDir = createSandbox();
  assert.throws(() => initProject({ rootDir, agentId: 'unknown-agent' }), /Unsupported agent/i);
});

test('initProject overwrites existing files on reinit', () => {
  const rootDir = createSandbox();
  initProject({ rootDir, agentId: 'claude' });
  const result = initProject({ rootDir, agentId: 'claude' });
  assert.equal(result.agentId, 'claude');
  const expectedCount = listWorkflows().length + listSkills().length + 1;
  assert.equal(result.fileCount, expectedCount);
});

// ─── removeProject ────────────────────────────────────────────────────────────

test('removeProject removes all generated files and config', () => {
  const rootDir = createSandbox();
  const initResult = initProject({ rootDir, agentId: 'claude' });

  const removeResult = removeProject({ rootDir });
  assert.equal(removeResult.removedFiles.length, initResult.files.length);

  for (const relativePath of initResult.files) {
    assert.ok(!fs.existsSync(path.join(rootDir, relativePath)), `File should be removed: ${relativePath}`);
  }

  const configPath = path.join(rootDir, '.eha', 'config.json');
  assert.ok(!fs.existsSync(configPath), 'Config file should be removed');
});

test('removeProject is safe to call on uninitialized project', () => {
  const rootDir = createSandbox();
  const result = removeProject({ rootDir });
  assert.deepEqual(result.removedFiles, []);
});

// ─── doctor ───────────────────────────────────────────────────────────────────

test('doctor reports initialized state correctly', () => {
  const rootDir = createSandbox();
  initProject({ rootDir, agentId: 'copilot' });
  const result = doctor({ rootDir });

  assert.equal(result.isInitialized, true);
  assert.equal(result.agentId, 'copilot');
  assert.ok(result.generatedFiles.length > 0);
  assert.ok(result.generatedFiles.every((f) => f.exists));
});

test('doctor reports uninitialized state correctly', () => {
  const rootDir = createSandbox();
  const result = doctor({ rootDir });

  assert.equal(result.isInitialized, false);
  assert.equal(result.agentId, null);
  assert.deepEqual(result.generatedFiles, []);
});

// ─── SUPPORTED_AGENT_IDS ──────────────────────────────────────────────────────

test('SUPPORTED_AGENT_IDS contains claude, copilot, antigravity', () => {
  assert.ok(SUPPORTED_AGENT_IDS.includes('claude'));
  assert.ok(SUPPORTED_AGENT_IDS.includes('copilot'));
  assert.ok(SUPPORTED_AGENT_IDS.includes('antigravity'));
});

// ─── G5 & H4: Registry Mappings & Synchronization ──────────────────────────────

test('registries point to valid existing files on disk (G5)', () => {
  const { getBundledAssetPath } = require('../src/engine/state/paths');

  for (const skill of listSkills()) {
    const fullPath = getBundledAssetPath(skill.repoRelativePath);
    assert.ok(fs.existsSync(fullPath), `Skill file does not exist: ${skill.repoRelativePath}`);
  }

  for (const workflow of listWorkflows()) {
    const fullPath = getBundledAssetPath(workflow.repoRelativePath);
    assert.ok(fs.existsSync(fullPath), `Workflow file does not exist: ${workflow.repoRelativePath}`);
  }

  const rulesPath = getBundledAssetPath(path.join('docs', 'templates', 'rules', 'agent-rules.md'));
  assert.ok(fs.existsSync(rulesPath), `Global rules template does not exist: ${rulesPath}`);
});

test('skill and workflow registries are in bidirectional sync with template directories (H4)', () => {
  const { getPackageRoot } = require('../src/engine/state/paths');
  const root = getPackageRoot();

  // 1. Skill sync
  const skillsDir = path.join(root, 'docs', 'templates', 'skills');
  const diskSkills = fs.readdirSync(skillsDir)
    .filter(name => fs.statSync(path.join(skillsDir, name)).isDirectory());
  const registeredSkills = listSkills().map(s => s.id);

  for (const name of diskSkills) {
    assert.ok(registeredSkills.includes(name), `Skill directory on disk '${name}' is not registered in skill-registry.js`);
  }

  for (const id of registeredSkills) {
    assert.ok(diskSkills.includes(id), `Registered skill ID '${id}' does not have a matching subdirectory under docs/templates/skills/`);
  }

  // 2. Workflow sync
  const promptsDir = path.join(root, 'docs', 'templates', 'reusable-prompts');
  const diskPrompts = fs.readdirSync(promptsDir)
    .filter(name => name.endsWith('.md') && fs.statSync(path.join(promptsDir, name)).isFile());
  const registeredWorkflows = listWorkflows();

  for (const w of registeredWorkflows) {
    const basename = path.basename(w.repoRelativePath);
    assert.ok(diskPrompts.includes(basename), `Registered workflow '${w.id}' references file '${basename}' which is missing on disk`);
  }

  const registeredBasenames = registeredWorkflows.map(w => path.basename(w.repoRelativePath));
  for (const filename of diskPrompts) {
    assert.ok(registeredBasenames.includes(filename), `Prompt file on disk '${filename}' is not registered in workflow-registry.js`);
  }
});

test('project docs templates directory is lightweight and contains only registries and standalone templates (Decision 7)', () => {
  const { getPackageRoot } = require('../src/engine/state/paths');
  const root = getPackageRoot();
  const templateDir = path.join(root, 'docs', 'templates', 'project-docs-template');

  const contents = fs.readdirSync(templateDir);
  assert.deepEqual(contents.sort(), ['index.md', 'technical-guidelines'].sort());

  const guidelinesDir = path.join(templateDir, 'technical-guidelines');
  const guidelinesContents = fs.readdirSync(guidelinesDir);
  assert.deepEqual(guidelinesContents.sort(), ['index.md'].sort());
});

// ─── H2: CLI Exit Code & Integration Tests ─────────────────────────────────────

test('CLI exit code 1 on unsupported agent (H2)', () => {
  const { execSync } = require('node:child_process');
  const binPath = path.resolve(__dirname, '..', 'bin', 'eha.js');
  assert.throws(() => {
    execSync(`node "${binPath}" init unknown-agent`, { stdio: 'pipe' });
  }, (err) => {
    assert.equal(err.status, 1);
    assert.match(err.stderr.toString(), /Unsupported agent/i);
    return true;
  });
});

test('CLI exit code 1 on no root found (H2)', () => {
  const { execSync } = require('node:child_process');
  const binPath = path.resolve(__dirname, '..', 'bin', 'eha.js');
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'eha-cli-no-root-'));
  try {
    assert.throws(() => {
      execSync(`node "${binPath}" init claude`, { cwd: isolated, stdio: 'pipe' });
    }, (err) => {
      assert.equal(err.status, 1);
      assert.match(err.stderr.toString(), /No project root found/i);
      return true;
    });
  } finally {
    fs.rmdirSync(isolated);
  }
});

test('CLI runs successfully in non-TTY mode (H2)', () => {
  const { execSync } = require('node:child_process');
  const binPath = path.resolve(__dirname, '..', 'bin', 'eha.js');
  const rootDir = createSandbox();

  const output = execSync(`node "${binPath}" init claude`, { cwd: rootDir }).toString();
  assert.match(output, /✓ EHA is ready/i);
  assert.ok(fs.existsSync(path.join(rootDir, '.claude', 'commands', 'eha', 'eha-bootstrap.md')));

  const removeOutput = execSync(`node "${binPath}" remove`, { cwd: rootDir }).toString();
  assert.match(removeOutput, /✓ EHA removed/i);
  assert.ok(!fs.existsSync(path.join(rootDir, '.claude', 'commands', 'eha', 'eha-bootstrap.md')));
});

test('initProject accumulates multiple agents in config and manifest', () => {
  const rootDir = createSandbox();

  initProject({ rootDir, agentId: 'claude' });
  initProject({ rootDir, agentId: 'copilot' });
  const result = initProject({ rootDir, agentId: 'antigravity' });

  const config = readConfig(rootDir);
  assert.deepEqual(config.agents.sort(), ['antigravity', 'claude', 'copilot']);
  assert.equal(config.agent, 'antigravity');

  const claudeBootstrap = path.join(rootDir, '.claude', 'commands', 'eha', 'eha-bootstrap.md');
  const copilotBootstrap = path.join(rootDir, '.github', 'prompts', 'eha-bootstrap.prompt.md');
  const antigravBootstrap = path.join(rootDir, '.agents', 'rules', 'eha-agent-rules.md');
  assert.ok(fs.existsSync(claudeBootstrap), 'Claude files should still exist');
  assert.ok(fs.existsSync(copilotBootstrap), 'Copilot files should still exist');
  assert.ok(fs.existsSync(antigravBootstrap), 'Antigravity files should exist');
});

test('removeProject removes files from all installed agents', () => {
  const rootDir = createSandbox();
  initProject({ rootDir, agentId: 'claude' });
  initProject({ rootDir, agentId: 'copilot' });

  const result = removeProject({ rootDir });

  assert.ok(!fs.existsSync(path.join(rootDir, '.claude')), '.claude should be removed');
  assert.ok(!fs.existsSync(path.join(rootDir, '.github')), '.github should be removed');
  assert.ok(!fs.existsSync(path.join(rootDir, '.eha')), '.eha should be removed');
});

test('removeProject supporting Option B targeted removal', () => {
  const rootDir = createSandbox();
  initProject({ rootDir, agentId: 'claude' });
  initProject({ rootDir, agentId: 'copilot' });

  const result = removeProject({ rootDir, agentId: 'claude' });

  assert.ok(!fs.existsSync(path.join(rootDir, '.claude')), '.claude should be removed');
  assert.ok(fs.existsSync(path.join(rootDir, '.github', 'prompts', 'eha-bootstrap.prompt.md')), 'Copilot files should still exist');

  const config = readConfig(rootDir);
  assert.deepEqual(config.agents, ['copilot']);
  assert.equal(config.agent, 'copilot');

  removeProject({ rootDir, agentId: 'copilot' });

  assert.ok(!fs.existsSync(path.join(rootDir, '.github')), '.github should be removed');
  assert.ok(!fs.existsSync(path.join(rootDir, '.eha')), '.eha should be removed');
});

test('CLI supports init all to initialize all agents at once', () => {
  const { execSync } = require('node:child_process');
  const binPath = path.resolve(__dirname, '..', 'bin', 'eha.js');
  const rootDir = createSandbox();

  const output = execSync(`node "${binPath}" init all`, { cwd: rootDir }).toString();
  assert.match(output, /✓ EHA is ready/i);

  assert.ok(fs.existsSync(path.join(rootDir, '.claude', 'commands', 'eha', 'eha-bootstrap.md')));
  assert.ok(fs.existsSync(path.join(rootDir, '.github', 'prompts', 'eha-bootstrap.prompt.md')));
  assert.ok(fs.existsSync(path.join(rootDir, '.agents', 'rules', 'eha-agent-rules.md')));

  const config = readConfig(rootDir);
  assert.deepEqual(config.agents.sort(), ['antigravity', 'claude', 'copilot']);
});

// ─── Sentinel Marker Utilities ───────────────────────────────────────────

test('upsertSentinelBlock creates file with sentinel block if not exists', () => {
  const tmpFile = path.join(os.tmpdir(), `eha-sentinel-${Date.now()}.md`);
  try {
    const action = upsertSentinelBlock(tmpFile, '# EHA Rules\nSome content');
    assert.equal(action, 'created');
    const content = fs.readFileSync(tmpFile, 'utf8');
    assert.match(content, /EHA:START/);
    assert.match(content, /EHA:END/);
    assert.match(content, /# EHA Rules/);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test('upsertSentinelBlock appends to existing file without markers', () => {
  const tmpFile = path.join(os.tmpdir(), `eha-sentinel-${Date.now()}.md`);
  try {
    fs.writeFileSync(tmpFile, '# My Existing Rules\nDo not delete.\n');
    const action = upsertSentinelBlock(tmpFile, '# EHA Rules');
    assert.equal(action, 'appended');
    const content = fs.readFileSync(tmpFile, 'utf8');
    assert.match(content, /My Existing Rules/);
    assert.match(content, /EHA:START/);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test('upsertSentinelBlock replaces existing sentinel block', () => {
  const tmpFile = path.join(os.tmpdir(), `eha-sentinel-${Date.now()}.md`);
  try {
    fs.writeFileSync(tmpFile,
      `# My Rules\n<!-- EHA:START — managed by eye-hate-agent, do not edit manually -->\nOLD\n<!-- EHA:END -->\n`);
    const action = upsertSentinelBlock(tmpFile, 'NEW');
    assert.equal(action, 'updated');
    const content = fs.readFileSync(tmpFile, 'utf8');
    assert.match(content, /NEW/);
    assert.ok(!content.includes('OLD'));
    assert.match(content, /My Rules/);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test('removeSentinelBlock removes EHA block and preserves other content', () => {
  const tmpFile = path.join(os.tmpdir(), `eha-sentinel-${Date.now()}.md`);
  try {
    fs.writeFileSync(tmpFile,
      `# My Rules\nKeep this.\n\n<!-- EHA:START — managed by eye-hate-agent, do not edit manually -->\nEHA\n<!-- EHA:END -->\n`);
    assert.equal(removeSentinelBlock(tmpFile), true);
    const content = fs.readFileSync(tmpFile, 'utf8');
    assert.match(content, /Keep this/);
    assert.ok(!content.includes('EHA:START'));
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test('removeSentinelBlock deletes file if it becomes empty', () => {
  const tmpFile = path.join(os.tmpdir(), `eha-sentinel-${Date.now()}.md`);
  try {
    fs.writeFileSync(tmpFile,
      `<!-- EHA:START — managed by eye-hate-agent, do not edit manually -->\nEHA ONLY\n<!-- EHA:END -->\n`);
    assert.equal(removeSentinelBlock(tmpFile), true);
    assert.ok(!fs.existsSync(tmpFile));
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test('removeSentinelBlock returns false for file without markers', () => {
  const tmpFile = path.join(os.tmpdir(), `eha-sentinel-${Date.now()}.md`);
  try {
    fs.writeFileSync(tmpFile, '# No markers\n');
    assert.equal(removeSentinelBlock(tmpFile), false);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

// ─── Device-Level Installation ───────────────────────────────────────────

function createFakeHome() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'eha-home-'));
}

test('installDevice writes Claude files to correct device paths', () => {
  const fakeHome = createFakeHome();
  const result = installDevice({ agentIds: ['claude'], homeDir: fakeHome });

  assert.ok(result.totalFiles > 0);
  assert.ok(result.results.claude);

  // Verify commands exist
  const cmdPath = path.join(fakeHome, '.claude', 'commands', 'eha', 'eha-bootstrap.md');
  assert.ok(fs.existsSync(cmdPath), 'Claude command file must exist');

  // Verify skills exist in subdirectory format
  const skillPath = path.join(fakeHome, '.claude', 'skills', 'eha-system-analysis', 'SKILL.md');
  assert.ok(fs.existsSync(skillPath), 'Claude skill SKILL.md must exist');

  // Verify rules exist in modular file ~/.claude/rules/eha-agent-rules.md
  const rulesPath = path.join(fakeHome, '.claude', 'rules', 'eha-agent-rules.md');
  assert.ok(fs.existsSync(rulesPath), 'Claude rules file must exist');
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');
  assert.match(rulesContent, /EHA Workflow Routing/);
  assert.ok(!fs.existsSync(path.join(fakeHome, '.claude', 'CLAUDE.md')), 'CLAUDE.md should not exist');

  // Verify device manifest
  assert.ok(fs.existsSync(path.join(fakeHome, '.eha', 'manifest.json')));
});

test('installDevice writes Copilot files to correct device paths', () => {
  const fakeHome = createFakeHome();
  const result = installDevice({ agentIds: ['copilot'], homeDir: fakeHome });

  // Verify prompts
  const promptPath = path.join(fakeHome, '.copilot', 'skills', 'eha-bootstrap', 'SKILL.md');
  assert.ok(fs.existsSync(promptPath), 'Copilot prompt file must exist');

  // Verify skills (SKILL.md format)
  const skillPath = path.join(fakeHome, '.copilot', 'skills', 'eha-system-analysis', 'SKILL.md');
  assert.ok(fs.existsSync(skillPath), 'Copilot skill SKILL.md must exist');

  // Verify instructions (own file, not sentinel)
  const instrPath = path.join(fakeHome, '.copilot', 'instructions', 'eha-agent-rules.instructions.md');
  assert.ok(fs.existsSync(instrPath), 'Copilot instructions file must exist');
});

test('installDevice writes Antigravity files to correct device paths', () => {
  const fakeHome = createFakeHome();
  const result = installDevice({ agentIds: ['antigravity'], homeDir: fakeHome });

  // Verify skills
  const skillPath = path.join(fakeHome, '.gemini', 'config', 'skills', 'eha-system-analysis', 'SKILL.md');
  assert.ok(fs.existsSync(skillPath), 'Antigravity skill file must exist');

  // Verify workflows
  const workflowPath = path.join(fakeHome, '.gemini', 'config', 'global_workflows', 'eha-bootstrap.md');
  assert.ok(fs.existsSync(workflowPath), 'Antigravity workflow file must exist');

  // Verify GEMINI.md has sentinel block
  const geminiMd = fs.readFileSync(path.join(fakeHome, '.gemini', 'GEMINI.md'), 'utf8');
  assert.match(geminiMd, /EHA:START/);
  assert.match(geminiMd, /EHA:END/);
});

test('installDevice writes all three agents', () => {
  const fakeHome = createFakeHome();
  const result = installDevice({ agentIds: SUPPORTED_AGENT_IDS, homeDir: fakeHome });
  assert.equal(result.agentIds.length, 3);
  assert.ok(result.results.claude);
  assert.ok(result.results.copilot);
  assert.ok(result.results.antigravity);
});

test('installDevice is idempotent — re-running updates sentinel blocks', () => {
  const fakeHome = createFakeHome();
  installDevice({ agentIds: ['antigravity'], homeDir: fakeHome });

  // Add user content before the sentinel block
  const geminiMdPath = path.join(fakeHome, '.gemini', 'GEMINI.md');
  const existing = fs.readFileSync(geminiMdPath, 'utf8');
  fs.writeFileSync(geminiMdPath, '# My Personal Rules\nKeep this.\n\n' + existing);

  // Re-run install
  installDevice({ agentIds: ['antigravity'], homeDir: fakeHome });

  const after = fs.readFileSync(geminiMdPath, 'utf8');
  assert.match(after, /My Personal Rules/); // User content preserved
  assert.match(after, /EHA:START/); // Sentinel block still present
});

test('uninstallDevice removes all device files and manifest', () => {
  const fakeHome = createFakeHome();
  installDevice({ agentIds: SUPPORTED_AGENT_IDS, homeDir: fakeHome });

  const result = uninstallDevice({ homeDir: fakeHome });
  assert.ok(result.removedFiles.length > 0);
  assert.ok(!fs.existsSync(path.join(fakeHome, '.eha', 'manifest.json')));
});

test('uninstallDevice removes specific agent only', () => {
  const fakeHome = createFakeHome();
  installDevice({ agentIds: SUPPORTED_AGENT_IDS, homeDir: fakeHome });

  uninstallDevice({ agentId: 'claude', homeDir: fakeHome });

  // Claude files gone
  assert.ok(!fs.existsSync(path.join(fakeHome, '.claude', 'commands', 'eha')));
  // Copilot files still exist
  assert.ok(fs.existsSync(path.join(fakeHome, '.copilot', 'skills', 'eha-bootstrap', 'SKILL.md')));
  // Manifest still exists (other agents remain)
  assert.ok(fs.existsSync(path.join(fakeHome, '.eha', 'manifest.json')));
});

// ─── Multi-Select Agent Parsing ──────────────────────────────────────────

test('parseAgentInput: empty → defaults to first agent', () => {
  const { parseAgentInput } = require('../bin/eha.js');
  const runtimes = listSupportedRuntimes();
  const result = parseAgentInput('', runtimes);
  assert.deepEqual(result, [runtimes[0].id]);
});

test('parseAgentInput: "0" → all agents', () => {
  const { parseAgentInput } = require('../bin/eha.js');
  const runtimes = listSupportedRuntimes();
  const result = parseAgentInput('0', runtimes);
  assert.deepEqual(result.sort(), SUPPORTED_AGENT_IDS.sort());
});

test('parseAgentInput: "1,3" → claude and antigravity', () => {
  const { parseAgentInput } = require('../bin/eha.js');
  const runtimes = listSupportedRuntimes();
  const result = parseAgentInput('1,3', runtimes);
  assert.deepEqual(result, ['claude', 'antigravity']);
});

test('parseAgentInput: "claude,copilot" → by name', () => {
  const { parseAgentInput } = require('../bin/eha.js');
  const runtimes = listSupportedRuntimes();
  const result = parseAgentInput('claude,copilot', runtimes);
  assert.deepEqual(result, ['claude', 'copilot']);
});

test('parseAgentInput: "all" → all agents', () => {
  const { parseAgentInput } = require('../bin/eha.js');
  const runtimes = listSupportedRuntimes();
  const result = parseAgentInput('all', runtimes);
  assert.deepEqual(result.sort(), SUPPORTED_AGENT_IDS.sort());
});

test('parseAgentInput: "1,1,1" → deduplicates to one', () => {
  const { parseAgentInput } = require('../bin/eha.js');
  const runtimes = listSupportedRuntimes();
  const result = parseAgentInput('1,1,1', runtimes);
  assert.deepEqual(result, ['claude']);
});

// ─── CLI Integration ─────────────────────────────────────────────────────

test('CLI hidden eha init still works for backwards compat', () => {
  const { execSync } = require('node:child_process');
  const binPath = path.resolve(__dirname, '..', 'bin', 'eha.js');
  const rootDir = createSandbox();

  const output = execSync(`node "${binPath}" init claude`, { cwd: rootDir }).toString();
  assert.match(output, /✓ EHA is ready/i);
  assert.ok(fs.existsSync(path.join(rootDir, '.claude', 'commands', 'eha', 'eha-bootstrap.md')));
});

test('CLI bare eha in non-TTY prints help', () => {
  const { execSync } = require('node:child_process');
  const binPath = path.resolve(__dirname, '..', 'bin', 'eha.js');

  const output = execSync(`node "${binPath}"`, { stdio: 'pipe' }).toString();
  assert.match(output, /Usage:|Eye Hate Agent/i);
});

