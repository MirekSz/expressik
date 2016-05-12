var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');
gulp.task('start', function () {
    nodemon({
        script: 'bin/www'
        , ext: 'js hbs ts',
        ignore: ['refresh.js'],
        debug: true
        , env: {'NODE_ENV': 'development'}
    })
})

gulp.task('less', function () {
    gulp.src('refresh.js')
        .pipe(livereload());
});

gulp.task('watch', ['start'], function () {
    livereload.listen();
    gulp.watch('refresh.js', ['less']);
});
