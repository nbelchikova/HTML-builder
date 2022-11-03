const fs = require('fs');
const path = require('path');
const {mkdir, copyFile, rm, readdir} = require('fs/promises');
const files = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

async function copyDir()  {
    await fs.promises.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
    console.log('The folder was created');
  });
  const tags = await readdir(files, {withFileTypes: true});
  const filesIncluded = tags.filter(file => file.isFile()).map(elem => elem.name);
  filesIncluded.forEach(file => {
    let pathFiles = path.join(files, file);
    let pathFilesCopy = path.join(filesCopy, file);
    copyFile(pathFiles, pathFilesCopy);
  });
};
copyDir();
