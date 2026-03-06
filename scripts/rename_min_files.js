const fs = require('fs');
const path = require('path');

function renameMinFiles(dirPath) {
    fs.readdirSync(dirPath).forEach(filename => {
        if (filename.includes('_min')) {
            const oldPath = path.join(dirPath, filename);
            const newFilename = filename.replace('_min', '');
            const newPath = path.join(dirPath, newFilename);

            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${filename} -> ${newFilename}`);
        }
    });
}

renameMinFiles(path.join(__dirname, '../src/assets/other'));
console.log('Renaming complete!');
// git diff --stat