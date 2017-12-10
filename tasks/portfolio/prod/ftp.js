import config from '../../config.js';
import gulp from 'gulp';
// import server from '../../../servers.json';
var ftp = require('gulp-ftp');

// SOLUTION 1
// var concat = config.paths.builds.prod.root+'**/*';
// gulp.task('ftp', () => {
//     return gulp.src(concat)
//         .pipe(ftp({
//             host: server["servers"]["portfolio"]["host"],
//             user: server["servers"]["portfolio"]["user"],
//             pass: server["servers"]["portfolio"]["pass"],
//             remotePath: server["servers"]["portfolio"]["remotePath"]
//         }))
//         .pipe(gulp.dest(concat))
// });



// SOLUTION 2
// var gutil = require( 'gulp-util' );
// var ftp = require( 'vinyl-ftp' );
 
// gulp.task( 'ftp', function () {
 
//     var conn = ftp.create( {
//         host:    	server["servers"]["portfolio"]["host"],
//         user:     server["servers"]["portfolio"]["user"],
//         password: server["servers"]["portfolio"]["pass"],
//         parallel: 10,
//         log:      gutil.log,
//         idleTimeout: 90000
//     } );
 
//     var globs = [
//         // 'dist/prod/index.html',
//         // 'dist/prod/css/**/*',
//         'dist/prod/**/*',
//         // 'fonts/**',
//         // 'index.html'
//     ];
 
//     // using base = '.' will transfer everything to /public_html correctly 
//     // turn off buffering in gulp.src for best performance 
 
//     return gulp.src( globs, { base: 'dist/prod', buffer: false } )
//         .pipe( conn.newer( server["servers"]["portfolio"]["remotePath"] ) ) // only upload newer files 
//         .pipe( conn.dest( server["servers"]["portfolio"]["remotePath"] ) );
 
// } );