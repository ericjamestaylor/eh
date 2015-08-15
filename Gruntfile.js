module.exports = function(grunt) {

  // Project configuration.
  	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: ['*.scss'],
                    dest: 'tmp',
                    ext: '.css'
                }]
            }
        },
		cssmin: {
		  combine: {
		    files: {
		      'tmp/min.css': ['tmp/style.css']
		    	}
		  	}
		},
		autoprefixer: {
            dist: {
                files: {
                    'css/style.min.css':['tmp/min.css']
                }
            }
        },
    coffee: {
          compile: {
	            files: {
	              	'tmp/script.js': 'dev/script.coffee'
	            }
          	}
     	},
     	uglify: {
      		my_target: {
      		    files: {
      		    	'js/script.min.js': ['tmp/script.js'],
      		    }
      		}
	    },
	    watch: {
	     	css: {
	        	files: ['dev/*.scss'],
	        	tasks: ['sass','cssmin','autoprefixer'],
	        	options: {
	          		livereload: true,
	        	},
	      	},
	      	scripts: {
	      	    files: 'dev/*.coffee',
	      	    tasks: ['coffee','uglify']
	      	},
	    }

  	});

  // Load the plugin that provides the "uglify" task.

  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-sass');
  	grunt.loadNpmTasks('grunt-autoprefixer');
  	grunt.loadNpmTasks('grunt-contrib-coffee');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');

  	// Default task(s).
  	grunt.registerTask('default', ['uglify','sass','autoprefixer','coffee','watch','cssmin']);


};
