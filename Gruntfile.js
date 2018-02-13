module.exports = (grunt) => {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      styles: {
        files: ['src/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify'],
        options: {
          nospawn: true
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/css/main.css': 'src/less/main.less'
        }
      }
    },
    express: {
      options: {
        // overrides
      },
      dev: {
        options: {
          script: 'app.js'
        }
      },
    },
    uglify: {
      my_target: {
        files: {
          'public/js/util.min.js': ['src/js/util.js'],
          'public/js/app.js': ['src/js/*.js', '!src/js/util.js']
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          // watch all less and pug files to reload
          src: ['src/less/**/*.less', 'views/**/*.pug']
        },
        options: {
          notify: false,
          watchTask: true,
          open: false,
          port: '3005',
          proxy: 'localhost:3000'
        }
      }
    }
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  // Default task(s).
  grunt.registerTask('default', ['express', 'browserSync', 'watch']);

};
