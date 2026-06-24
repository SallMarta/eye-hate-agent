const fs = require('node:fs');
const path = require('node:path');
const { getBundledAssetPath } = require('../state/paths');
const { listSkills } = require('../registry/skills');
const { listWorkflows } = require('../registry/workflows');
const { listAgents } = require('../registry/agents');

const SUPPORTED_AGENT_IDS = ['claude', 'copilot', 'antigravity', 'gemini'];

const EHA_COMPACT_RULES = `## EHA Project Doc Rules

**4-Layer Taxonomy.** All project docs live under \`docs/project-docs/\`:
- \`foundation/\` — prd, architecture, workflow, status, phases, changelog, feature-inventory
- \`operations/\` — ci-cd, production-runbook, governance, compliance, observability, security
- \`development/\` — testing, api-contract, database, ui-ux, error-handling, internationalization
- \`technical-guidelines/\` — domain-specific cross-cutting rules (API, database, logging, etc.)

**Legacy/Reference Docs:** Treat folders named \`archive/\`, \`docs-legacy/\`, or \`reference/\` as secondary migration input only, never as authoritative active truth.

**Mandatory core docs:** \`index.md\`, \`getting-started.md\`, \`foundation/prd.md\`, \`foundation/architecture.md\`, \`foundation/workflow.md\`, \`foundation/status.md\`, \`operations/ci-cd.md\`, \`operations/production-runbook.md\`, \`development/testing.md\`, \`development/api-contract.md\`, \`development/database.md\`, \`development/ui-ux.md\`.

**Authority order:** project docs → codebase → agent judgment. When docs conflict, the owning doc wins. When code and docs conflict and authority is unclear, surface the conflict and ask the user — do not guess.

**Universal stable headings (every file):** Description, Important, Table of Contents, Scope, Goals, Non Goals.

**Key ownership rules:**
- Vision, personas, requirements → \`foundation/prd.md\`
- Stack and architecture → \`foundation/architecture.md\`
- Dev loop and PR process → \`foundation/workflow.md\`
- Verification commands and quality gates → \`development/testing.md\`
- Execution plan and progress → \`foundation/status.md\`
- Sprint tracking and backlogs → \`foundation/phases/\`
- Optional doc inventory → \`index.md\`
- Domain-specific technical rules → \`technical-guidelines/\` (Create these only for durable cross-cutting rules; avoid placeholders).

**SDD rule:** Specifications dictate implementation. Follow a strict 4-step workflow: 1. Update project docs first, 2. Generate tests based on the specs, 3. Generate code to pass the tests, 4. Logically map every code change back to a spec requirement. Refuse to write code for features not in the spec.

**Flexible Baselines Principle:** Omit docs the repo doesn't need. Mark unknowns as \`TBD\` or \`Assumption\`. Mark inferred facts as \`Inferred from codebase\` until the user confirms them.`;

function loadRegistryContent(registryRelativePath) {
  const fullPath = getBundledAssetPath(
    path.join('docs', 'templates', registryRelativePath)
  );
  return fs.readFileSync(fullPath, 'utf8');
}

function expandRegistryTokens(content) {
  return content.replace(
    /\{\{REGISTRY:([\w/._-]+)\}\}/g,
    (_match, registryPath) => {
      const registryContent = loadRegistryContent(registryPath);

      // Derive a human-readable label from the path
      // e.g. "project-docs-template/index.md" → "MASTER REGISTRY"
      //      "project-docs-template/technical-guidelines/index.md" → "GUIDELINES REGISTRY"
      const isGuidelines = registryPath.includes('technical-guidelines');
      const label = isGuidelines ? 'GUIDELINES REGISTRY' : 'MASTER REGISTRY';

      return [
        '',
        `<!-- === EHA ${label} START === -->`,
        '<!-- Auto-embedded by EHA engine. Do not edit manually. -->',
        '',
        registryContent.trimEnd(),
        '',
        `<!-- === EHA ${label} END === -->`,
      ].join('\n');
    }
  );
}

function loadPromptContent(workflow) {
  const promptPath = getBundledAssetPath(workflow.repoRelativePath);
  const raw = fs.readFileSync(promptPath, 'utf8');
  const filtered = raw
    .split('\n')
    .filter((line) => !line.includes('docs/eyehateagent-contract.md'))
    .join('\n')
    .replace(/^\n+/, '');
  return expandRegistryTokens(filtered);
}

function loadSkillContent(skill) {
  const promptPath = getBundledAssetPath(skill.repoRelativePath);
  const raw = fs.readFileSync(promptPath, 'utf8');
  const parts = raw.split(/^---\r?\n/m);
  let body = parts.length > 2 ? parts.slice(2).join('---\n') : raw;
  return body
    .split('\n')
    .filter((line) => !line.includes('docs/eyehateagent-contract.md'))
    .join('\n')
    .replace(/^\n+/, '');
}

function loadAgentContent(agent) {
  const agentPath = getBundledAssetPath(agent.repoRelativePath);
  const raw = fs.readFileSync(agentPath, 'utf8').replace(/^\n+/, '');
  // Preserve frontmatter — unlike loadSkillContent(), agent files need their
  // `name`, `description`, and `tools` fields to remain intact because the
  // consuming platforms read them directly from YAML. Then expand the
  // `{{WRAPS}}` token so the subagent inherits its wrapped skill/workflow body.
  return expandWrapsToken(raw, agent);
}

