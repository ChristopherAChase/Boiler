const fs = require('fs-extra');
const path = require('path');

const generate = {
    currentDirectory : path.resolve('.'),
    desiredLocation: null,
    templateLocation : null,
    template : null,
    isBare : null,

    generateTemplate(){
        this.desiredLocation = path.join(this.currentDirectory, this.desiredLocation);
        if(fs.existsSync(this.desiredLocation)){
            console.log(`There is already a directory named ${path.basename(this.desiredLocation)} here!`);
            return;
        }

        fs.mkdir(path.resolve(this.desiredLocation))
        .then(fs.copy(this.templateLocation, path.resolve(this.desiredLocation)) )
        .catch((err) => console.error(err.message))
        
        console.log(`Template "${this.template}" has been generated in directory ${path.basename(this.desiredLocation)}`);
    }
}

module.exports = generate;