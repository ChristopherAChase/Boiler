# Boiler

A node.js CLI application that acts as a boilerplate manager. This will allow developers to have constant access to the boiler plates, or directory structures that
they may use on their many projects. 

When installed, the developer will have immediate access to a few preset, "base" templates. If these templates do not meet their needs, or are not in the same file 
structure that they prefer for these types of projects, then they can create their own.

# Commands

There are currently 6 commands available in the application
* List
  * Provides the developer with a list of all of the templates that are available to them. This is currently provided as a tree like structure. I may want to display this as an actual list that can provide a brief description for each template.
* View <template> 
  * This will show the developer what the specified template's directory structure looks like, allowing them to verify that the template specified is the one they wish to copy over
* Generate <template> <project name> 
  * Takes the specified template, copies it's directory structure and content and puts it into a directory with the specified name. 
* Add <new template name>
  * Goes down the current directory structure, copies the directories and files and creates a new boilerplate with the specified name, allowing them to re-use that structure in the future
* Remove <template>
  * As expected, this command removes the specified template from the list of available templates
* Rename <template name> <new template name> 
  * Another straight forward one, renames a template to maybe a more memorable, or shorter name.

# Installation

Once cloned to your local directory run the below command to create the node_modules directory
`npm install`

In order to run the commands "naturally", you are going to need to create a link to the project's directory from within the project's directory
`npm link boiler`

* you may need to have root permissions
  *`sudo npm link boiler`
