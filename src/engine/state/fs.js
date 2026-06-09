const fs = require('node:fs');
const path = require('node:path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, value);
}

function fileExists(rootDir, relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function removeFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function removeEmptyParents(startPath, stopPath) {
  let currentPath = path.resolve(startPath);
  const normalizedStop = path.resolve(stopPath);

  while (currentPath.startsWith(normalizedStop) && currentPath !== normalizedStop) {
    if (!fs.existsSync(currentPath)) {
      currentPath = path.dirname(currentPath);
      continue;
    }
    if (fs.readdirSync(currentPath).length > 0) {
      break;
    }
    fs.rmdirSync(currentPath);
    currentPath = path.dirname(currentPath);
  }
}

module.exports = {
  ensureDir,
  readJsonIfExists,
  writeJson,
  writeText,
  fileExists,
  removeFileIfExists,
  removeEmptyParents,
};
