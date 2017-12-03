# Gulp module template
## Why would you use this?
The reason that you would use this template is that you are able to build your own modules that can be reused in other gulp templates. 
## Installation
Simply download and `npm install`.
## How do i get started using this?

If you wanted to create a new set of tasks for a project called **web** you would simply create a folder inside the `./tasks` folder called `./tasks/web` and create 2 folders inside that called `./tasks/web/dev` and `./tasks/web/prod`.

Now if you wanted to use this folder simply change the variable on the **gulpfile.babel.js** `var using = project.email;` to another one of the listed strings in the object
*Make sure that you copy both the dev and prod tasks*

This is where the reuse of modules becomes quite easy as you can copy over all of the neccecary modules containing the tasks from the `./tasks/adv` folder to web folder.
## I want to make my own task, What do i do?
It would be recommeneded that you would find a task similar to what you want. If you are just copying over files from source to destination you would simply just copy the **libs.js** task as this just moves files from 1 folder to anoher. 
## What do i do if I want to create a new path for a different filetype? (E.G if you wanted to detect .scss files)
All of the details for the paths are in `./tasks/config.js` file. From here you are able to change the destination & source of where you files are kept. By default these are src & dist.
You would go to the config file and edit the `globs` variable. By creating a new entry you will have to include:

* The root src (Leave this as is )
* The path to your folder (E.G) css would be in the css folder
* Folders or file that will be included in the search
* Optional the filetype you are looking for (Dont put anything here if you put a file on the previous parameter)

`path.join(cfg.paths.src.root, 'path_to_folder', 'folders_to_search', 'file')`

**Example: This will look through the css folder for any file which is main.scss**
`sass: path.join(cfg.paths.src.root, 'css', '**', 'main.scss'),`
## How do i use these entry points on my task?
In the config file it will create src and destination paths.

## Entry point
the entry point will be for the **libs** directory `config.paths.src.libs`
## Destination
For the dev task the build folder would be `config.paths.builds.dev.libs` this will match whatever you called the path in the `globs` variable

For the production task the build folder would be `config.paths.builds.prod.libs`
