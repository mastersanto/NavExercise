// packages
var gulp = require('gulp'),
	cmq = require('gulp-combine-media-queries');
	htmlReplace = require('gulp-html-replace'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	watchLess = require('gulp-watch-less'),
	karmaServer = require('karma').Server;

// configure javascript tasks
gulp.task('javascript', function() {
	gulp.src('./app/scripts/main.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});

// run tests and exit
gulp.task('test', function(done) {
    karmaServer.start({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

// configure less task
gulp.task('less', function() {
	gulp.src('./app/styles/main.less')
		.pipe(less())
		.pipe(cmq({
			log: true
		}))
		.pipe(minifyCSS())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./public/styles'));
});

// configure task to replace css/js and minimify html
gulp.task('html', function() {
	var opts = {
		conditionals: true,
		spare:true
	};

	gulp.src('./app/index.html')
		.pipe(htmlReplace({
			'css': './styles/main.min.css',
			'js': './scripts/app.min.js'
		}))
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./public/'));
});

// configure which files to watch and tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('./app/scripts/*.js',['javascript', 'test']);
	gulp.watch('./app/styles/*.less', ['less']);
	gulp.watch('./app/index.html', ['html']);
});

// define the build task
gulp.task('build', ['javascript', 'test', 'less', 'html']);

// define the dev task
gulp.task('dev', ['build', 'watch']);