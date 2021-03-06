const tree = require('tree-node-cli');
const util = require('../lib/util');

/*
    This command lets you view the structure of a specified boiler plate 
        OR the structure of the current directory you're in, allowing you to view what will be added 
        if you were to add the current directory as a new template.
*/


const view = {
    directoryPath : null,

    viewTemplateStructure(template){
        // If a template was not provided, then the desired directory path is the current path, otherwise, it's the path of the template
        this.directoryPath = (template === '.') ? process.cwd() : util.templateLocation(template);

        if(this.directoryPath){
            /*
                Calling the tree method of the tree-node-cli module.
                    - Passing it the path of the directory we want to visualize
                    - An object specifying "parameters" or "options" that specify how we want the tree to behave.
                        - In this case, we are excluding any files or directories in the passed in array.
            */
            const directory = tree(this.directoryPath, {
            exclude: [/node_modules/, /package*/, /LICENSE/]
            });

            console.log(directory);
        } 
    },
};

module.exports = view
