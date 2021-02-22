#!/usr/bin/env node

const { Command } = require('commander');
const pkg = require('../package.json');
const add = require('../commands/add');
const list = require('../commands/list');
const remove = require('../commands/remove');
const g = require('../commands/generate');
// const Generator = require('../commands/generate');
const program = new Command();

global.__basedir = __dirname;

program
    .version(pkg.version)

program
    .command('list [directory]')
    .description('list directory structure of specified template (defaults to current directory)')
    .action((directory) => {
        if (directory){
            list.listTemplateStructure(directory);
        }
        else{
            list.listCurrentDirectory();
        }
    })

program
    .command('add')
    .option('-b, --bare', 'creates the new template with only the directories, none of the files')
    .description('add current directory structure as new boilerplate')
    .action(() => {
        add.addDirectory();
    })

program
    .command('remove <template>')
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
    .option('-b --bare', 'generates the folder structure without the files')
    .description('specify a name of an existing template to copy it to your directory')
    .action((template, directoryName, options) => {
        g.template = template;
        g.desiredLocation = directoryName;
        g.isBare = options.bare;
        
        g.setTemplateLocation(template);
        
        if(g.templateLocation !== null){
            g.generateTemplate()
        }
    })
program.parse(process.argv)