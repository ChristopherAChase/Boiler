const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')
const inquirer = require('inquirer');

const add = {
    template: null,

    async addTemplate(overwrite){
        const {template} = this
        let templateDirectory = util.templateDirectory(template);
        if(templateDirectory){
            if(!overwrite){
                console.log(`There is already a ${templateDirectory.toLowerCase()} template with the name "${template}"`);
    
                if(templateDirectory.toLowerCase() === 'custom'){
                    try {
                        const {overwrite} = await inquirer.prompt([
                            {
                                name: 'overwrite',
                                message: 'Do you want to overwrite this template?',
                                type: 'confirm'
                            }
                        ])
                        if(overwrite){
                            await this.Overwrite()
                        }
                        else{
                            console.log('Template was not overwritten');
                        }
                    } catch (err) {
                        console.error(err.message);
                    }
                }
            }
            else{
                this.Overwrite()
            }
        }
        else{
            await this.createTemplate(template)
            console.log(`Created new template "${template}"`);
        }
    },
    
    async Overwrite(){
        const {template} = this
        try{
            await (fs.remove(path.join(util.customTemplateDirectory, template)));
            await (this.createTemplate())
            console.log(`Overwrote template "${template}"`)
        }
        catch({message}){
            console.error(message)
        }
    },

    async createTemplate(){
        const {template} = this
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