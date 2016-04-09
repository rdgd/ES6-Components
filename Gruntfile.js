module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'dev/js/**/*.js'],
      options: {
        esnext: true,
        proto: true
      }
    },
    jscs: {
      src: "dev/**/*.js",
      options: {
        esnext: true,
        verbose: true,
        config: 'jscs.json' // See http://jscs.info/rules for options
      }
    },
    uglify: {
      options: {
        screwIE8: true,
        preserveComments: false
      },
      all: {
        files: grunt.file.expandMapping(['dist/*.js'], 'dist/', {
		    	flatten: true,
          rename: function(destBase, destPath) {
            var filePath = destBase + destPath;
            if (destPath.indexOf('.min.js') !== -1) { return filePath; }
	          return filePath.replace('.js', '.min.js');
	        }
		    })
      }
    },
    webpack: {
      all: {
        entry: "./dev/js/main.js",
        output: {
          path: "dist/",
          filename: "component.js",
        },
        stats: {
          colors: true,
          modules: true,
          reasons: true
        },
        storeStatsTo: "webpackStats",
        failOnError: true,
        keepalive: false,
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: "babel-loader",
              query: {
                presets: ['es2015']
              }
            }
          ]
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        files: [
          { src: './node_modules/babel-polyfill/dist/polyfill.js' },
          { src: './dev/js/*.js' },
          { src: './dev/tests/unit/*.js' }
        ]
      }
    },
    watch: {
      all: {
        files: ['dev/**/*.js'],
        tasks: ['jshint', 'jscs', 'webpack:all', 'uglify:all', 'karma:unit'],
        options: {
          spawn: false,
        }
      },

      webpack: {
        files: ['dev/**/*.js'],
        tasks: ['webpack:all'],
        options: {
          spawn: false
        }
      },

      unit: {
        files: ['dev/tests/unit/*.js'],
        tasks: ['unit'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['jshint', 'jscs', 'webpack:all', 'uglify:all', 'karma:unit']);
  grunt.registerTask('static', ['jshint', 'jscs']);
  grunt.registerTask('qa', ['static', 'karma:unit']);
  grunt.registerTask('unit', ['karma:unit']);
  grunt.registerTask('build', ['qa', 'webpack:all', 'uglify:all']);
};
