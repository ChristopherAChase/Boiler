const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util');

const rename = {
    async renameDirectory(currentName, newName){
        try {
            await util.checkDirectory(currentName)
            await fs.rename(path.join(util.customTemplateDirectory, currentName), path.join(util.customTemplateDirectory, newName))
            console.log(`Template has been renamed from ${currentName} to ${newName}`)
        } catch ({code, message}) {
            console.error(code === 'ENOTEMPTY' ? `There is already a template with the name ${newName}`: message);
        }
    }
};

module.exports = rename