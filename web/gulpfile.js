var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var ngAnnotate = require('gulp-ng-annotate');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var header = require('gulp-header');


gulp.task('lint', function(){
    return gulp.src('scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
 });

gulp.task('minifyJs', function () {
    gulp.src('scripts/**/*.js')
        .pipe(concat('application.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(header('/*\n * Code analyzed by Gulp.\n*/\n'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyCss', function () {
    gulp.src('style/app.css')
        .pipe(minifyCss())
        .pipe(header('/*\n * Code analyzed by Gulp.\n*/\n'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist'));
})

gulp.task('watch', function () {
    gulp.watch('scripts/**/*.js', ['lint', 'minifyJs', 'minifyCss'])
});

gulp.task('default', ['lint', 'minifyJs', 'minifyCss', 'watch']);