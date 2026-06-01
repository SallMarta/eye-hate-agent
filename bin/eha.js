#!/usr/bin/env node

'use strict';

const { program } = require('commander');
const chalk = require('chalk');
const readline = require('node:readline/promises');
const {
  SUPPORTED_AGENT_IDS,
  doctor,
  findRepoRoot,
  initProject,
  listSupportedRuntimes,
  listWorkflows,
  readConfig,
  readProjectManifest,
  removeProject,
} = require('../src/engine');

const pkg = require('../package.json');

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function promptAgentChoice(currentAgent) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const runtimes = listSupportedRuntimes();
    const defaultIndex = 1;

    console.log('');
    console.log('Which agent?');
    for (let i = 0; i < runtimes.length; i++) {
      console.log(`  ${i + 1}. ${runtimes[i].name}`);
    }
    console.log(`  ${runtimes.length + 1}. All Agents`);

    const maxChoice = runtimes.length + 1;
    const answer = await rl.question(
      `Choose [1-${maxChoice}] (default: ${defaultIndex}): `,
    );
    const trimmed = answer.trim();

    if (!trimmed) return runtimes[defaultIndex - 1].id;

    const num = parseInt(trimmed, 10);
    if (num >= 1 && num <= runtimes.length) return runtimes[num - 1].id;
    if (num === maxChoice) return 'all';

    const normalized = trimmed.toLowerCase();
    if (normalized === 'all') return 'all';

    const match = runtimes.find(r => r.id === normalized);
    if (match) return match.id;

    return trimmed.toLowerCase();
  } finally {
    rl.close();
  }
}

async function promptConfirm(message, defaultYes = false) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const hint = defaultYes ? '[Y/n]' : '[y/N]';
    const answer = await rl.question(`${message} ${hint}: `);
    const normalized = answer.trim().toLowerCase();
    if (!normalized) return defaultYes;
    return normalized === 'y';
  } finally {
    rl.close();
  }
}

function resolveRootDir() {
  try {
    return findRepoRoot(process.cwd());
  } catch {
    console.error(
      chalk.red('No project root found.') +
      ' Run ' +
      chalk.cyan('npm init -y') +
      ' or ' +
      chalk.cyan('git init') +
      ' first.',
    );
    process.exit(1);
  }
}

function printInitSummary(result) {
  console.log('');
  console.log(chalk.green('✓ EHA is ready.'));
  console.log(`  Agent : ${chalk.cyan(result.agentId)}`);
  console.log(`  Files : ${result.fileCount} file(s) generated`);
  for (const f of result.files) {
    console.log(`    ${chalk.gray(f)}`);
  }
  console.log('');

  const agentNames = {
    claude: 'Claude',
    copilot: 'GitHub Copilot',
    antigravity: 'Antigravity',
  };
  const name = agentNames[result.agentId] || result.agentId;
  console.log(`Open ${name} in this project and run ${chalk.cyan('/eha-help')} to get started!`);
  console.log('');
}

function printDoctorSummary(result) {
  console.log('');
  console.log(chalk.blue('EHA doctor'));
  console.log(`  Root   : ${result.rootDir}`);
  console.log(`  Config : ${result.paths.configPath}`);
  const agents = result.config.agents || (result.config.agent ? [result.config.agent] : []);
  const agentDisplay = agents.length > 0
    ? agents.map(a => chalk.cyan(a)).join(', ')
    : chalk.yellow('not set — run eha init');
  console.log(`  Agents : ${agentDisplay}`);
  console.log('');

  if (!result.isInitialized) {
    console.log(chalk.yellow('EHA is not initialized in this project. Run eha init to set it up.'));
    console.log('');
    return;
  }

  const allPresent = result.generatedFiles.every((f) => f.exists);
  if (allPresent) {
    console.log(chalk.green('All generated files are present:'));
  } else {
    console.log(chalk.yellow('Some generated files are missing (re-run eha init to restore):'));
  }
  for (const f of result.generatedFiles) {
    const icon = f.exists ? chalk.green('✓') : chalk.red('✗');
    console.log(`  ${icon} ${f.relativePath}`);
  }
  console.log('');
}

// ─── Wizard (shared by bare invocation and `eha init`) ────────────────────────

