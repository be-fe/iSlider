'use strict';

var through = require('through-gulp');

module.exports = function (gulp, PLUGIN, CONF) {

    var uglify = PLUGIN.uglify;
    var rename = PLUGIN.rename;

    gulp.task('iSlider', function () {
        return gulp.src(['src/js/iSlider.js'])
            .pipe(gulp.dest(CONF.demo + '/js'))
            .pipe(gulp.dest(CONF.build))
            .pipe(through(function (file, env, cb) {
                file.contents = new Buffer(file.contents.toString().replace(/this\.log\([^\n]+\);?\n/g, function (rep) {
                    return '';
                }));
                this.push(file);
                cb();
            }))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(CONF.demo + '/js'))
            .pipe(gulp.dest(CONF.build));
    });
};