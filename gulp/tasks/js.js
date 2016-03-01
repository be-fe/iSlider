'use strict';

module.exports = function (gulp, PLUGIN, CONF) {
    gulp.task('js', ['es6', 'iSlider', 'externals', 'plugins']);
};