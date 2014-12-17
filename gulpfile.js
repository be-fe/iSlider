var gulp=require('gulp');

gulp.task('build', function() {
  var requirejs = require('requirejs');
  requirejs.optimize({
    'findNestedDependencies': true,
    'baseUrl': './src/',
    'optimize': 'none',
    'include': ['islider_core', 'islider_animate'],
    'out': './src/islider.js',
    'onModuleBundleComplete': function(data) {
      var fs = require('fs'),
        amdclean = require('amdclean'),
        outputFile = './src/islider.js';

      fs.writeFileSync(outputFile, amdclean.clean({
        'filePath': outputFile
      }));
    }
  });
});

gulp.task('default', function() {
   gulp.watch(['src/*.js', 'src/plugins/*.js'], function(){
        return gulp.src(['src/*.js', 'src/plugins/*.js'])
                .pipe(gulp.dest('demo/public/js'))
                .pipe(gulp.dest('test/public/js'))
                .pipe();
   });

   gulp.watch(['src/*.css'], function(){
        return gulp.src(['src/*.css'])
                .pipe(gulp.dest('demo/public/css'))
                .pipe(gulp.dest('test/public/css'));
   });
});

