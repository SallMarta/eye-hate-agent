# EHA Status

Last updated: 2026-05-26

## Current status

EHA v1 is complete and functional. The CLI has been refactored from an execution-orchestration system to a minimal "install → generate → use" flow.

### Completed in v1 refactor

- Simplified CLI to 4 commands: `eha init`, `eha remove`, `eha doctor`, bare `eha` wizard
- Added `eyehateagent` bin alias (3 aliases total: `eha`, `eye-hate-agent`, `eyehateagent`)
- Removed execution orchestration (`run.js` deleted, automation model removed)
- Each generated file is fully self-contained: frontmatter + compact EHA rules block + full prompt
- No external file dependencies at runtime (contract reference removed from all prompts)
- Claude generates `.claude/commands/eha/` slash command files
- Copilot generates `.github/prompts/*.prompt.md` files + always-on instructions file
- Config schema simplified to `{ configVersion, agent }`
- Manifest tracks generated files for clean removal
- 4 workflows: bootstrap, refresh, parity, discuss (execute/verify deferred)
- 11/11 tests passing

### Not complete yet

- execute/verify workflows deferred to a future phase
- Copilot prompt attachment UX still requires manual file attach (no `/` command shortcut)
- No publish automation or release workflow yet
- Brownfield intelligence and project-state detection not started

## Next phase roadmap

1. Add `execute` and `verify` workflows
2. Add npx one-shot UX testing across macOS/Linux/Windows
3. Harden release flow (version bump, changelog, npm publish script)
4. Consider Cursor and Windsurf adapter support
