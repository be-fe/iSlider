'use strict';

module.exports = function (gulp, PLUGIN, CONF) {

    var uglify = PLUGIN.uglify;
    var rename = PLUGIN.rename;

    gulp.task('plugins', function () {
        return gulp.src(['src/js/plugins/*.js'])
            .pipe(rename(function (path) {
                path.basename = "iSlider.plugin." + path.basename;
            }))
            .pipe(gulp.dest(CONF.demo + '/js'))
            .pipe(gulp.dest(CONF.build))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(CONF.demo + '/js'))
            .pipe(gulp.dest(CONF.build));
    });
};