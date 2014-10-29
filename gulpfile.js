var gulp=require('gulp');

gulp.task('default', function() {
   gulp.watch('src/mslider.js', function(){
        return gulp.src('src/mslider.js').pipe(gulp.dest('demo/js'));
   });
});

