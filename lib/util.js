const fs = require('fs-extra');
const path = require('path');

const util = {
    baseTemplateDirectory : path.resolve(path.join(__dirname, '..', 'directories', 'base')),
    customTemplateDirectory : path.resolve(path.join(__dirname, '..', 'directories', 'custom')),

    templateLocation(template){
        if(!fs.existsSync(path.join(this.baseTemplateDirectory, template))){
            if(!fs.existsSync(path.join(this.customTemplateDirectory, template))){
                console.log(`The template "${template}" does not exist`);
                return null;
            }
            else{
                return path.join(this.customTemplateDirectory, template);
            }
        }
        else{
            return path.join(this.baseTemplateDirectory, template);
        }
    },

    templateDirectory(template){
        if(!fs.existsSync(path.join(this.baseTemplateDirectory, template))){
            if(!fs.existsSync(path.join(this.customTemplateDirectory, template))){
                return null;
            }
            else{
                return path.basename(this.customTemplateDirectory);
            }
        }
        else{
            return path.basename(this.baseTemplateDirectory);
        }
    },

    async checkDirectory(template){
        const templateDirectory = util.templateDirectory(template)
        try {
            if(!templateDirectory){
                throw new Error(`${template} does not exist. \nTry running 'boiler list' to view all available templates.`);
            }
            if(templateDirectory.toLowerCase() === 'base'){
                throw new Error('You can only modify custom templates.');
            }
            return templateDirectory
        } catch ({message}) {
            console.error(message)
        }
    }
}

module.exports = util;