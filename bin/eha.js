#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

program
  .name('eha')
  .description('Eye Hate Agent (EHA) - Agile Spec-Driven Development Framework')
  .version('1.0.0');

program
  .command('init')
  .description('Bootstrap the massive EHA document structure')
  .action(() => {
    console.log(chalk.blue('👁️  Running Eye Hate Agent Bootstrap...'));
    console.log(chalk.yellow('To fully initialize EHA, run the following prompt in your chat:'));
    console.log(chalk.green('  "Run docs/vibes/reusable-prompts/00-project-docs-bootstrap.md"'));
    console.log(chalk.gray('The AI agent will analyze your repo state and generate the appropriate documentation structure.'));
  });

program
  .command('discuss')
  .description('Start a brainstorming session before finalizing a spec')
  .action(() => {
    console.log(chalk.blue('👁️  Starting Discuss Phase...'));
    console.log(chalk.yellow('To begin brainstorming with the agent, run this prompt in your chat:'));
    console.log(chalk.green('  "Run docs/vibes/reusable-prompts/02-sdd-discuss.md for my new feature idea"'));
  });

program
  .command('verify')
  .description('Run document parity checks')
  .action(() => {
    console.log(chalk.blue('👁️  Running EHA Parity Validation...'));
    console.log(chalk.yellow('To verify the codebase strictly matches the specs, run:'));
    console.log(chalk.green('  "Run docs/vibes/reusable-prompts/00-project-docs-parity.md"'));
  });

program.parse(process.argv);
