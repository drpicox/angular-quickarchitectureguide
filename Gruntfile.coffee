# Gruntfile.coffee
#
# This file configures and compiles the project.

# Configure here a random number for each project from 9000 to 9999
port = 9475

module.exports = (grunt) ->

	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		# (C) Tasks configurations here
		autoprefixer:
			options: ['> 5%']
			build: files: [
				expand: true
				cwd: '.tmp/',
				src: '**/*.css',
				dest: '.tmp/'
			]

		clean:
			www: files: [ dot: true, src: [ 'www/*','!www/.git' ], ] # common configuration to deploy at github
			tmp: files: [ dot: true, src: [ '.tmp' ], ]

		connect:
			options: hostname: '0.0.0.0', port: port, livereload: 10000+port
			livereload:	options: base: [ '.tmp','src','.' ]

		copy:
			options: onlyIf: 'modified'
			cname: src: 'src/CNAME', dest: 'www/CNAME'
			fonts: src: 'bower_components/*/fonts/*', dest: 'www/'   # common configuration to use bootstrap or similars
			index: src: 'src/index.html', dest: 'www/index.html'
			resources:
				expand: true,
				cwd: 'src',
				dest: 'www',
				src: '**/*.{png,gif,jpg,svg}'  # add here any other resource kind

		cssmin: build:
			src: '.tmp/main.css', dest: 'www/main.css'

		exorcise:
			chats: src: '.tmp/main.js', dest: '.tmp/main.js.map'

		filerev: build:
			src: 'www/main.{js,css}'

		filerev_apply:
			options: prefix: 'www/'
			files: expand: true, cwd: 'www', src: 'index.html', dest: 'www'

		jshint:
			options: jshintrc: '.jshintrc'
			build: [ 'src/**/*.js','!src/**/*.spec.js' ]

		karma:
			unit: configFile: 'karma.conf.js', singleRun: true
			serve: configFile: 'karma.conf.js', background: true

		less: build:
			files: '.tmp/main.css': 'src/main.less'
			options:
				paths: [ 'src/', '.' ]
				compress: false
				yuicompress: false
				dumpLineNumbers: 'comments'
				optimization: 0

		uglify:
			options: sourceMap: true, compress: drop_debugger: true
			build: src: '.tmp/main.js', dest: 'www/main.js'

		watch:
			grunt: files: ['Gruntfile.coffee']
			js: files: ['src/**/*.js','!src/**/*.spec.js' ], tasks: ['newer:jshint']#,'exorcise']
			karma: files: ['.tmp/main.js','src/**/*.spec.js' ], tasks: ['karma:serve:run']
			less: files: ['src/**/*.less' ], tasks: ['less','autoprefixer']
			livereload: 
				options: livereload: '<%= connect.options.livereload %>'
				files: [
					'src/index.html'
					'.tmp/**'
					'{src,.tmp}/**/*.{png,gif,jpg,svg}'
				]

		watchify:
			options: debug: true
			app: src: './src/main.js', dest: '.tmp/main.js'
			#spec: src: './src/main.spec.js', dest: '.tmp/main.spec.js'


	# (L) Load here grunt plugins with tasks
	require('jit-grunt')(grunt)

	grunt.registerTask 'spy', () ->
		console.log JSON.stringify grunt.filerev
		console.log JSON.stringify grunt.filerev.summary

	# (T) Add here your task(s)
	grunt.registerTask 'build-dev', [ 
		'clean'
		'jshint'
		'less'
		'autoprefixer'
		'watchify'
		#'exorcise'
		'karma:unit'
	]

	grunt.registerTask 'build', [ 
		'build-dev'
		'copy'
		'cssmin'
		'uglify'
		'filerev'
		'filerev_apply'
	]

	grunt.registerTask 'serve', [ 
		'build-dev'
		'karma:serve'
		'connect:livereload'
		'watch'
	]

	grunt.registerTask 'test', [
		'build-dev'
	]

	grunt.registerTask 'default', [ 
		'serve' 
	]