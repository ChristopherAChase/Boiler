const generate = {
    generateBareTemplate(template){
        console.log(`I will be generating the directory structure of template "${template}" but leaving out the files`);
    },

    generateCompleteTemplate(template){
        console.log(`I will be generating the complete directory structure of template "${template}" including the files`);
    }
}

module.exports = generate;