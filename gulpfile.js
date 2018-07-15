var gulp = require('gulp');

var browserSync = require('browserSync').create();
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});