async function runInitWizard(agentIdArg) {
  const rootDir = resolveRootDir();
  const config = readConfig(rootDir);
  const manifest = readProjectManifest(rootDir);

  let agentId = agentIdArg ? String(agentIdArg).trim().toLowerCase() : null;
  const isInteractive = process.stdin.isTTY && process.stdout.isTTY;

  if (!agentId) {
    if (isInteractive) {
      agentId = await promptAgentChoice(config.agent);
    } else {
      agentId = config.agent || SUPPORTED_AGENT_IDS[0];
    }
  }

  const normalized = String(agentId).trim().toLowerCase();

  if (normalized === 'all') {
    const installedAgents = config.agents || (config.agent ? [config.agent] : []);
    if (isInteractive && installedAgents.length > 0) {
      const listStr = installedAgents.map(a => chalk.cyan(a)).join(', ');
      const confirm = await promptConfirm(
        `EHA is set up for: ${listStr}. Overwrite / setup all agents?`,
        true,
      );
      if (!confirm) {
        console.log('Skipped.');
        return;
      }
    }

    console.log(chalk.blue('\nInitializing EHA for all agents...'));
    let fileCount = 0;
    for (const id of SUPPORTED_AGENT_IDS) {
      const result = initProject({ rootDir, agentId: id });
      fileCount += result.fileCount;
    }

    console.log('');
    console.log(chalk.green('✓ EHA is ready for all agents.'));
    console.log(`  Agents : ${SUPPORTED_AGENT_IDS.map(a => chalk.cyan(a)).join(', ')}`);
    console.log(`  Files  : ${fileCount} file(s) generated`);
    console.log('');
    console.log('Open Agents in this project and run ' + chalk.cyan('/eha-help') + ' to get started or run ' + chalk.cyan('eha doctor') + ' to see all files.');
    console.log('');
    return;
  }

  if (!SUPPORTED_AGENT_IDS.includes(normalized)) {
    const runtimes = listSupportedRuntimes();
    const list = runtimes.map((r, i) => `${i + 1}. ${r.name}`).join(', ');
    console.error(
      chalk.red(`Unsupported agent: ${agentIdArg || agentId}.`) +
      ` Choose one of: ${list}, or ${runtimes.length + 1}. All Agents.`,
    );
    process.exit(1);
  }
  agentId = normalized;

  const installedAgents = config.agents || (config.agent ? [config.agent] : []);
  const isAlreadyInstalled = installedAgents.includes(agentId);

  if (isInteractive) {
    if (isAlreadyInstalled) {
      const currentVer = manifest.packageVersion || 'unknown';
      let msg = '';
      if (currentVer !== pkg.version) {
        msg = `EHA is already set up for ${chalk.cyan(agentId)} (v${currentVer}). Regenerate with v${pkg.version}?`;
      } else {
        msg = `EHA is already set up for ${chalk.cyan(agentId)}. Regenerate/overwrite?`;
      }
      const confirm = await promptConfirm(msg, true);
      if (!confirm) {
        console.log('Skipped.');
        return;
      }
    } else if (installedAgents.length > 0) {
      const listStr = installedAgents.map(a => chalk.cyan(a)).join(', ');
      const confirm = await promptConfirm(
        `EHA is set up for: ${listStr}. Add ${chalk.cyan(agentId)}?`,
        true,
      );
      if (!confirm) {
        console.log('Skipped.');
        return;
      }
    }
  }

  const result = initProject({ rootDir, agentId });
  printInitSummary(result);
}

// ─── CLI definition ────────────────────────────────────────────────────────────

program.name('eha').description('Eye Hate Agent (EHA) — AI workflow toolkit').version(pkg.version);

// Bare `eha` / `eyehateagent` with no subcommand runs the init wizard.
program.action(async () => {
  await runInitWizard(null);
});

program
  .command('init [agent]')
  .description(`Set up EHA in this project. Agent: ${SUPPORTED_AGENT_IDS.join(' | ')}`)
  .action(async (agentArg) => {
    await runInitWizard(agentArg || null);
  });

program
  .command('remove [agent]')
  .description('Remove EHA-generated files and config from this project (optionally for a specific agent)')
  .action(async (agentArg) => {
    const rootDir = resolveRootDir();
    const config = readConfig(rootDir);
    const installedAgents = config.agents || (config.agent ? [config.agent] : []);

    if (installedAgents.length === 0) {
      console.log(chalk.yellow('EHA is not initialized here. Nothing to remove.'));
      return;
    }

    let targetAgent = agentArg ? String(agentArg).trim().toLowerCase() : null;

    if (targetAgent) {
      if (!installedAgents.includes(targetAgent)) {
        console.log(chalk.yellow(`Agent ${chalk.cyan(targetAgent)} is not currently set up in this project.`));
        return;
      }

      if (process.stdin.isTTY && process.stdout.isTTY) {
        const confirmed = await promptConfirm(
          `Remove EHA for agent: ${chalk.cyan(targetAgent)} from this project?`,
          true,
        );
        if (!confirmed) {
          console.log('Aborted.');
          return;
        }
      }

      const result = removeProject({ rootDir, agentId: targetAgent });
      console.log('');
      console.log(chalk.green(`✓ EHA files for ${chalk.cyan(targetAgent)} removed.`));
      for (const f of result.removedFiles) {
        console.log(`  ${chalk.gray(f)}`);
      }
      console.log('');
    } else {
      if (process.stdin.isTTY && process.stdout.isTTY) {
        const listStr = installedAgents.map(a => chalk.cyan(a)).join(', ');
        const confirmed = await promptConfirm(
          `Remove EHA (all agents: ${listStr}) from this project?`,
        );
        if (!confirmed) {
          console.log('Aborted.');
          return;
        }
      }

      const result = removeProject({ rootDir });
      console.log('');
      console.log(chalk.green('✓ EHA removed.'));
      for (const f of result.removedFiles) {
        console.log(`  ${chalk.gray(f)}`);
      }
      console.log('');
    }
  });

program
  .command('doctor')
  .description('Show EHA status: config, agent, and generated files')
  .action(() => {
    const rootDir = resolveRootDir();
    printDoctorSummary(doctor({ rootDir }));
  });

program.parseAsync(process.argv).catch((error) => {
  console.error(chalk.red(error.message));
  process.exitCode = 1;
});
