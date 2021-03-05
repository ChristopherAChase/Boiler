const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')
const inquirer = require('inquirer');

const remove = {
    async removeDirectory(template){
        try {
            await util.checkDirectory(template)
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
            
            await fs.remove(path.join(util.customTemplateDirectory, template));
            console.log(`Template ${template} has been removed.`);
        } catch ({message}) {
            console.error(message)
        }
    } 
};

module.exports = remove