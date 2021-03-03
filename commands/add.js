const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')
const inquirer = require('inquirer');

const add = {
    addTemplate(template){
        let templateDirectory = util.templateDirectory(template);
        if(templateDirectory){
            console.log(`There is already a ${templateDirectory.toLowerCase()} template with the name "${template}"`);

            if(templateDirectory.toLowerCase() === 'custom'){
                this.confirmOverwrite(template)
            }
        }
        else{
            this.createTemplate(template)
                .then(console.log(`Created new template "${template}"`))
        }
    },

    async confirmOverwrite(template){
        try{
            const answer = await inquirer.prompt([
                {
                    name: 'overwrite',
                    message: 'Do you want to overwrite this template?',
                    type: 'confirm'
                }
            ])
            if (!answer.overwrite) throw new Error(`The ${template} template was not overwritten`)
            await (fs.remove(path.join(util.customTemplateDirectory, template)));
            await (this.createTemplate(template))
            console.log(`Overwrote template "${template}"`)
        }
        catch({message}){
            console.error(message)
        }
    },

    async createTemplate(template){
        let desiredLocation = path.join(util.customTemplateDirectory, template)
        try{
            await fs.mkdir(desiredLocation)
            await fs.copy(path.resolve('.'), desiredLocation)
        }
        catch({message}){
            console.error(message);
        }
    }
};

module.exports = add