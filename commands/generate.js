const fs = require('fs-extra');
const path = require('path');

const generate = {
    baseTemplateDirectory : path.resolve(path.join(__dirname, '..', 'directories', 'base')),
    customTemplateDirectory : path.resolve(path.join(__dirname, '..', 'directories', 'custom')),
    currentDirectory : path.resolve('.'),
    desiredLocation: null,
    templateLocation : null,
    template : null,
    isBare : null,
    
    generateTemplate(){
        
        if(this.isBare){
            this.generateBareTemplate()
        }
        else{
            this.generateCompleteTemplate()
        }
    },

    generateBareTemplate(){
        console.log(`I will be generating the directory structure of template "${this.template}" but leaving out the files`);
        
    },

    generateCompleteTemplate(){
        fs.mkdir(path.resolve(this.desiredLocation))
        fs.copy(this.templateLocation, path.resolve(this.desiredLocation))
        console.log(`Template ${this.template} has been created in ${this.desiredLocation} directory`);
    },

    setTemplateLocation(template){
        if(!fs.existsSync(path.join(this.baseTemplateDirectory, template))){
            if(!fs.existsSync(path.join(this.customTemplateDirectory, template))){
                console.log(`The template "${template}" does not exist`);
            }
            else{
                this.templateLocation = path.join(this.customTemplateDirectory, template)
            }
        }
        else{
            this.templateLocation = path.join(this.baseTemplateDirectory, template)
        }
    }
}


module.exports = generate;