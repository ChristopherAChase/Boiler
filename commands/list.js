const tree = require('tree-node-cli');
const util = require('../lib/util')

const list = {

    listAvailableTemplates(){
        const settings = {dirsOnly: true, maxDepth: 1};

        const base = tree(util.baseTemplateDirectory, {...settings})
        const custom = tree(util.customTemplateDirectory, {...settings})
        
        console.log(`${base}${custom.length > 6 ? '\n' + custom : ''}\n`);
    }

};

module.exports = list
