'use strict';

module.exports = function (gulp, PLUGIN, CONF) {
    var webpack = require('webpack');
    var path = require('path');
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    var options = {
        entry: {index: path.resolve(__dirname, '../../src/index.js')},
      
        output: {
            path:  path.resolve(__dirname, '../../build/'),
            filename:  'index.bundle.js',
            library: 'iSlider',
            libraryTarget: 'umd'
        },

        module: {
            loaders: [
                {test: /\.css$/, loader: 'style-loader!css-loader'}            
            ]
        }
    };

    gulp.task('webpack', ['build'], function () {
        return webpack(options).run(function(err, state) {
            console.log(err);
        });
    });
};