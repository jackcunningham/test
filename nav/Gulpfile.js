var gulp = require('gulp');
var sass = require('gulp-sass');
var debug = require('gulp-debug');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass({
	        errLogToConsole: false,
	        onError: function(err) {
	        	gutil.beep()
	            return notify().write(err);
	        }
	    }))
        .pipe(debug({title: 'unicorn:'}))
        .pipe(gulp.dest('./css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});