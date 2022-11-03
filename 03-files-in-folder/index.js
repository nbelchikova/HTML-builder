const path = require('path');
const fs = require('fs');
const folder = path.join( __dirname, '/', 'secret-folder');

fs.readdir(folder,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  files.forEach((i,index) => {
    let file = path.join(folder, '/', files[index]);
    fs.stat(file, (err, stat) => {
      if (err) {
        console.log(err);
      }
      if (stat.isFile() === true) {
        let fileName = path.parse(file).name;
        let fileExt = path.parse(file).ext.slice(1);
        console.log(`${fileName} - ${fileExt} - ${(stat.size/1024).toFixed(2)} kb`);
      }
    });
  });
});