const fs = require('fs');
const path = require('path');
const { readFile, rm, appendFile, copyFile} = require('fs');
const { mkdir, readdir } = require('fs/promises');
let assetsFolder = path.join(__dirname, 'assets');
let assetsFolderCopy = path.join(__dirname, 'project-dist', 'assets') ;
const styleFolder = path.join(__dirname, 'styles');
const styleFolderCopy = path.join(__dirname, 'project-dist', 'style.css ');


async function copyDir(assetsFolder, assetsFolderCopy) {
    mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
    mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true})
    const tags = await readdir(assetsFolder, {withFileTypes: true})
    tags.forEach(element => {
        if (element.isFile()) {
            copyFile(path.join(assetsFolder, element.name), path.join(assetsFolderCopy, element.name), (err) => {if (err) throw err})
        }
        else {
            mkdir(path.join(assetsFolderCopy, element.name), {recursive: true})
            copyDir(path.join(assetsFolder, element.name), path.join(assetsFolderCopy, element.name))
        }
    })
   
}
async function copyCss() {
    fs.readdir(styleFolder, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach(function(file) {
            let pathFile = path.join(styleFolder, file.name);
            let fileExt = path.extname(file.name);
            if (fileExt === '.css') {
                fs.readFile(pathFile, 'utf-8', (err, data) => {
                    if (err) throw err;
                    else {
                        fs.appendFile(styleFolderCopy, data, (err) => {
                            if (err)
                                throw err;
                        })
                    }
    
                });
            }
        })
    })
    
}

async function copyHTML() {
    let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), {encoding : 'utf-8'})
    const components = await readdir(path.join(__dirname, 'components'), {withFileTypes: true})
    const dir = components .filter(element => path.extname(element.name) === '.html')
    for (let i=0;i<dir.length;i++) {
        let elem = await fs.promises.readFile(path.join(__dirname, 'components', dir[i].name), {encoding : 'utf-8'}, (err) => {if (err) throw err})
        template = template.replace(`{{${dir[i].name.split('.')[0]}}}`, elem)
    }
    appendFile(path.join(__dirname, 'project-dist', 'index.html'), template, (err) => {if (err) throw err})
}

    copyDir(assetsFolder, assetsFolderCopy);
    copyCss();
    copyHTML();
