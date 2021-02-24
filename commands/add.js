const fs = require('fs-extra');
const path = require('path');
const util = require('../lib/util')

const add = {
    addTemplate(template){
        let templateDirectory = util.templateDirectory(template);
        if(templateDirectory){
            console.log(`There is already a ${templateDirectory.toLowerCase()} template with the name "${template}"`);
            return
        }

        let desiredLocation = path.join(util.customTemplateDirectory, template)
        fs.mkdir(desiredLocation, (err) => {
            console.log(err);
        })

        fs.copy(path.resolve('.'), desiredLocation, (err) => {
            console.log(err);
        })

        console.log(`Created new template "${template}"`)
    }
};

module.exports = add