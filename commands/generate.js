const fs = require('fs-extra');
const path = require('path');

const generate = {
    currentDirectory : path.resolve('.'),
    desiredLocation: null,
    templateLocation : null,
    template : null,

    async generateTemplate(){
        let {desiredLocation, currentDirectory, template, templateLocation} = this;
        desiredLocation = path.join(currentDirectory, desiredLocation);

        try {
            if(fs.existsSync(desiredLocation)){
                throw new Error(`There is already a directory named ${path.basename(desiredLocation)} here!`);
            }

            await fs.mkdir(path.resolve(desiredLocation))
            await fs.copy(templateLocation, path.resolve(desiredLocation)) 
            
            console.log(`Template "${template}" has been generated in directory ${path.basename(desiredLocation)}`);
            
        } catch (err) {
            console.error(err.message)
        }
    }
}

module.exports = generate;