import config from '../../config.js';
import gulp from 'gulp';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
const fs = require('fs');


// DECLARE FOLDERS TO SEARCH
const folders = ['js', 'css'] 

// SET FOLDERS TO SEARCH IN OBJ
var obj = {
   js: [],
   css: []
};

var manifest_path = config.paths.builds.prod.root+'manifest.json';
var root_folder = config.paths.builds.prod.root;
var json = null;

gulp.task('tsjson:prod', () => {

	// Loop FOLDERS then -> FILES
	folders.forEach(folder => {
		var obj_folder = obj[folder];
		fs.readdirSync(root_folder+folder).forEach(file => {
			obj[folder].push(folder+'/'+file);
			console.log(obj[folder]);
		});
	});

	// Convert to json
	// Writefile to root location
	json = JSON.stringify(obj);
	fs.writeFile(manifest_path, json, 'utf8', function(){console.log('TASK COMPLETED')});

    return gulp.src(config.paths.src.root)
    	// .pipe(myfunc())
        .pipe(gulp.dest(config.paths.builds.prod.root))
        .on('error', util.log);
});
