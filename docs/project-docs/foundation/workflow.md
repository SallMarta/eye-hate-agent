# EHA Workflow

Last updated: 2026-05-26

## Purpose

This file owns the maintainer workflow for developing the EHA template and the EHA engine together.

## Maintainer loop

1. Edit the owning source assets:
   - contract and maintenance docs
   - reusable prompts under `docs/vibes/reusable-prompts/`
   - `src/engine/` and `bin/eha.js`
2. Run `npm test` to verify the engine
3. Smoke-test the CLI with `node bin/eha.js doctor` in a temp project
4. Update `docs/project-docs/changelog.md`

## CLI commands

| Command | Behavior |
|---|---|
| `eha` or `eyehateagent` (bare) | Wizard: detect root → ask which agent → generate files |
| `eha init [agent]` | Same as bare; agent arg skips the prompt |
| `eha remove` | Confirm → remove all generated files + `.eha/` |
| `eha doctor` | Print root, agent, and ✓/✗ for each generated file |

Bin aliases: `eha`, `eye-hate-agent`, `eyehateagent`

## Install model

EHA is a **global CLI** that writes files into a target repository.

- `npm install -g @sallmarta/eye-hate-agent` → persistent `eha` binary on the machine
- `npx @sallmarta/eye-hate-agent` → one-shot, no binary left behind

Both paths run the same wizard. Generated files are committed into the target repo. The EHA source repo itself does not need EHA installed to work.

## Agent file locations

| Agent | Generated paths |
|---|---|
| claude | `.claude/commands/eha/eha-{bootstrap,refresh,parity,discuss}.md` + `README.md` |
| copilot | `.github/prompts/eha-{bootstrap,refresh,parity,discuss}.prompt.md` + `.github/instructions/eha-workflows.instructions.md` |

Config: `.eha/config.json` — `{ configVersion, agent }`
Manifest: `.eha/manifest.json` — list of generated paths (used by `eha remove`)

## Release and publish loop

The target public package identity is `@sallmarta/eye-hate-agent`.

Use this order for release preparation:

1. Update package metadata and changelog.
2. Run `npm test`.
3. Run `npm pack --dry-run` and inspect the package contents.
4. Run `npm pack`, install the tarball into a clean temporary directory, and smoke-test the CLI.
5. Run `npm login` against the `@sallmarta` npm account when a real publish is intended.
6. Publish with `npm publish --access public`.

Verification notes:

- Verify published `npx` usage from a normal target project directory, not from inside the `eye-hate-agent` source repository itself.
- If testing from this repository, use `node bin/eha.js ...` for local development or `npx @sallmarta/eye-hate-agent@latest ...` to force the published package.

### GitHub Actions publish automation

The repository now includes `.github/workflows/publish.yml` for provenance-enabled npm publishing.

Workflow behavior:

1. runs on `release.published` and `workflow_dispatch`
2. uses Node.js 24 on a GitHub-hosted runner for npm trusted-publishing compatibility
3. installs dependencies with `npm ci`
4. runs `npm test`
5. previews the package with `npm pack --dry-run`
6. publishes with `npm publish --provenance --access public`

Prerequisite:

- configure npm trusted publishing for the `SallMarta/eye-hate-agent` repository, or replace the workflow auth model with an npm token strategy before relying on automation
- keep the workflow filename as `publish.yml` if that exact filename is registered in npm trusted publishing settings

## Editing rule

When behavior changes:

- update engine code or canonical prompt assets first
- regenerate runtime outputs second
- update owner docs third

Do not treat generated runtime outputs as the primary design surface.
