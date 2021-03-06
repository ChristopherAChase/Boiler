const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util');

/*
    Straight forward method in charge of renaming a directory. 
*/

const rename = {
    async renameDirectory(currentName, newName){
        try {
            // Check to make sure the desired directory is both existent, and a custom template
            const templateDirectory = util.checkDirectory(currentName)

            if (templateDirectory) {
                // Renames the old directory name with the new directory name (the new template name)
                await fs.rename(path.join(util.customTemplateDirectory, currentName), path.join(util.customTemplateDirectory, newName))
                console.log(`Template has been renamed from ${currentName} to ${newName}`)
            }
        } catch ({code, message}) {
            console.error(code === 'ENOTEMPTY' ? `There is already a template with the name ${newName}`: message);
        }
    }
};

module.exports = rename