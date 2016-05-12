var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');
gulp.task('start', function () {
    nodemon({
        exec:'node --debug',
        script: 'bin/www'
        , ext: 'js hbs ts',
        ignore: ['refresh.js'],
        debug: 5858
        , env: {'NODE_ENV': 'development'}
    })
})

gulp.task('less', function () {
    gulp.src('refresh.js')
        .pipe(livereload());
});

gulp.task('watch-nodemon', ['start'], function () {
    livereload.listen();
    gulp.watch('refresh.js', ['less']);
});
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('refresh.js', ['less']);
});
