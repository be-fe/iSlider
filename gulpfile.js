var gulp = require('gulp');  
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var beautify = require('gulp-beautify');
var browserify = require('browserify');
var beautify = require('gulp-beautify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

//lint task  
gulp.task('less', function () {
  gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('jshint',function(){
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jsformat', function(){
    // gulp.src('./js/*.js')
    // .pipe(beautify())
    // .pipe(gulp.dest('js'));
});

gulp.task('browserify',function(){
    browserify('./js/app.js',{debug:true,insertGlobals: false})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
});
//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    port:3000
  });
});
//默认任务   
gulp.task('default',['less','jshint','browserify','connect'],function(){
     gulp.watch(['gulpfile.js','./js/*.js','./less/*.less'],['less','jshint','browserify']);
});