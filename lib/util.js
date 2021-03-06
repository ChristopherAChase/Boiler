const fs = require('fs-extra');
const path = require('path');

/*
    The util object is a utility object that provides frequently used methods and properties throughout the application
*/

const util = {
    // Stores the directories for where both the base and custom templates
    baseTemplateDirectory : path.resolve(path.join(__dirname, '..', 'directories', 'base')),
    customTemplateDirectory : path.resolve(path.join(__dirname, '..', 'directories', 'custom')),

    //Returns the path to the template passed in (if it exists)
    templateLocation(template){
        //Checks if the template is located in the base templates
        if(fs.existsSync(path.join(this.baseTemplateDirectory, template))){
            return path.join(this.baseTemplateDirectory, template)
        }
        //Checks if the template is located in the custom templates
        if(fs.existsSync(path.join(this.customTemplateDirectory, template))){
            return path.join(this.customTemplateDirectory, template);        
        }
        console.log(`The template "${template}" does not exist`);
        return null;
    },

    //Returns specifically the directory name that contains the template - Either 'custom' or 'base'
    templateDirectory(template){
        //Checks if the template is located in the base templates
        if(fs.existsSync(path.join(this.baseTemplateDirectory, template))){
            return path.basename(this.baseTemplateDirectory);
        }
        //Checks if the template is located in the custom templates
        if(fs.existsSync(path.join(this.customTemplateDirectory, template))){
            return path.basename(this.customTemplateDirectory);
        }
        return null;
    },

    // Asynchronous function that determines whether or not a directory exists, and if it does, verifies that it is not a
        // base template
    async checkDirectory(template){
        // Grabs the name of the directory that holds the template (if it exists)
        const templateDirectory = util.templateDirectory(template)
        try {
            //Checks if the template directory exists (if the template exists), or if the directory name is not 'custom'
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