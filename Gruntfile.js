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
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/util.min.js': ['src/js/util.js'],
          'public/js/app.js': ['src/js/*.js', '!src/js/util.js']
        }
      }
    }
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
  grunt.registerTask('default', ['nodemon','watch']);

};
