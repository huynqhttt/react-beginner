var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var notify  = require('gulp-notify');
var phpunit = require('gulp-phpunit');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var webpack = require('gulp-webpack');
var through = require('through2');

var path = {
    resources: './resources',
    sources: './sources',
    node_modules: './node_modules'
};
var vendorCss = [];
var vendorJs = [];
var sassFile = [
    path.sources + '/sass/style.sass'
];
var jsFiles = [];

/**
 * Clean images folder
 */
gulp.task('clean-images', function () {
    return gulp.src('web/images/*.*', {read: false})
        .pipe(clean());
});

/**
 * Copy images to images folder
 */
gulp.task('copy-images', function() {
    gulp.src([
        path.app + '/images/*.*',
        path.app + '/images/**/*.*'
    ])
    .pipe(gulp.dest('web/images/'));
});

/**
 * Clean fonts folder
 */
gulp.task('clean-fonts', function () {
    return gulp.src('web/fonts/*.*', {read: false})
        .pipe(clean());
});

/**
 * Copy fonts to fonts folder
 */
gulp.task('copy-fonts', function() {
    gulp.src([
        path.app + '/fonts/*.{ttf,woff,woff2,eof,svg,eot}',
        path.bower_components + '/components-font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('web/fonts/'));
});

/**
 * Clean css folder
 */
gulp.task('clean-css', function () {
    return gulp.src('web/css/*.*', {read: false})
        .pipe(clean());
});

/**
 * Compile Sass to CSS using Compass
 */
gulp.task('sass', function() {
    var sassStream = sass(sassFile, {
        style: 'compressed',
        sourcemap: false,
        compass: true
    }).on('error', sass.logError);

    var cssStream = gulp.src(vendorCss);

    return merge(sassStream, cssStream)
        .pipe(minifyCss({keepSpecialComments:0}))
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('web/css/'));
});

/**
 * Compile Sass to CSS using Compass for dev
 */
gulp.task('sass-dev', function() {
    var sassStream = sass(sassFile, {
        style: 'compressed',
        sourcemap: true,
        compass: true
    }).on('error', sass.logError);

    var cssStream = gulp.src(vendorCss);

    return merge(sassStream, cssStream)
        .pipe(minifyCss({keepSpecialComments:0}))
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('web/css/'));
});

/**
 * Clean js folder
 */
gulp.task('clean-js', function () {
    return gulp.src('web/js/*.*', {read: false})
        .pipe(clean());
});

/**
 * Compile and minify js vendor (bower_components)
 */
gulp.task('build-vendor-js', function() {
    return gulp.src(vendorJs)
    .pipe(concat('vendor.js'))
    .pipe(uglify({mangle: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('web/js/'));
});

/**
 * Compile and minify js App (app/Resources/js)
 */
gulp.task('build-app-js', function() {
    return gulp.src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(uglify({mangle: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('web/js/'));
});

/**
 * Compile and minify js App (app/Resources/js) for dev
 */
gulp.task('build-app-js-dev', function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('web/js/'));
});

/**
 * Compile and minify react
 */
gulp.task('build-react-dev', function() {
    var reactRoot = path.app + '/js/react';
    var reactFile = reactRoot + '/index.js';

    return gulp.src(reactFile)
        .pipe(webpack(require(reactRoot + '/webpack.config.js')))
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('build-react-prod', function() {
    return gulp.src([
        path.sources + '/react/dist/bundle.js'
    ])
    .pipe(concat('react-bundle.min.js'))
    .pipe(gulp.dest('web/js/'));
});

/**
 * Check js code quality
 */
var jsHintOptions = {
    "node": true,
    "esnext": true,
    "bitwise": true,
    "camelcase": true,
    "curly": true,
    "eqeqeq": true,
    "immed": true,
    "indent": 2,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "quotmark": "single",
    "undef": true,
    "unused": true,
    "strict": true
};
gulp.task('check-js-code', function () {
    return gulp.src(path.app + '/js/jquery/**/*.js').pipe(jshint(jsHintOptions));
});

/**
 * Watch files
 */
gulp.task('watch', function(){
    gulp.watch( path.app + '/scss/**/*.scss', ['sass-dev']);
    gulp.watch( path.app + '/js/jquery/**/*.js', ['build-app-js-dev']);
    gulp.watch( path.app + '/js/jquery/vendor/*.js', ['build-vendor-js']);
});

/**
 * Clean task
 */
gulp.task('clean', ['clean-images', 'clean-fonts', 'clean-css', 'clean-js']);
gulp.task('css', ['sass']);
gulp.task('css-dev', ['sass-dev']);
gulp.task('js', ['build-app-js', 'build-vendor-js']);
gulp.task('js-dev', ['build-app-js-dev', 'build-vendor-js']);


/**
 * Default task
 */
gulp.task('default', gulpSequence(
    'clean',
    'copy-images',
    'copy-fonts',
    'check-js-code',
    'js',
    'build-react-prod',
    'css'
));

/**
 * Dev task
 */
gulp.task('dev', gulpSequence(
    'copy-images',
    'copy-fonts',
    'check-js-code',
    'js-dev',
    'css-dev',
    'watch'
));
