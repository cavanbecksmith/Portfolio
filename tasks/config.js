import path from 'path';
import project from '../project.js';

export default (() => {

    let cfg = {
        paths: {
            src: {
                root: path.join('src/'+project, path.sep)
            },
            builds: {
                root: path.join('dist', path.sep)
            }
        }
    };


    // COMMENT UNUSED FOLDERS OUT
    let globs = {
        webpack: path.join(cfg.paths.src.root, 'js', path.sep),
        css: path.join(cfg.paths.src.root, 'css', '**', '*.css'),
        sass: path.join(cfg.paths.src.root, 'css', '**', 'main.scss'),
        libs: path.join(cfg.paths.src.root, 'libs', '**', '*'),
        js: path.join(cfg.paths.src.root, 'js', path.sep),
        img: path.join(cfg.paths.src.root, 'img', '**', '*'),
        data: path.join(cfg.paths.src.root, 'data', '**', '*.json'),
        audio: path.join(cfg.paths.src.root, 'audio', '**', '*')
    };


    Object.keys(globs).forEach(type => cfg.paths.src[type] = globs[type]);

    ['dev', 'prod', 'tmp'].forEach(build => {
        let builds = cfg.paths.builds;
        builds[build] = {};
        builds[build].root = path.join(builds.root, build, path.sep);
    });

    Object.keys(cfg.paths.builds).forEach(buildType => {
        let buildSubDir = cfg.paths.builds[buildType];
        if (typeof buildSubDir !== 'string') {
            Object.keys(globs).forEach(type => buildSubDir[type] = path.join(buildSubDir.root, type, path.sep));
        }
    });

    return cfg;

})();
