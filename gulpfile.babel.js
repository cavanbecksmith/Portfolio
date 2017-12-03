
import gulp from 'gulp';
import sequence from 'run-sequence';
import requireDir from 'require-dir';
import project from './project.js';

requireDir('./tasks/'+project+'/prod');
requireDir('./tasks/'+project+'/dev');

const chalk = require('chalk');
const log = console.log;

/*
=============================
Gulp - Default
-----------------------------
*/

gulp.task('default', () =>{

    log(chalk.cyan(`
 ██████╗ █████╗ ██╗   ██╗ █████╗ ███╗   ██╗                            
██╔════╝██╔══██╗██║   ██║██╔══██╗████╗  ██║                            
██║     ███████║██║   ██║███████║██╔██╗ ██║                            
██║     ██╔══██║╚██╗ ██╔╝██╔══██║██║╚██╗██║                            
╚██████╗██║  ██║ ╚████╔╝ ██║  ██║██║ ╚████║                            
 ╚═════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝                            
        `));

    log(chalk.green(`                                                                  
██████╗ ███████╗ ██████╗██╗  ██╗███████╗███╗   ███╗██╗████████╗██╗  ██╗
██╔══██╗██╔════╝██╔════╝██║ ██╔╝██╔════╝████╗ ████║██║╚══██╔══╝██║  ██║
██████╔╝█████╗  ██║     █████╔╝ ███████╗██╔████╔██║██║   ██║   ███████║
██╔══██╗██╔══╝  ██║     ██╔═██╗ ╚════██║██║╚██╔╝██║██║   ██║   ██╔══██║
██████╔╝███████╗╚██████╗██║  ██╗███████║██║ ╚═╝ ██║██║   ██║   ██║  ██║
╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝`))

log(chalk.yellow(`
 ____ ____ ____ ____ ____ 
||T |||a |||s |||k |||s ||
||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|
`));

log(chalk.white.bgCyan.bold('* Gulp dev'));
log(chalk.white.bgCyan.bold('* Gulp build'));
log(chalk.white.bgCyan.bold('* Gulp ftp'));
});

gulp.task('dev', () =>{
   gulp.start(project); 
});

gulp.task('build', () =>{
   gulp.start(project+':build'); 
});


/*
=============================
Vue - Template
-----------------------------
*/

gulp.task('portfolio', () => {
    sequence('clean:dev',
        [
            'libs:dev',
            'sass:dev',
            'css:dev',
            'data:dev',
            'img:dev',
            'webpack:dev',
            'html:dev',
            'mani:dev'
        ],
        'watch',
        'serve'
    );
});

gulp.task('portfolio:build', () => {
    sequence('clean:prod',
        [
            'libs:prod',
            'sass:prod',
            'css:prod',
            'img:prod',
            'webpack:prod',
        ],
        'html:prod',
        'rev:prod',
        'tsjson:prod',
        'zip',
        // 'ftp'
    );
});


/*
=============================
Clean - Tools
-----------------------------
*/

gulp.task('clean', () => {
    sequence('clean:prod',
        'clean:dev'
    );
});


export default project;