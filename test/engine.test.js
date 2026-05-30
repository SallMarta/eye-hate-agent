'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { SUPPORTED_AGENT_IDS, doctor, findRepoRoot, initProject, readConfig, removeProject } =
  require('../src/engine');

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
  assert.ok(result.fileCount >= 14, 'Expected at least 14 generated files');

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
  assert.ok(result.fileCount >= 14, 'Expected at least 14 generated files');

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
  assert.ok(result.fileCount >= 14);
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

