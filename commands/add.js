const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')
const inquirer = require('inquirer');

/*
    This command is responsible for adding a template to the list of available custom templates.
        - Can also overwrite provided the '-o' or '--overwrite' options were used in the command call
*/

const add = {
    template: null,

    async addTemplate(overwrite){
        //Destructurizes the 'this' object, only retrieving the template variable
        const {template} = this
        
        //get's the directory the specified template is contained in - either returns 'base' or 'custom'
        let templateDirectory = util.templateDirectory(template);

        //If the template already exists, we need to handle overwriting it, if not, then we simply add it as a new one.
        if(templateDirectory){
            //Check if the overwrite option was passed in (-o or --overwrite)
            if(!overwrite){
                // If overwrite option was not provided, check with the user to see if they want to overwrite it or not
                console.log(`There is already a ${templateDirectory.toLowerCase()} template with the name "${template}"`);
                
                //The template must be a custom directory if we want it to overwrite it. 
                if(templateDirectory.toLowerCase() === 'custom'){
                    try {
                        // Prompt the user with a yes or no question
                        const {overwrite} = await inquirer.prompt([
                            {
                                name: 'overwrite',
                                message: 'Do you want to overwrite this template?',
                                type: 'confirm'
                            }
                        ])
                        if(overwrite){ // The user reponded 'y', so we overwrite the template
                            await this.Overwrite()
                        }
                        else{ // The user responed 'n'
                            console.log('Template was not overwritten');
                        }
                    } catch (err) {
                        console.error(err.message);
                    }
                }
            }
            else{ // The user specified the '-o' or '--overwrite' option when calling the command
                this.Overwrite()
            }
        }
        else{// The template did not exist, so we simply add it in. 
            await this.createTemplate(template)
            console.log(`Created new template "${template}"`);
        }
    },
    

    // Asynchronous method solely in charge of overwriting the file. 
    async Overwrite(){
        const {template} = this
        try{
            // Remove the already existing template directory
            await (fs.remove(path.join(util.customTemplateDirectory, template)));
            // Take the current directory's structure, and copy it to the same templates name.
            await (this.createTemplate())
            console.log(`Overwrote template "${template}"`)
        }
        catch({message}){
            console.error(message)
        }
    },

    // Asynchronous method to create the template in the template directory
    async createTemplate(){
        const {template} = this
        //Get the name of the directory the template will be located, by appending the custom template directory, with the name of the template
        let desiredLocation = path.join(util.customTemplateDirectory, template)
        try{
            //Creates the directory
            await fs.mkdir(desiredLocation)
            // Copies the contents of the current directory into the newly created template directory
            await fs.copy(path.resolve('.'), desiredLocation)
        }
        catch({message}){
            console.error(message);
        }
    }
};

module.exports = add