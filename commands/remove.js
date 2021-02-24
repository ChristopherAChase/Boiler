const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')

const remove = {
    removeDirectory(template){
        const templateDirectory = util.templateDirectory(template)
        
        if(!templateDirectory){
            console.log(`${template} does not exist. \nTry running 'boiler list' to view all available templates.`);
            return;  
        }
        else if(templateDirectory === 'base'){
            console.log('You can only delete custom templates.');
            return;
        }
        else{
            fs.remove(path.join(util.customTemplateDirectory, template))
                .then(() => console.log(`Template ${template} has been removed.`))
                .catch((error) => console.log(error))
        }
    }
};

module.exports = remove