// --------------------
// --- REQUIRE MODULES
// --------------------

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var browserSync = require("browser-sync").create();
var rename = require("gulp-rename");

var requireHTML = true;

// ------------------
// --- FOLDER SHIT
// ------------------

gulp.task('move-folders-1',function(){
  return gulp.src(['./src/data/**/*.*',])
  .pipe(gulp.dest('./dist/data'));
});

gulp.task('move-folders-2',function(){
  return gulp.src(['./src/fonts/**/*.*',])
  .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('move-folders-3',function(){
  return gulp.src(['./src/img/**/*.*',])
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('move-folders-4',function(){
  return gulp.src(['./src/libs/**/*.*',])
  .pipe(gulp.dest('./dist/libs'));
});

gulp.task('move-folders-all',function(){
  gulp.start('move-folders-1', 'move-folders-2', 'move-folders-3', 'move-folders-4');
})


// ------------------
// --- DEFAULT TASKS
// ------------------

gulp.task('default',['webpack','sass', 'html', 'move-folders-all'], function(){});

gulp.task('production',['minjs','mincss', 'move-folders-all'], function(){});

gulp.task('dev',['webpack','sass'], function(){

  if(requireHTML){
    gulp.run('html');
    gulp.watch("src/index.html", ['html']).on('change', browserSync.reload);
  }

  browserSync.init({
      open: requireHTML,
      server: "./dist"
  });
  gulp.watch("src/js/**/*", ['webpack']).on('change', browserSync.reload);
  gulp.watch("src/scss/**/*", ['sass']).on('change', browserSync.reload);
});

// ----------------
// --- DEV TASKS
// ----------------

// --- SASS
gulp.task('sass', function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      dirname: './dist/css',
      basename: 'style',
    }))
    .pipe(gulp.dest(''));
});

gulp.task('html', function () {
  return gulp.src(sass_entry)
    .pipe(gulp.dest(''));
});

// --- JS (WEBPACK)
gulp.task('webpack', function() {
  return gulp.src('./src/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename({
      dirname: './dist/js',
      basename: 'main',
    }))
    .pipe(gulp.dest(''));
});

// --------------------
// --- PRODUCTION TASKS
// --------------------

gulp.task('webpack:prod', function() {
  return gulp.src('./src/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(rename({
      dirname: './dist/js',
      basename: 'main',
      suffix: ".min"
    }))
    .pipe(gulp.dest(''));
});

gulp.task('sass:prod', function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      dirname: './dist/css',
      basename: 'style',
      suffix: ".min",
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(''));
});

gulp.task('prod',['webpack:prod', 'sass:prod'], function(){});

// --------------------
// --- OPTIONAL HTML
// --------------------

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});