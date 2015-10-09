'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var CONFIG = {
    src: './src',
    demo: './demo/public',
    build: './build'
};

gulp.task('clean', function () {
    gulp.src([CONFIG.demo + '/*', CONFIG.build + '/*'], {read: false})
        .pipe(clean());
});

gulp.task('css', function () {
    gulp.src([CONFIG.src + '/style/iSlider.css'])
        .pipe(gulp.dest(CONFIG.demo + '/css'))
        .pipe(gulp.dest(CONFIG.build))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(CONFIG.build));
});

gulp.task('iSlider', function () {
    return gulp.src(['src/js/iSlider.js'])
        .pipe(gulp.dest(CONFIG.demo + '/js'))
        .pipe(gulp.dest(CONFIG.build))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(CONFIG.build));
});

gulp.task('externals', function () {
    return gulp.src(['src/js/ext/*.js'])
        .pipe(rename(function (path) {
            path.basename = "iSlider." + path.basename;
        }))
        .pipe(gulp.dest(CONFIG.demo + '/js'))
        .pipe(gulp.dest(CONFIG.build))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(CONFIG.build));
});

gulp.task('plugins', function () {
    return gulp.src(['src/js/plugins/*.js'])
        .pipe(rename(function (path) {
            path.basename = "iSlider.plugin." + path.basename;
        }))
        .pipe(gulp.dest(CONFIG.demo + '/js'))
        .pipe(gulp.dest(CONFIG.build))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(CONFIG.build));
});

gulp.task('js', ['iSlider', 'externals', 'plugins']);

gulp.task('build', ['css', 'js']);

gulp.task('watch', function () {
    //startServer(8888);
    gulp.watch(['src/*.js', 'src/plugins/*.js'], ['js']);
    gulp.watch(['src/*.css'], ['css']);
});

gulp.task('default', ['build']);

/**
 *  start server
 */
function startServer(port) {
    var connect = require('gulp-connect');
    connect.server({
        root: '.',
        port: port,
        livereload: true
    });
}

/**
 * remove AMD code form source code
 */
function amdClean(opts) {
    var requirejs = require('requirejs');
    requirejs.optimize({
        'findNestedDependencies': true,
        'baseUrl': './src/',
        'optimize': 'none',
        'include': opts.include,
        'out': opts.outputFile,
        'onModuleBundleComplete': function (data) {
            var fs = require('fs'),
                amdclean = require('amdclean'),
                outputFile = opts.outputFile;

            fs.writeFileSync(outputFile, amdclean.clean({
                'filePath': outputFile,
                'globalModules': opts.globalModules
            }));

        }
    });
}
