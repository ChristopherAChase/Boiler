const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')
const inquirer = require('inquirer');

/*
    This command is in charge of removing a boiler plate from the list of available custom templates
*/

const remove = {
    async removeDirectory(template){
        try {
            // Checks that the chosen template is both existing and not a base template
            const templateDirectory = await util.checkDirectory(template)
            if (templateDirectory){
                //Verify the user wants to remove the template, and provide a way to update the template instead of removing it.
                const {verifiedRemove} = await inquirer.prompt([
                        {
                            name: 'verifiedRemove',
                            message: 'Are you sure you want to remove this template? \n' 
                                    + 'If you want to keep the template but wish it to '
                                    + 'have different structure, you can use '
                                    + '`boiler add <templatename>` to overwite it. ',
                            type: 'confirm'
                        }
                    ])
                if(!verifiedRemove) throw new Error(`Will not remove ${template}`);
                //Removes the directory 
                await fs.remove(path.join(util.customTemplateDirectory, template));
                console.log(`Template ${template} has been removed.`);
            }
        } catch ({message}) {
            console.error(message)
        }
    } 
};

module.exports = remove