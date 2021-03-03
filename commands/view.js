const tree = require('tree-node-cli');
const util = require('../lib/util')

const view = {
    directoryPath : null,

    viewTemplateStructure(template){
        this.directoryPath = (template === '.') ? process.cwd() : util.templateLocation(template);
        if(this.directoryPath){
            const directory = tree(this.directoryPath, {
            exclude: [/node_modules/, /package*/, /LICENSE/]
            });
    
            console.log(directory);
        } 
    },
};

module.exports = view
