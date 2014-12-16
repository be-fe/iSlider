var gulp=require('gulp');

gulp.task('default', function() {
   gulp.watch(['src/*.js', 'src/plugins/*.js'], function(){
        return gulp.src(['src/*.js', 'src/plugins/*.js'])
                .pipe(gulp.dest('demo/public/js'))
                .pipe(gulp.dest('test/public/js'));
   });

   gulp.watch(['src/*.css'], function(){
        return gulp.src(['src/*.css'])
                .pipe(gulp.dest('demo/public/css'))
                .pipe(gulp.dest('test/public/css'));
   });
});

