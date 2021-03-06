const tree = require('tree-node-cli');
const util = require('../lib/util')

const list = {

    listAvailableTemplates(){
        // Create an object of settings
        const settings = {dirsOnly: true, maxDepth: 1};

        // Gather the tree structure for both the base and custom templates with the specified settings in the above object
        const base = tree(util.baseTemplateDirectory, {...settings})
        const custom = tree(util.customTemplateDirectory, {...settings})
        
        //Print out the directory trees
        console.log(`${base}${custom.length > 6 ? '\n' + custom : ''}\n`);
    }

};

module.exports = list
