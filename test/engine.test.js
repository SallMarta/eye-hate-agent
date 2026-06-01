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
} = require('../src/engine');

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
  const expectedCount = listWorkflows().length + listSkills().length + 2;
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

  const analysisSkillPath = path.join(rootDir, '.github', 'prompts', 'skills', 'eha-system-analysis.prompt.md');
  assert.ok(fs.existsSync(analysisSkillPath), 'eha-system-analysis.prompt.md must exist');

  const rulesPath = path.join(rootDir, '.github', 'instructions', 'eha-agent-rules.instructions.md');
  assert.ok(fs.existsSync(rulesPath), 'eha-agent-rules.instructions.md must exist');

  assert.equal(readConfig(rootDir).agent, 'copilot');
});

test('initProject generates Antigravity command files', () => {
  const rootDir = createSandbox();
  const result = initProject({ rootDir, agentId: 'antigravity' });

  assert.equal(result.agentId, 'antigravity');
  const expectedCount = listWorkflows().length + listSkills().length + 2;
  assert.equal(result.fileCount, expectedCount, `Expected exactly ${expectedCount} generated files`);

  const bootstrapPath = path.join(rootDir, '.agents', 'skills', 'eha-bootstrap', 'SKILL.md');
  assert.ok(fs.existsSync(bootstrapPath), 'eha-bootstrap SKILL.md must exist');

  const content = fs.readFileSync(bootstrapPath, 'utf8');
  assert.match(content, /description:/, 'Missing YAML frontmatter');
  assert.match(content, /4-Layer Taxonomy/, 'Missing compact EHA rules block');
  assert.match(content, /Project Docs Bootstrap/, 'Missing bootstrap prompt content');
  assert.ok(!content.includes('eyehateagent-contract.md'), 'Contract reference should not appear');

  const analysisSkillPath = path.join(rootDir, '.agents', 'skills', 'eha-system-analysis', 'SKILL.md');
  assert.ok(fs.existsSync(analysisSkillPath), 'eha-system-analysis SKILL.md must exist');
  
  const rulesPath = path.join(rootDir, '.agents', 'skills', 'eha-agent-rules', 'SKILL.md');
  assert.ok(fs.existsSync(rulesPath), 'eha-agent-rules SKILL.md must exist');

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
  const expectedCount = listWorkflows().length + listSkills().length + 2;
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
  const { getBundledAssetPath } = require('../src/engine/state');

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
  const { getPackageRoot } = require('../src/engine/state');
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

