
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    autoprefixer: {
      options: {
        browsers: ['> 1% in US'],
      },

      build: {
        src: 'public/css/**/*.css'
      }
    },
    clean:['public'],
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**', '!**/*.jade', '!**/*.{sass,scss}'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{expand: true, cwd: 'app/', src: ['**/*.jade', '!**/_*.jade'], dest: 'public/', ext: '.html'}]
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/css/main.css': 'app/styles/main.scss'  //key : value//
        }
      }
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      other: {
        files: ['app/**', '!**/*.jade', '!app/**/*.{sass,scss}'],
        tasks: ['copy'],
    },
    jade: {
      files: ['app/**/*.jade'],
      tasks: ['jade']
    },
    sass: {
      files: ['app/**/*.{sass,scss}'],
      tasks: ['sass', 'autoprefixer']
     }
    },

    wiredep: {
      build: {
        src: ['public/**/*.html']
      }
    }

  }); 

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade', 'sass', 'autoprefixer', 'wiredep']);
  grunt.registerTask('serve', ['build', 'watch']);
};