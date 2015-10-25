var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');


gulp.task('minify', function () {
    gulp.src('scripts/**/*.js')
        .pipe(concat('application.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('watch',  function () {
    gulp.watch('scripts/**/*.js', ['minify'])
});

