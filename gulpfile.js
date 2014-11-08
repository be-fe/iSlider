var gulp=require('gulp');

gulp.task('default', function() {
   gulp.watch(['src/islider.js', 'src/plugins/*.js'], function(){
        return gulp.src(['src/islider.js', 'src/plugins/*.js']).pipe(gulp.dest('demo/public/js'));
   });
});

