#!/usr/bin/env node

'use strict';

const { program } = require('commander');
const chalk = require('chalk');
const readline = require('node:readline/promises');
const {
  SUPPORTED_AGENT_IDS,
  deviceManifestExists,
  doctor,
  findRepoRoot,
  initProject,
  installDevice,
  listSupportedRuntimes,
  listWorkflows,
  readConfig,
  readDeviceManifest,
  readProjectManifest,
  removeProject,
  uninstallDevice,
} = require('../src/engine');

const pkg = require('../package.json');

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function printBanner() {
  const ehaRed = chalk.hex('#A61E14').bold;
  console.log('');
  console.log(ehaRed('  ███████╗██╗  ██╗ █████╗ '));
  console.log(ehaRed('  ██╔════╝██║  ██║██╔══██╗'));
  console.log(ehaRed('  █████╗  ███████║███████║'));
  console.log(ehaRed('  ██╔══╝  ██╔══██║██╔══██║'));
  console.log(ehaRed('  ███████╗██║  ██║██║  ██║'));
  console.log(ehaRed('  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝'));
  console.log(chalk.gray(`  v${pkg.version}`));
  console.log('');
}

async function checkForUpdates() {
  try {
    const https = require('node:https');
    const data = await new Promise((resolve, reject) => {
      const req = https.get(
        'https://registry.npmjs.org/@sallmarta/eye-hate-agent/latest',
        { timeout: 3000 },
        (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => resolve(JSON.parse(body)));
        },
      );
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    });

    const latest = data.version;
    if (latest && latest !== pkg.version) {
      console.log(
        chalk.yellow(`  Update available: ${pkg.version} → ${latest}`) +
        chalk.gray(` — run npm i -g @sallmarta/eye-hate-agent`)
      );
      console.log('');
    }
  } catch {
    // Silently ignore — no network, no problem
  }
}

function parseAgentInput(input, runtimes) {
  const trimmed = (input || '').trim();
  if (!trimmed) return [runtimes[0].id];
  if (trimmed === '0' || trimmed.toLowerCase() === 'all') return SUPPORTED_AGENT_IDS.slice();

  const parts = trimmed.split(',').map(p => p.trim()).filter(Boolean);
  const ids = new Set();

  for (const part of parts) {
    const num = parseInt(part, 10);
    if (num === 0) return SUPPORTED_AGENT_IDS.slice();
    if (num >= 1 && num <= runtimes.length) {
      ids.add(runtimes[num - 1].id);
    } else {
      const normalized = part.toLowerCase();
      if (normalized === 'all') return SUPPORTED_AGENT_IDS.slice();
      const match = runtimes.find(r => r.id === normalized);
      if (match) ids.add(match.id);
      else ids.add(normalized);
    }
  }

  return ids.size > 0 ? [...ids] : [runtimes[0].id];
}

async function promptAgentChoice() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const runtimes = listSupportedRuntimes();

    console.log('');
    console.log('Which agent(s)?');
    for (let i = 0; i < runtimes.length; i++) {
      console.log(`  ${i + 1}. ${runtimes[i].name}`);
    }
    console.log(`  0. All Agents`);

    const answer = await rl.question(
      `Choose agent(s) — comma-separate for multiple (e.g. 1,3): `,
    );
    return parseAgentInput(answer, runtimes);
  } finally {
    rl.close();
  }
}

async function promptScope() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('');
    console.log('Where should EHA be installed?');
    console.log(`  1. This project ${chalk.gray('(files in .claude/, .github/, .agents/)')}`);
    console.log(`  2. Your device — all projects ${chalk.gray('(files in ~/.claude/, ~/.copilot/, ~/.gemini/)')}`);

    const answer = await rl.question(`Choose [1-2]: `);
    const trimmed = answer.trim();

    if (trimmed === '2' || trimmed.toLowerCase() === 'device' || trimmed.toLowerCase() === 'global') {
      return 'device';
    }

    return 'project';
  } finally {
    rl.close();
  }
}

async function runDeviceInstall(agentIds) {
  const isInteractive = process.stdin.isTTY && process.stdout.isTTY;

  if (isInteractive && deviceManifestExists()) {
    const manifest = readDeviceManifest();
    const installedAgentIds = (manifest.agents || []).map(a => a.id);
    if (installedAgentIds.length > 0) {
      const listStr = installedAgentIds.map(a => chalk.cyan(a)).join(', ');
      const ver = manifest.packageVersion || 'unknown';
      const confirmed = await promptConfirm(
        `EHA is already installed on your device (${listStr}, v${ver}). Update / overwrite?`,
        true,
      );
      if (!confirmed) {
        console.log('Skipped.');
        return;
      }
    }
  }

  console.log('');
  console.log(chalk.blue('Installing EHA to your device...'));
  console.log('');

  const result = installDevice({ agentIds });

  const agentNames = { claude: 'Claude', copilot: 'GitHub Copilot', antigravity: 'Antigravity' };

  for (const agentId of result.agentIds) {
    const agentResult = result.results[agentId];
    console.log(`  ${chalk.cyan(agentNames[agentId] || agentId)}:`);
    for (const file of agentResult.files) {
      const suffix = file.isSentinel ? ` (EHA rules block ${file.action})` : '';
      console.log(`    ${chalk.green('✓')} ${file.displayPath}${chalk.gray(suffix)}`);
    }
    console.log('');
  }

  console.log(chalk.green('✓ EHA installed to your device!'));
  console.log(`  Open your agent in any project and run ${chalk.cyan('/eha-help')} to get started.`);
  console.log('');
}

