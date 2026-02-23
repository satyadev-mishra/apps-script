#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Example:
// npm run clasp dev
// npm run clasp prod

const [, , mode] = process.argv;

if (!['dev', 'prod', 'development', 'production'].includes(mode)) {
  console.error('❌ Use: npm run clasp dev | prod');
  process.exit(1);
}

// Normalize mode
const normalizedMode =
  mode === 'development' ? 'dev' : mode === 'production' ? 'prod' : mode;

// -----------------------------
// Load script IDs
// -----------------------------
const configPath = path.join(__dirname, '../clasp.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const scriptId = config[normalizedMode]['scriptId'];

if (!scriptId) {
  console.error(`❌ No scriptId found for mode: ${normalizedMode}`);
  process.exit(1);
}

// -----------------------------
// Update .clasp.json
// -----------------------------
const claspJsonPath = path.join(__dirname, '../.clasp.json');
const claspJson = JSON.parse(fs.readFileSync(claspJsonPath, 'utf8'));

claspJson.scriptId = scriptId;

fs.writeFileSync(claspJsonPath, JSON.stringify(claspJson, null, 2));

// -----------------------------
// Update .claspignore
// rootDir = "src"
// -----------------------------
const baseIgnore = `
node_modules/
scripts/
.vscode/
.git/
.prettierrc
.prettierignore
package.json
package-lock.json
README.md
tsconfig.json
.clasp.json
`;

let modeIgnore = '';

if (normalizedMode === 'dev') {
  modeIgnore = `
# Ignore production constants
prod.constants.js
`;
} else {
  modeIgnore = `
# Ignore development constants
dev.constants.js
`;
}

const claspIgnorePath = path.join(__dirname, '../.claspignore');
fs.writeFileSync(claspIgnorePath, baseIgnore + modeIgnore);

console.log(`\n✅ Environment switched to ${normalizedMode.toUpperCase()}`);
console.log(`📌 Script ID updated`);
console.log(`📁 .claspignore updated\n`);
