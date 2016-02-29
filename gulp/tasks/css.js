'use strict';

module.exports = function (gulp, PLUGIN, CONF) {

    var cssmin = PLUGIN.cssmin;
    var rename = PLUGIN.rename;

    gulp.task('css', function () {
        gulp.src([CONF.src + '/style/iSlider.css'])
            .pipe(gulp.dest(CONF.demo + '/css'))
            .pipe(gulp.dest(CONF.build))
            .pipe(cssmin())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(CONF.build));
    });
};