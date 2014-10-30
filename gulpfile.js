var gulp=require('gulp');

gulp.task('default', function() {
   gulp.watch('src/islider.js', function(){
        return gulp.src('src/islider.js').pipe(gulp.dest('demo/js'));
   });
});

