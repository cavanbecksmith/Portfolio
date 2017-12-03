import config from '../../config.js';
import gulp from 'gulp';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';

gulp.task('libs:dev', () => {
    return gulp.src(config.paths.src.libs)
        .pipe(gulp.dest(config.paths.builds.dev.js))
        .on('error', util.log);
});