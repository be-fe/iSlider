'use strict';

var fs = require('fs');

module.exports = function (gulp, PLUGIN, CONF) {
    gulp.task('up-version', function (cb) {
        var version = CONF.version;
        fs.writeFileSync('bower.json', new Buffer(fs.readFileSync('bower.json').toString().replace(/\"version\": \"[^\"]+\"/, function () {
            return '"version": "' + version + '"';
        })));

        fs.writeFileSync(CONF.src + '/js/iSlider.js', new Buffer(fs.readFileSync(CONF.src + '/js/iSlider.js').toString().replace(/iSlider\.VERSION = \'[^\']+\'/, function () {
            return 'iSlider.VERSION = \'' + version + '\'';
        })));

        cb();
    });
};