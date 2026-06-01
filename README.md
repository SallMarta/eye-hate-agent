# Eye Hate Agent (EHA)

A CLI engine that generates a shared set of rules, skills, and documentation workflows for AI agents directly into your repository. It enforces Spec-Driven Development (SDD) by standardizing how AI agents receive their instructions

---

## Get Started

### 1. Initialize EHA in your project
#### Run in your project repository:

```bash
npx @sallmarta/eye-hate-agent
```
#### Or install globally: 

```bash
npm i -g @sallmarta/eye-hate-agent
```
```bash
eha
```

### 2. Trigger your agent
Once generated, the files are immediately ready to use in your IDE. Trigger the workflows using your agent's native slash commands, file mentions, or prompt attachments (e.g., typing `/eha-bootstrap` or attaching the bootstrap file in chat).

### 3. Commit the generated files
The generated files (`.claude/`, `.github/`, or `.agents/`) act as your project's AI contract. Commit them to version control so your whole team shares the same agent behaviors and documentation standards.

---

## CLI Commands

```bash
eha [init]          # Wizard: detect project root, choose agent, generate files
eha init [agent]    # Set up EHA directly (e.g., claude, copilot, etc.)
eha doctor          # Verify generated files and EHA status
eha remove          # Remove all EHA-generated files and config
```

---

## What Gets Generated

Running `eha` detects your chosen agent and outputs fully self-contained files into its native configuration directory (e.g., `.claude/`, `.github/`, or `.agents/`). Every file is pre-injected with EHA's compact rules (4-layer taxonomy, ownership map, and Spec-Driven Development rules).

Regardless of the target agent, the output always includes:
- **Workflows**: Ready-to-use commands for project bootstrapping, doc refreshing, parity checks, and discussions.
- **Skills**: Expert capabilities like `code-audit`, `api-design`, `system-tester`, and `security-audit`.
- **Rules**: A central instruction file enforcing the EHA project contract.

---

## Updating

When a new version of EHA is released, simply run `eha` in your repository again. The engine will detect the version mismatch and automatically prompt you to regenerate the files with the latest improvements.

---

## Uninstallation & Cleanup

To completely remove EHA from your project and device:

### 1. Remove project files
Run the following command in your project root to clean up all generated AI context files and project metadata (`.eha/`):
```bash
eha remove
```

### 2. Uninstall the CLI (Total Removal)
To completely remove the CLI from your device, run:
```bash
npm uninstall -g @sallmarta/eye-hate-agent
```
