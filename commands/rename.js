const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util');

const rename = {
    renameDirectory(currentName, newName){
        util.checkDirectory(currentName)
        .then(() => fs.rename(path.join(util.customTemplateDirectory, currentName), path.join(util.customTemplateDirectory, newName)))
        .then(() => console.log(`Template has been renamed from ${currentName} to ${newName}`))
        .catch((err) => {
            if(err.code === 'ENOTEMPTY'){
                console.error(`There is already a template with the name ${newName}`);
            }else{
                console.error(err.message);
            }
        })
        
    }
};

module.exports = rename