async function runProjectInstall(agentIds) {
  const isInteractive = process.stdin.isTTY && process.stdout.isTTY;

  let rootDir;
  try {
    rootDir = findRepoRoot(process.cwd());
  } catch {
    console.error(
      chalk.red('No project root found.') +
      ' Run ' + chalk.cyan('npm init -y') + ' or ' + chalk.cyan('git init') + ' first.',
    );
    process.exit(1);
  }

  const config = readConfig(rootDir);
  const installedAgents = config.agents || [];

  if (isInteractive && installedAgents.length > 0) {
    const listStr = installedAgents.map(a => chalk.cyan(a)).join(', ');
    const confirmed = await promptConfirm(
      `EHA is set up for: ${listStr}. Overwrite / add selected agents?`,
      true,
    );
    if (!confirmed) {
      console.log('Skipped.');
      return;
    }
  }

  console.log('');
  console.log(chalk.blue('Installing EHA to this project...'));

  let totalFiles = 0;
  const allFiles = [];
  for (const id of agentIds) {
    const result = initProject({ rootDir, agentId: id });
    totalFiles += result.fileCount;
    allFiles.push(...result.files);
  }

  console.log('');
  console.log(chalk.green(`✓ EHA is ready.`));
  console.log(`  Agent${agentIds.length > 1 ? 's' : ''} : ${agentIds.map(a => chalk.cyan(a)).join(', ')}`);
  console.log(`  Files  : ${totalFiles} file(s) generated`);
  for (const f of allFiles) {
    console.log(`    ${chalk.gray(f)}`);
  }
  console.log('');
  console.log(`Open your agent in this project and run ${chalk.cyan('/eha-help')} to get started.`);
  console.log('');
}

// ─── CLI definition ────────────────────────────────────────────────────────────

program.name('eha').description('Eye Hate Agent (EHA) — AI workflow toolkit').version(pkg.version);

program.action(async () => {
  const isInteractive = process.stdin.isTTY && process.stdout.isTTY;

  if (!isInteractive) {
    program.outputHelp();
    return;
  }

  printBanner();
  await checkForUpdates();

  const agentIds = await promptAgentChoice();

  for (const id of agentIds) {
    if (!SUPPORTED_AGENT_IDS.includes(id)) {
      console.error(
        chalk.red(`Unsupported agent: ${id}.`) +
        ` Choose from: ${SUPPORTED_AGENT_IDS.join(', ')}`
      );
      process.exit(1);
    }
  }

  const scope = await promptScope();

  if (scope === 'device') {
    await runDeviceInstall(agentIds);
  } else {
    await runProjectInstall(agentIds);
  }
});

program
  .command('init [agent]', { hidden: true })
  .description('(hidden) Project-level install — alias for the unified wizard with scope=project')
  .action(async (agentArg) => {
    const rootDir = resolveRootDir();
    const isInteractive = process.stdin.isTTY && process.stdout.isTTY;

    let agentIds;
    if (agentArg) {
      const normalized = String(agentArg).trim().toLowerCase();
      agentIds = normalized === 'all' ? SUPPORTED_AGENT_IDS.slice() : [normalized];
    } else if (isInteractive) {
      printBanner();
      agentIds = await promptAgentChoice();
    } else {
      agentIds = [SUPPORTED_AGENT_IDS[0]];
    }

    let totalFiles = 0;
    const allFiles = [];
    for (const id of agentIds) {
      const result = initProject({ rootDir, agentId: id });
      totalFiles += result.fileCount;
      allFiles.push(...result.files);
    }

    console.log('');
    console.log(chalk.green(`✓ EHA is ready.`));
    console.log(`  Agent${agentIds.length > 1 ? 's' : ''} : ${agentIds.map(a => chalk.cyan(a)).join(', ')}`);
    console.log(`  Files  : ${totalFiles} file(s) generated`);
    for (const f of allFiles) {
      console.log(`    ${chalk.gray(f)}`);
    }
    console.log('');
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
  .command('uninstall')
  .description('Remove EHA device-level files from your machine')
  .action(async () => {
    const isInteractive = process.stdin.isTTY && process.stdout.isTTY;

    if (isInteractive) {
      const confirmed = await promptConfirm(
        'Remove all device-level EHA files from your machine?',
      );
      if (!confirmed) {
        console.log('Aborted.');
        return;
      }
    }

    const result = uninstallDevice();

    if (result.removedFiles.length === 0) {
      console.log(chalk.yellow('No device-level EHA installation found.'));
      return;
    }

    console.log('');
    console.log(chalk.green('✓ EHA device-level files removed:'));
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

if (require.main === module) {
  program.parseAsync(process.argv).catch((error) => {
    console.error(chalk.red(error.message));
    process.exitCode = 1;
  });
}

module.exports = {
  parseAgentInput,
};
