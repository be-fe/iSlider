'use strict';

module.exports = function (gulp, PLUGIN, CONF) {
    gulp.task('js', ['iSlider', 'externals', 'plugins']);
};