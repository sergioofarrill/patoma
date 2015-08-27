var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),

    express: {
      all: {
        tasks: ['express-keepalive'],
          options: {
            bases: ['./'],
            port: 9001,
            hostname: "localhost",
            livereload: true
            }
        }
    },
    watch: {
      scripts: {
        files: ['assets/js/*.js'],
        tasks: ['clean', 'copy', 'concat', 'uglify'],
       
      },
      css: {
        files: ['assets/css/*.css'],
        tasks: ['clean', 'copy', 'concat','cssmin'],
              },
      images: {
        files: ['assets/img/**/*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        
      },
      html:{
        files: ['./**/*.html'],
        tasks: [],
        options: {
            livereload: true
            },   
      }
    },
    bower_concat: {
      all: {
        dest: 'dist/js/_bower.js',
        cssDest: 'dist/css/_bower.css',
        exclude: [
          'requirejs'
        ],
        dependencies: {
          'underscore': 'jquery',
          'backbone': 'underscore',
          'jquery-mousewheel': 'jquery'
        },
        bowerOptions: {
          relative: false
        }
      }
    },
    copy: {
      dist: {
       files: [{
         expand: true,
         cwd: 'assets/vendor/font-awesome',
         src: 'css/font-awesome.min.css',
         dest: '<%= config.dist %>'
       },
       {
         expand: true,
         cwd: 'assets/vendor/font-awesome',
         src: 'fonts/*',
         dest: 'dist'
       },
       {
         expand: true,
         cwd: 'assets/vendor/bootstrap',
         src: 'fonts/*',
         dest: 'dist'
       },
       {
         expand: true,
         cwd: 'assets/vendor/flexslider',
         src: 'fonts/*',
         dest: 'dist'
       },
       {
         expand: true,
         cwd: 'assets/vendor/bootstrap/dist',
         src: 'css/bootstrap.min.css',
         dest: 'dist'
       },
       {
         expand: true,
         cwd: 'assets/vendor/flexslider',
         src: 'flexslider.css',
         dest: 'dist/css'
       },
       {
         expand: true,
         cwd: 'assets/vendor/magnific-popup/dist',
         src: 'magnific-popup.css',
         dest: 'dist/css'
       },
       {
         expand: true,
         cwd: 'assets/css',
         src: './*',
         dest: 'dist/css'
       },
       {
         expand: true,
         cwd: 'assets/js',
         src: './*',
         dest: 'dist/js'
       }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v <%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          '<%= config.dist %>/js/all_lib.min.js': [
            '<%= bower.directory %>/jquery/dist/jquery.js',
            '<%= bower.directory %>/bootstrap/dist/js/bootstrap.min.js',
            '<%= bower.directory %>/flexslider/jquery.flexslider-min.js',
            '<%= bower.directory %>/Parallax-ImageScroll/jquery.imageScroll.min.js',
            '<%= bower.directory %>/underscore/underscore.js',
            '<%= bower.directory %>/requirejs/require.js',
            
            '<%= bower.directory %>/magnific-popup/jquery.magnific-popup.min.js'
            
          ]
        }
      }
    },
    jshint: {
      build: [
        '<%= pkg.name %>.js'
      ]
    },
    clean: {
      build:{
      src: ['dist/css/*.css', 'dist/js/custom.js']
      }
    },
    concat: {
    css: {
      src: ['dist/css/*.css','!dist/css/all_styles.css'],
      dest: 'dist/css/all_styles.css'
    }
  },
  cssmin: {
    target: {
    files: {
      'dist/css/all_styles.min.css': 
      ['dist/css/all_styles.css','!all_styles.min.css']
      }
    }
  },
  imagemin: {                          // Task
    dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'assets/img',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'dist/img'                  // Destination path prefix
      }]
    }
  }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', [
    'clean', 'copy', 'uglify','concat','cssmin','imagemin', 'watch'
  ]);
  grunt.registerTask('dist', [
    'cssmin','imagemin'
  ]);
  grunt.registerTask('bluserver', ['express', 'express-keepalive']);
};