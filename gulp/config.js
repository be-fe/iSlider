'use strict';

var conf = require('json-config-reader').read('package.json');

module.exports = {
    src: './src',
    demo: './demo/public',
    build: './build',
    dev: './dev',
    version: conf.version,
    name: conf.name
};