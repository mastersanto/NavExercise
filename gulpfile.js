// packages
var gulp   = require('gulp'),
	jshint = require('gulp-jshint'),
	order = require('gulp-order'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	// check what is this about
	plumber = require('gulp-plumber'),
	less = require('gulp-less'),
	cmq = require('gulp-combine-media-queries');
	minifyCSS = require('gulp-minify-css'),
	watchLess = require('gulp-watch-less'),
	htmlreplace = require('gulp-html-replace'),
	minifyHTML = require('gulp-minify-html'),
	livereload = require('gulp-livereload'),
	path = require('path');

var cmq = require('gulp-combine-media-queries');

// configure javascript tasks
gulp.task('javascript', function() {
	gulp.src('./app/scripts/main.js')
		//.pipe(order([]))
		//.pipe(concat('app.js'))
		//.pipe(gulp.dest('./public/scripts'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(rename('app.min.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./public/scripts'));
});

// configure jshint task
gulp.task('jshint', function() {
	// return gulp.src(['./app/main.js', './api/index.js', './app/scripts/*.js'])
	gulp.src('./app/scripts/main.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
		// .pipe(jshint.reporter('jshint-stylish'));
});

// configure less task
gulp.task('less', function() {
	gulp.src('./app/styles/main.less')
		.pipe(less())
		.pipe(cmq({
			log: true
		}))
		//.pipe(minifyCSS())
		.pipe(gulp.dest('./public/styles'))
		.pipe(livereload());
});

// configure task to replace css/js and minmify html
gulp.task('html', function() {
	var opts = {
		conditionals: true,
		spare:true
	};
	gulp.src('./app/index.html')
		.pipe(htmlreplace({
			'css': './styles/main.css',
			'js': './scripts/app.min.js'
		}))
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./public/'));
});

// configure minify html task
gulp.task('minify-html', function() {

	gulp.src('./app/index.html')
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./public/'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	// gulp.watch(['./app.js', './api/index.js', './app/scripts/*.js'],['jshint', 'javascript']);
	gulp.watch(['./app/scripts/*.js'],['javascript']);
	gulp.watch('./app/styles/*.less', ['less']);
	gulp.watch('./app/index.html', ['html']);
});

// define the build task
gulp.task('build', ['javascript', 'less', 'html']);

// define the dev task and add the watch task to it
gulp.task('dev', ['build', 'watch']);