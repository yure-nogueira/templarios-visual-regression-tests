const fs = require('fs');
const path = require('path');

const environmentPath = path.join(
  __dirname,
  '..',
  '..',
  'src',
  'medsoft-arquitetado',
  'environments',
  'environment.ts'
);
const originalLine = /export const INITIAL_PAGE = .*/;
const modifiedLine =
  "export const INITIAL_PAGE = '/templarios/tests-environment';";

// Read the original content of the environment.ts file
const originalContent = fs.readFileSync(environmentPath, 'utf8');
let modifiedContent = originalContent.replace(originalLine, modifiedLine);
fs.writeFileSync(environmentPath, modifiedContent, 'utf8');

// Check if the file is already modified
const isFileModified = originalContent !== modifiedContent;

// Stop the script when the process is terminated
process.on('SIGINT', () => {
  if (isFileModified) {
    // Revert the environment.ts file to the original content
    fs.writeFileSync(environmentPath, originalContent, 'utf8');
  }
  process.exit();
});

setInterval(() => {}, Infinity);
