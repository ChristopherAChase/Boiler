const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')
const inquirer = require('inquirer');

const remove = {
    removeDirectory(template){
        util.checkDirectory(template)
        .then(() => {
            return inquirer.prompt([
                {
                    name: 'verifiedRemove',
                    message: 'Are you sure you want to remove this template? \n' 
                            + 'If you want to keep the template but wish it to '
                            + 'have different structure, you can use '
                            + '`boiler add <templatename>` to overwite it. ',
                    type: 'confirm'
                }
            ])
        })
        .then(({verifiedRemove}) => {
            if(!verifiedRemove) throw new Error(`Will not remove ${template}`);
            return fs.remove(path.join(util.customTemplateDirectory, template));
        })
        .then(() => console.log(`Template ${template} has been removed.`))
        .catch((err) => {console.error(err.message)})
    } 
};

module.exports = remove