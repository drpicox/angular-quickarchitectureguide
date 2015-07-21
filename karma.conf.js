module.exports = function(config)
{
	config.set({

		basePath: '',

		files: [
			'.tmp/main.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/drpx-storage-mocks/drpx-storage-mocks.js',
			'src/**/*.spec.js'
		],

		exclude: [
		],


		//reporters: ['progress'],

		//port: 9876,

		//logLevel: config.LOG_INFO,

		autoWatch: true,
		colors: true,

		//preprocessors: {
		//	'.tmp/main.js': ['sourcemap'],
		//	'**/*.js': ['sourcemap'],
		//},

		browsers: ['PhantomJS'],
		//browsers: ['Chrome'],

		frameworks: [
			//'source-map-support',
			'jasmine'
		],

		plugins: [
			//'karma-chrome-launcher',			
			'karma-phantomjs-launcher',
			'karma-jasmine',
			//'karma-sourcemap-loader',
			//'karma-source-map-support',
		],

	});
};