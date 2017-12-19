module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	// Tasks configuration.
	grunt.initConfig({
		'concat': {
			js: {
				src: ['src/scripts/libs/*.js', 'src/scripts/*.js'],
				dest: 'build/scripts/script.js',
			},
			css: {
				src: ['src/styles/libs/*.css', 'src/styles/*.css'],
				dest: 'build/styles/style.css',
			},
		},
		'pug': {
			compile: {
				options: {
					client: false,
					pretty: true,
					data: {
						debug: false,
					},
				},
				/**
				 * - this files object takes the pug file dist and it's value is new html dist 
				 *   ex: 'index.html':['public/views/index.pug']
				 * - Repeat for each pug file your have.
				 */
				files: {
					'index.html': ['src/views/index.pug'],
					'about.html': ['src/views/about.pug'],
					'404.html': ['src/views/404.pug'],
				}
			},
		},
		'sass': {
			build: {
				files: [{
					src: ['src/sass/style.scss'],
					dest: 'src/styles/style.css',
				}, ],
			},
		},
		'autoprefixer': {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
			my_target: {
				files: [{
					src: 'src/styles/style.css',
					dest: 'src/styles/style.css'
				}]
			}
		},
		'cssmin': {
			build: {
				files: {
					'build/styles/style.min.css': [
						'build/styles/style.css',
						'build/styles/!*.min.css',
					],
				},
			},
		},
		'uglify': {
			my_target: {
				files: [{
					src: ['build/scripts/script.js'],
					dest: 'build/scripts/script.min.js',
				}]
			},
		},
		'eslint': {
			all: ['src/scripts/**/*.es6', '!node_modules/**/*.es6']
		},
		'imagemin': {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['**/*.{png,jpg,jpeg,gif}'],
					dest: 'build/images/'
				}]
			}
		},
		'connect': {
			server: {
				options: {
					hostname: 'localhost',
					port: 9000,
					base: './',
					livereload: true
				}
			}
		},
		'browserify': {
			dist: {
				files: {
					// destination for transpiled js : source js
					'build/scripts/script.js': 'src/scripts/**/*.es6'
				},
				options: {
					transform: [['babelify', { presets: 'es2015' }]],
					browserifyOptions: {
						debug: true
					}
				}
			}
		},
		'watch': {
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'concat:css', 'cssmin'],
				options: {
					livereload: true
				}
			},
			eslint: {
				files: 'src/scripts/*.es6',
				tasks: ['eslint', 'browserify:dist', 'uglify'],
				options: {
					livereload: true
				}
			},
			pug: {
				files: ['src/views/**/*.pug'],
				tasks: ['newer:pug:compile:files'],
				options: {
					livereload: true
				}
			},
			imagemin: {
				files: ['src/images/*.{png,jpeg,jpg,gif}'],
				tasks: ['imagemin']
			}
		},
	});


	// Load the plugins that provides the tasks.
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-sass');


	// Default task(s).
	grunt.registerTask('default', ['connect', 'watch']);
};