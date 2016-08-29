'use strict';

module.exports = function (gulp, PLUGIN, CONF) {
    var webpack = require('webpack');
    var path = require('path');
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    var options = {
        entry: {index: path.resolve(__dirname, '../../build/index.js')},
      
        output: {
            path:  path.resolve(__dirname, '../../build/'),
            filename:  'index.bundle.js'
        },

        module: {
            loaders: [
                {test: /\.css$/, loader: 'style-loader!css-loader'}
            ]
        }
    };

    gulp.task('webpack', function () {
        return webpack(options).run(function(err, state) {
            console.log(err);
        });
    });
};