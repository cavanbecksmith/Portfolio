import config from '../../config.js';
import gulp from 'gulp';
import util from 'gulp-util';
// var zip = new require('node-zip')();
const zip = require('gulp-zip');

gulp.task('zip', () => {

    
    // zip.file(config.paths.builds.prod.root, 'hello there');
    // var data = zip.generate({base64:false,compression:'DEFLATE'});
    // console.log(data); // ugly data

    return gulp.src(config.paths.builds.prod.root+'**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest(config.paths.builds.prod.root))
        .on('error', util.log);
});
