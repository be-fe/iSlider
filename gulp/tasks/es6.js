'use strict';

module.exports = function (gulp, PLUGIN, CONF) {

    var babel = PLUGIN.babel;

    gulp.task('es6', function () {
        return gulp.src([CONF.src + '/js/plugins/*.es6'])
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest(CONF.dev))
    });
};