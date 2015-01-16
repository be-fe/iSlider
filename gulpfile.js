var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function() {
    
    amdClean({
        'include': ['islider_core', 'islider_animate','islider_zoom'],
        'globalModules': ['iSlider'],
        'outputFile': './build/islider.js'
    });

    amdClean({
        'include': ['islider_core'],
        'globalModules': ['iSlider'],
        'outputFile': './build/islider_core.js'
    });

    // gulp.src(['build/islider.js'])
    //     .pipe(uglify())
    //     .pipe(rename('islider.min.js'))
    //     .pipe(gulp.dest('build'));
});

gulp.task('move', function(){
    gulp.src(['build/islider.js', 'src/plugins/*.js'])
        .pipe(gulp.dest('demo/public/js'))
        .pipe(gulp.dest('test/public/js'));
})




var connect = require('gulp-connect');
gulp.task('default', ['build'],  function() {

    connect.server({
        root: '.',
        port: 8888,
        livereload: true
    });
   gulp.watch(['src/*.js', 'src/plugins/*.js'], ['build', 'move']);

   gulp.watch(['src/*.css'], function(){
        return gulp.src(['src/*.css'])
                .pipe(gulp.dest('build'))
                .pipe(gulp.dest('demo/public/css'))
                .pipe(gulp.dest('test/public/css'));
   });

});


function amdClean(opts) {
    var requirejs = require('requirejs');
    requirejs.optimize({
        'findNestedDependencies': true,
        'baseUrl': './src/',
        'optimize': 'none',
        'include': opts.include,
        'out': opts.outputFile,
        'onModuleBundleComplete': function(data) {
            var fs = require('fs'),
            amdclean = require('amdclean'),
            outputFile = opts.outputFile;
     
            fs.writeFileSync(outputFile, amdclean.clean({
                'filePath': outputFile,
                'globalModules': opts.globalModules
            }));

        }
    });

}
