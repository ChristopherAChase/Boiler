const tree = require('tree-node-cli');
const util = require('../lib/util')

const list = {

    listAvailableTemplates(){

        const baseTemplates = tree(util.baseTemplateDirectory, {
            dirsOnly: true,
            maxDepth: 1
        });
        const customTemplates = tree(util.customTemplateDirectory, {
            dirsOnly: true,
            maxDepth: 1
        });

        console.log(`${baseTemplates}${customTemplates.length > 6 ? '\n' + customTemplates : ''}\n`);
    }

};

module.exports = list
