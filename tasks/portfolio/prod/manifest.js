import config from '../../config.js';
import gulp from 'gulp';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

gulp.task('mani:dev', () => {
    return gulp.src(config.paths.src.root + 'manifest.js')
        .pipe(gulp.dest(config.paths.builds.prod.root))
        .on('error', util.log);
});