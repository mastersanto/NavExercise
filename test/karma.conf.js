// Karma config
module.exports = function(config) {
	config.set({
		autoWatch: true,
		basePath: '../',
		colors: true,
		frameworks: ['jasmine'],
		files: [
			'app/scripts/*.js',
			'test/spec/*.js'
		],
		exclude: [],
		port: 8000,
		browsers: [
		    'PhantomJS'
		],
		logLevel: config.LOG_INFO,
		plugins: [
		    'karma-phantomjs-launcher',
		    'karma-jasmine'
		],
		singleRun: false
	});
};