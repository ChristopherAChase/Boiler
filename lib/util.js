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

    templateDirectoryAsync(template){
        const baseDirectory = path.join(this.baseTemplateDirectory, template)
        const customDirectory = path.join(this.customTemplateDirectory, template)
        return new Promise((res, rej) => {
            if(!fs.existsSync(baseDirectory)){
                if(!fs.existsSync(customDirectory)){
                    rej( new Error(`${template} does not exist. \nTry running 'boiler list' to view all available templates.`));
                }
                else{
                    res(path.basename(this.customTemplateDirectory));
                }
            }
            else{
                res(path.basename(this.baseTemplateDirectory));
            }
        })

    },

    checkDirectory(template){
        const templateDirectory = util.templateDirectory(template)
        return new Promise((res, rej) => {
            if(!templateDirectory){
                rej( new Error(`${template} does not exist. \nTry running 'boiler list' to view all available templates.`));
            }
            if(templateDirectory.toLowerCase() === 'base'){
                rej(new Error('You can only modify custom templates.'));
            }
            res(templateDirectory)
        })
    }
}

module.exports = util;