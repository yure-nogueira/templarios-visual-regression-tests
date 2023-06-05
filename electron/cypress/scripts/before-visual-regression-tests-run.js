const net = require('net');
const fs = require('fs');
const path = require('path');

const port = 8100;
const host = 'localhost';
const tsconfigPath = path.join(__dirname, '..', '..', 'tsconfig.json');

const socket = new net.Socket();
let originalContent;
let isFileModified = false;

socket.on('connect', () => {
  console.log(`Port ${port} is open.`);

  // Read the tsconfig.json file
  fs.readFile(tsconfigPath, 'utf8', (error, data) => {
    originalContent = data;

    if (error) {
      console.error(
        `An error occurred while reading the tsconfig.json file: ${error}`
      );
      socket.destroy();
      return;
    }

    // Check if "baseUrl" line is already commented
    const commentRegex = /\/\/\s*"baseUrl"\s*:\s*"\.\/",/;

    if (commentRegex.test(data)) {
      console.log(`The "baseUrl" line is already commented.`);
      socket.destroy();
      return;
    }

    // Comment the "baseUrl" line
    const updatedData = data.replace(/("baseUrl"\s*:\s*"\.\/",)/, '// $1');

    // Write the updated tsconfig.json file
    fs.writeFile(tsconfigPath, updatedData, 'utf8', (error) => {
      if (error) {
        console.error(
          `An error occurred while updating the tsconfig.json file: ${error}`
        );
      } else {
        isFileModified = true;
        console.log('The "baseUrl" line has been commented in tsconfig.json.');
      }
      socket.destroy();
    });
  });
});

socket.on('error', (error) => {
  if (error.code === 'ECONNREFUSED') {
    console.log(`Port ${port} is not open.`);
  } else {
    console.error(
      `An error occurred while checking port ${port}: ${error.message}`
    );
  }
});

socket.connect(port, host);

process.on('SIGINT', () => {
  if (isFileModified) {
    // Revert the environment.ts file to the original content
    fs.writeFileSync(tsconfigPath, originalContent, 'utf8');
  }
  process.exit();
});

setInterval(() => {}, Infinity);
