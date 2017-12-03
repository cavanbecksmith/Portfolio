import config from '../../config.js';
import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-sass'

gulp.task('css:prod', () => {
    return gulp.src(config.paths.src.css)
        .pipe(gulp.dest(config.paths.builds.prod.root+'css'))
        .on('error', util.log);
});
