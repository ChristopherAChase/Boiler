#!/usr/bin/env node

// Import the commands for the main application to have access to run 
const g = require('../commands/generate');
const add = require('../commands/add');
const list = require('../commands/list');
const view = require('../commands/view');
const remove = require('../commands/remove');
const rename = require('../commands/rename');
const util = require('../lib/util');

//Grants us access to the properties and information in the package.json file
const pkg = require('../package.json'); 

//Imports the commander library to easily retrieve and parse commands entered
// in the console
const { Command } = require('commander');
//Instantiates the Command object in order to have access to all of it's properties and methods
const program = new Command();

global.__basedir = __dirname;

// Adds a version number to the program using the version listed in the package.json file 

program
    .version(pkg.version)

/*
    From here on down are the different commands available to the user.
    .command() functions are the name of the command that the user enters into the command line
    .description() method provides the text to describe the command when running boiler --help
    .action() contains a function that performs the actions ran when the command is called
        in this case, most of them are simply calling a function from a different command objects

*/
program
    .command('list')
    .description('provides list of all templates available')
    .action(() => {
        list.listAvailableTemplates();
    })

program
    .command('view [directory]') //Directory is optional - based on the [] surrounding the variable name
    .description('display directory structure of specified template (defaults to current directory)')
    .action((directory = '.') => {
        view.viewTemplateStructure(directory);
    })

program
    .command('add [templateName]')
    .option('-o, --overwrite', 'Overwrites template if one already exists')
    .description('add current directory structure as new boilerplate')
    .action((templateName, {overwrite}) => {
        add.template = templateName;
        add.addTemplate(overwrite);
    })

program
    .command('remove <template>') // template variable is required - base on the <> surrounding the variable name
    .description('remove specified directory structure as a boilerplate')
    .action((template) => {
        remove.removeDirectory(template);
    })

program
    .command('rename <currentName> <newName>')
    .description('renames a specified boilerplate')
    .action((currentName, newName ) => {
        rename.renameDirectory(currentName, newName);
    })

program
    .command('generate <template> [directoryName]')
    .description('specify a name of an existing template to copy it to your directory')
    .action((template, directoryName) => {
        g.template = template;
        g.templateLocation = util.templateLocation(template)
        g.desiredLocation = directoryName;

        if(g.templateLocation){
            g.generateTemplate()
        }
    })
program.parse(process.argv) //process variable is referring to Node.js itself.