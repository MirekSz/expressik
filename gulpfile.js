var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('less', function () {
    gulp.src('refresh.js')
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('refresh.js', ['less']);
});
