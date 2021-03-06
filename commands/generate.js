const fs = require('fs-extra');
const path = require('path');

/*
    This command is in charge of taking an already existing template/folder structure, and re-creating it in a 
    specified directory. 

    DesiredLocation 
        - The name of the directory you want the boiler plate's contents to reside in
    TemplateLocation 
        - The directory path of where the template is held
    Template 
        - The name of the template you want to duplicate

*/
const generate = {
    currentDirectory : path.resolve('.'),
    desiredLocation: null,
    templateLocation : null,
    template : null,

    async generateTemplate(){
        //Destructures the 'this' object (the current object) and retrieves these four properties
            // Prevents me from having to write 'this.<property>' everytime I want to refer to the object's props
        let {desiredLocation, currentDirectory, template, templateLocation} = this;

        //Creates an absolute path for the desired directory by joining the filepath to the directory, and the directory's name
        desiredLocation = path.join(currentDirectory, desiredLocation);

        try {
            //Test if the directory exists - It's undesirable to have two directories within the same directory having the same name
            if(fs.existsSync(desiredLocation)){
                throw new Error(`There is already a directory named ${path.basename(desiredLocation)} here!`);
            }

            //First we create the directory
            await fs.mkdir(path.resolve(desiredLocation))
            //Then when that is done, we copy the template's file structure over into this directory
            await fs.copy(templateLocation, path.resolve(desiredLocation)) 
            
            console.log(`Template "${template}" has been generated in directory ${path.basename(desiredLocation)}`);
            
        } catch (err) {
            console.error(err.message)
        }
    }
}

module.exports = generate;