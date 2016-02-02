'use strict';

var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var jc = require('json-config-reader');

var CONFIG = {
    src: './src',
    demo: './demo/public',
    build: './build'
};

gulp.task('clean', function () {
    gulp.src([
        CONFIG.build + '/*'
    ], {
        read: false
    })
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

gulp.task('updateVersion', function (cb) {
    var version = jc.read('package.json').version;
    fs.writeFileSync('bower.json', new Buffer(fs.readFileSync('bower.json').toString().replace(/\"version\": \"[^\"]+\"/, function () {
        return '"version": "' + version + '"';
    })));

    fs.writeFileSync(CONFIG.src + '/js/iSlider.js', new Buffer(fs.readFileSync(CONFIG.src + '/js/iSlider.js').toString().replace(/iSlider\.VERSION = \'[^\']+\'/, function () {
        return 'iSlider.VERSION = \'' + version + '\'';
    })));

    cb();
});

gulp.task('js', ['iSlider', 'externals', 'plugins']);

gulp.task('build', ['updateVersion', 'css', 'js']);

gulp.task('watch', function () {
    //startServer(8888);
    gulp.watch(['src/*.js', 'src/plugins/*.js', 'src/*.css'], ['js', 'css']);
});

gulp.task('default', ['build']);