// Resolve a `wraps:` id to the body of the skill (preferred) or workflow it
// references. Skill bodies come back frontmatter-stripped via loadSkillContent;
// workflow bodies come back fully registry-token-expanded via loadPromptContent.
function resolveWrapsContent(id) {
  const skill = listSkills().find((s) => s.id === id || s.commandName === id);
  if (skill) {
    return loadSkillContent(skill);
  }
  const workflow = listWorkflows().find((w) => w.id === id || w.commandName === id);
  if (workflow) {
    return loadPromptContent(workflow);
  }
  throw new Error(`Agent 'wraps:"${id}"' did not match any registered skill or workflow.`);
}

// Expand the `{{WRAPS}}` token in an agent body using the `wraps:` field in its
// frontmatter. The id is declared once (frontmatter); the token marks where the
// resolved content lands. A declaration without a token (or vice versa) is a
// configuration error — fail loudly rather than silently shipping a thin agent.
function expandWrapsToken(raw, agent) {
  const match = raw.match(/^wraps:\s*["']?([\w-]+)["']?\s*$/m);
  const wrapsId = match ? match[1] : null;
  const hasToken = raw.includes('{{WRAPS}}');

  if (!wrapsId && !hasToken) {
    return raw; // agent wraps nothing — pass through unchanged
  }
  if (wrapsId && !hasToken) {
    throw new Error(`Agent "${agent.id}" declares wraps:"${wrapsId}" but its body has no {{WRAPS}} token to receive it.`);
  }
  if (hasToken && !wrapsId) {
    throw new Error(`Agent "${agent.id}" has a {{WRAPS}} token but no wraps: field in its frontmatter.`);
  }
  return raw.replace('{{WRAPS}}', resolveWrapsContent(wrapsId).trim());
}

function loadRuleContent(agentId) {
  const rulePath = getBundledAssetPath(path.join('docs', 'templates', 'rules', 'agent-rules.md'));
  let content = fs.readFileSync(rulePath, 'utf8').replace(/^\n+/, '');
  
  if (agentId) {
    const agentsToFilter = SUPPORTED_AGENT_IDS.filter(a => a !== agentId.toLowerCase());
    for (const a of agentsToFilter) {
      const regex = new RegExp(`^\\s*-\\s*\\*\\*${a}.*$\\n?`, 'gmi');
      content = content.replace(regex, '');
    }
  }
  
  return content;
}

function buildDeviceRulesContent(agentId, workflows, options = {}) {
  const rulesContent = loadRuleContent(agentId);

  let routingSection = '';
  if (agentId === 'claude') {
    const routes = workflows
      .map(w => `- \`${w.commandName}\` → \`~/.claude/commands/eha/eha-${w.commandName}.md\``)
      .join('\n');
    routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching command file:\n\n${routes}`;
  } else if (agentId === 'antigravity') {
    const routes = workflows
      .map(w => `- \`${w.commandName}\` → \`~/.gemini/config/global_workflows/eha-${w.commandName}.md\``)
      .join('\n');
    routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching workflow file:\n\n${routes}`;
  } else if (agentId === 'gemini') {
    const routes = workflows
      .map(w => `- \`${w.commandName}\` → \`~/.gemini/commands/eha-${w.commandName}.toml\``)
      .join('\n');
    routingSection = `\n\n# EHA Workflow Routing\n\nWhen a user asks to run an EHA workflow, use the matching command file:\n\n${routes}`;
  }

  return `${rulesContent}${routingSection}${buildSubagentRoutingSection(options)}`;
}

// Build the "EHA Subagent Routing" section appended to a rules file when the
// opt-in `subagentRouting` flag is set. Returns '' (no section) when disabled
// or when no registered subagent declares a `trigger` hint. Drawn dynamically
// from listAgents() so it stays in sync with the registry.
function buildSubagentRoutingSection(options = {}) {
  if (!options || !options.subagentRouting) return '';
  const withTriggers = listAgents().filter((a) => a.trigger);
  if (withTriggers.length === 0) return '';

  const rows = withTriggers
    .map((a) => `| ${a.trigger} | \`eha-${a.commandName}\` |`)
    .join('\n');

  return [
    '',
    '## EHA Subagent Routing',
    '',
    'When a request matches a pattern below, delegate to the named subagent instead of doing the work inline. State which subagent you delegated to and why, then act on the report it returns.',
    '',
    '| If the request is about… | Delegate to |',
    '|---|---|',
    rows,
    '',
    'Routing rules:',
    '- Delegate once per bounded task — do not auto-chain subagents.',
    "- Skip delegation for small or already-in-flow work; it is for focused, token-heavy, or read-only/isolated tasks.",
    "- Respect each subagent's tool scope (three are read-only; only `eha-tester` writes). Do not work around a restricted scope.",
    '- Platform support: Claude and Copilot spawn these directly. On Antigravity / Gemini CLI, follow the procedure inline until the platform adds subagent spawning.',
  ].join('\n');
}

module.exports = {
  SUPPORTED_AGENT_IDS,
  EHA_COMPACT_RULES,
  loadPromptContent,
  loadSkillContent,
  loadAgentContent,
  resolveWrapsContent,
  expandWrapsToken,
  loadRuleContent,
  buildDeviceRulesContent,
  buildSubagentRoutingSection,
};
