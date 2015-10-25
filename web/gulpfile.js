var jshint = require('gulp-jshint');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var header = require('gulp-header');


gulp.task('lint', function(){
    return gulp.src('scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
 });

gulp.task('minify', function () {
    gulp.src('scripts/**/*.js')
        .pipe(concat('application.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(header('/*\n * Code analyzed by Gulp.\n*/\n'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('scripts/**/*.js', ['lint', 'minify'])
});

gulp.task('default', ['lint', 'minify', 'watch']);