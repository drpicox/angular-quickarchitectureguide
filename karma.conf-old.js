module.exports = function(config)
{
	config.set({

		basePath: '',

		frameworks: ['browserify', 'jasmine'],

		files: [
			'src/**.spec.js'
		],

		exclude: [
		],

		preprocessors: {
			'src/**.spec.js': ['browserify']
		},

		reporters: ['progress'],

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: true,

		browsers: ['PhantomJS'],

		browserify: {
			debug: true,
			//transform: [],
		},

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-browserify',
		],

		singleRun: true
	});
};