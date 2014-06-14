// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // show elapsed time at the end
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee']
      },
      less: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['less']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/*.html',
          '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%%= yeoman.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'test/spec/{,*/}*.js'
      ]
    },
    coffeelint: {
      all: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee']
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '<%%= yeoman.app %>/scripts',
          ext: '.js'
        }]
      }
    },
    less: {
      dist: {
        files: {
          '<%%= yeoman.app %>/styles/main.css': ['<%%= yeoman.app %>/styles/main.less']
        },
        options: {
          sourceMap: true,
          sourceMapFilename: '<%%= yeoman.app %>/styles/main.css.map',
          sourceMapBasepath: '<%%= yeoman.app %>/',
          sourceMapRootpath: '/'
        }
      }
    },
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%%= yeoman.dist %>']
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: '*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= yeoman.dist %>/fonts/{,*/}*.*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',<% if (fontawesome) { %>
            'fonts/{,*/}*.*',<% } %>
            '.htaccess',
            'images/{,*/}*.*'
          ]
        }]
      },
      server: {
        files: [<% if (fontawesome) { %> {
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/bower_components/font-awesome/fonts/',
          dest: '<%%= yeoman.app %>/fonts/font-awesome',
          src: ['*']
        },
        <% } %>
        {
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/bower_components/bootstrap/fonts/',
          dest: '<%%= yeoman.app %>/fonts/glyphicons',
          src: ['*']
        }]
      }
    },
    concurrent: {
      dist: [
        'coffee',
        'less'
      ]
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'coffee',
      'less',
      'copy:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'coffee',  //compiles coffeescript to js in ./app/scripts
    'less',  //compiles main.less to main.css and creates source map in ./app/styles
    'copy:server', //copies fontawesome(optional) and glyphicons from bower components to ./app/fonts/
    'connect:test',  //creates a server on port 9001 with test and app as base dirs
  ]);

  grunt.registerTask('build', [
    'clean:dist',  //cleans out ./dist, except for .git* files
    'copy:server',  //copies fontawesome(optional) and glyphicons from bower components to ./app/fonts/
    'useminPrepare',
    'concurrent',
    'htmlmin',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'rev',  //hash based file revisioning
    'usemin'
  ]);

  grunt.registerTask('default', [
    'coffeelint',
    'jshint', //lints all non-vendor js files in ./app/scripts, Gruntfile.js, and tests
    'test',
    'build'
  ]);
};
