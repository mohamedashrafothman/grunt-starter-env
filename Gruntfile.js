module.exports = function (grunt) {

	// Tasks configuration.
	grunt.initConfig({
		concat: {
			js: {
				src: ['public/js/libs/*.js', 'public/js/*.js'],
				dest: 'public/dist/script.js',
			},
			css: {
				src: ['public/css/libs/*.css', 'public/css/*.css'],
				dest: 'public/dist/style.css',
			},
		},
		pug: {
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
					'index.html': ['public/views/index.pug'],
					'about.html': ['public/views/about.pug'],
					'404.html': ['public/views/404.pug'],
				}
			},
		},
		sass: {
			build: {
				files: [{
					src: ['public/sass/style.scss'],
					dest: 'public/css/style.css',
				}, ],
			},
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
			my_target: {
				files: [{
					src: 'public/css/style.css',
					dest: 'public/css/style.css'
				}]
			}
		},
		cssmin: {
			build: {
				files: {
					'public/dist/min/style.min.css': [
						'public/dist/style.css',
						'public/dist/!*.min.css',
					],
				},
			},
		},
		uglify: {
			my_target: {
				files: [{
					src: ['public/dist/script.js'],
					dest: 'public/dist/min/script.min.js',
				}]
			},
		},
		eslint: {
			all: ['public/js/*.js', '!node_modules/**/*.js']
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'public/img/',
					src: ['**/*.{png,jpg,jpeg,gif}'],
					dest: 'public/img/'
				}]
			}
		},
		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 9000,
					base: './',
					livereload: true
				}
			}
		},
		watch: {
			sass: {
				files: ['public/sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'concat', 'cssmin'],
				options: {
					livereload: true
				}
			},
			uglify: {
				files: 'public/js/**/*.js',
				tasks: ['newer:eslint:all', 'concat', 'uglify'],
				options: {
					livereload: true
				}
			},
			pug: {
				files: ['public/views/**/*.pug'],
				tasks: ['newer:pug:compile:files'],
				options: {
					livereload: true
				}
			},
			imagemin: {
				files: ['public/img/*.{png,jpeg,jpg,gif}'],
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
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-sass');


	// Default task(s).
	grunt.registerTask('default', ['connect', 'watch']);
};