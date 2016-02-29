'use strict';

module.exports = function (gulp, PLUGIN, CONF) {
    gulp.task('build', ['up-version', 'css', 'js']);
};