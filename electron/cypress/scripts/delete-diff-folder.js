const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '..', 'snapshots', '__diff_output__');

fs.access(folderPath, (error) => {
  if (error) {
    console.log(`Folder ${folderPath} does not exist.`);
    return;
  }

  deleteFolder(folderPath);
});

function deleteFolder(folderPath) {
  fs.readdirSync(folderPath).forEach((file) => {
    const curPath = path.join(folderPath, file);

    if (fs.lstatSync(curPath).isDirectory()) {
      deleteFolder(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });

  fs.rmdirSync(folderPath);
  console.log(`Folder ${folderPath} has been deleted.`);
}
