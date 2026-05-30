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
  removeProject,
} = require('../src/engine');

const pkg = require('../package.json');

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function promptAgentChoice(currentAgent) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const defaultLabel = currentAgent || SUPPORTED_AGENT_IDS[0];
    const answer = await rl.question(
      `Which agent? [${SUPPORTED_AGENT_IDS.join('/')}] (default: ${defaultLabel}): `,
    );
    const normalized = answer.trim().toLowerCase();
    return normalized || defaultLabel;
  } finally {
    rl.close();
  }
}

async function promptOverwriteOrDiscard(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(`${message} [O]verwrite / [D]iscard (default: D): `);
    return answer.trim().toLowerCase() === 'o';
  } finally {
    rl.close();
  }
}

async function promptConfirm(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(`${message} [y/N]: `);
    return answer.trim().toLowerCase() === 'y';
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

  if (result.agentId === 'claude') {
    console.log('Open Claude in this project and run ' + chalk.cyan('/eha-bootstrap') + ' to get started.');
  } else if (result.agentId === 'copilot') {
    console.log(
      'Open GitHub Copilot agent mode and attach ' +
        chalk.cyan('#eha-bootstrap.prompt.md') +
        ' to get started.',
    );
  }
  console.log('');
}

function printDoctorSummary(result) {
  console.log('');
  console.log(chalk.blue('EHA doctor'));
  console.log(`  Root   : ${result.rootDir}`);
  console.log(`  Config : ${result.paths.configPath}`);
  console.log(`  Agent  : ${result.agentId ? chalk.cyan(result.agentId) : chalk.yellow('not set — run eha init')}`);
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

  let agentId = agentIdArg ? String(agentIdArg).trim().toLowerCase() : null;

  if (!agentId) {
    if (config.agent) {
      if (process.stdin.isTTY && process.stdout.isTTY) {
        const overwrite = await promptOverwriteOrDiscard(
          `EHA already set up (agent: ${chalk.cyan(config.agent)}).`,
        );
        if (!overwrite) {
          console.log('Discarded.');
          return;
        }
      }
    }

    if (process.stdin.isTTY && process.stdout.isTTY) {
      agentId = await promptAgentChoice(config.agent);
    } else {
      agentId = config.agent || SUPPORTED_AGENT_IDS[0];
    }
  } else if (config.agent && config.agent !== agentId) {
    if (process.stdin.isTTY && process.stdout.isTTY) {
      const overwrite = await promptOverwriteOrDiscard(
        `EHA already set up (agent: ${chalk.cyan(config.agent)}). Switch to ${chalk.cyan(agentId)}?`,
      );
      if (!overwrite) {
        console.log('Discarded.');
        return;
      }
    }
  }

  if (!SUPPORTED_AGENT_IDS.includes(agentId)) {
    console.error(
      chalk.red(`Unsupported agent: ${agentId}.`) +
        ` Choose one of: ${SUPPORTED_AGENT_IDS.join(', ')}.`,
    );
    process.exit(1);
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
  .command('remove')
  .description('Remove EHA-generated files and config from this project')
  .action(async () => {
    const rootDir = resolveRootDir();
    const config = readConfig(rootDir);

    if (!config.agent) {
      console.log(chalk.yellow('EHA is not initialized here. Nothing to remove.'));
      return;
    }

    if (process.stdin.isTTY && process.stdout.isTTY) {
      const confirmed = await promptConfirm(
        `Remove EHA (agent: ${chalk.cyan(config.agent)}) from this project?`,
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
