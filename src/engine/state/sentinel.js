const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { ensureDir, removeEmptyParents } = require('./fs');

const EHA_SENTINEL_START = '<!-- EHA:START — managed by eye-hate-agent, do not edit manually -->';
const EHA_SENTINEL_END = '<!-- EHA:END -->';

function upsertSentinelBlock(filePath, content) {
  const block = `${EHA_SENTINEL_START}\n${content}\n${EHA_SENTINEL_END}`;

  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, block + '\n');
    return 'created';
  }

  const existing = fs.readFileSync(filePath, 'utf8');
  const startIdx = existing.indexOf(EHA_SENTINEL_START);
  const endIdx = existing.indexOf(EHA_SENTINEL_END);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = existing.substring(0, startIdx);
    const after = existing.substring(endIdx + EHA_SENTINEL_END.length);
    fs.writeFileSync(filePath, before + block + after);
    return 'updated';
  }

  const separator = existing.endsWith('\n') ? '\n' : '\n\n';
  fs.writeFileSync(filePath, existing + separator + block + '\n');
  return 'appended';
}

function removeSentinelBlock(filePath, stopPath) {
  if (!fs.existsSync(filePath)) return false;

  const existing = fs.readFileSync(filePath, 'utf8');
  const startIdx = existing.indexOf(EHA_SENTINEL_START);
  const endIdx = existing.indexOf(EHA_SENTINEL_END);

  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) return false;

  const before = existing.substring(0, startIdx);
  const after = existing.substring(endIdx + EHA_SENTINEL_END.length);
  const result = (before + after).replace(/\n{3,}/g, '\n\n').trim();

  if (!result) {
    fs.unlinkSync(filePath);
    removeEmptyParents(path.dirname(filePath), stopPath || os.homedir());
  } else {
    fs.writeFileSync(filePath, result + '\n');
  }
  return true;
}

module.exports = {
  EHA_SENTINEL_START,
  EHA_SENTINEL_END,
  upsertSentinelBlock,
  removeSentinelBlock,
};
