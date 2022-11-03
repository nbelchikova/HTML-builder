const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css')

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(function(file) {
        let pathFile = path.join(folder, file.name);
        let fileExt = path.extname(file.name);
        if (fileExt === '.css') {
            fs.readFile(pathFile, 'utf-8', (err, data) => {
                if (err) throw err;
                else {
                    fs.appendFile(bundle, data, (err) => {
                        if (err) throw err;
                    })
                }
            });
        }
    })
})