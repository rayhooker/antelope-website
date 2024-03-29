'use strict';

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var config = {
        'app': 'app',
        bower: 'bower_components'
    };

    grunt.initConfig({
        c: config,

        // ## //

        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: ['less', 'autoprefixer', 'cssmin']
            }
        },

        // ## //

        jshint: {
            options: {
                'curly': true,
                'eqeqeq': true,
                'immed': true,
                'latedef': true,
                'newcap': true,
                'noarg': true,
                'noempty': true,
                'unused': true,
                'undef': true,
                'trailing': true,
                'quotmark': 'single',

                'boss': true,
                'eqnull': true
            },
            browser: {
                options: {
                    'browser': true,
                    'jquery': true,
                    'globals': {
                        'IocCourses': true
                    }
                },
                files: {
                    src: [
                        '/js/**/*.js'
                    ]
                }
            },
            node: {
                options: {
                    'node': true
                },
                files: {
                    src: [
                        'Gruntfile.js'
                    ]
                }
            }
        },

        // ## //

        less: {
            theme: {
                options: {
                    paths: ['<%= c.bower %>']
                },
                files: [{
                    expand: true,
                    cwd: 'less',
                    src: 'main.less',
                    // dest: '<%= c.app %>/css', //
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        // ## //

        autoprefixer: {
            theme: {
                files: {
                    'css/main.css': [
                        'css/main.css'
                    ]
                }
            }
        },

        // ## //

        cssmin: {
            theme: {
                options: {
                    report: 'min'
                },
                files: {
                    'css/main.css': [
                        'css/main.css'
                    ]
                }
            }
        },

        // ## //

        imagemin: {
            theme: {
                options: {
                    report: 'min'
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    dest: 'images/',
                    src: [
                        '**/*.{png,jpg,gif}'
                    ]
                }]
            }
        },

        // ## //

        copy: {
            fontawesome: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= c.bower %>/',
                    dest: 'fonts/font-awesome/',
                    src: [
                        'font-awesome/fonts/*.{otf,eot,svg,ttf,woff}'
                    ]
                }]
            },
            opensans: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= c.bower %>/',
                    dest: 'fonts/open-sans/',
                    src: [
                        'open-sans-fontface/fonts/*/*.{otf,eot,svg,ttf,woff}'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('build', [
        'less',
        'autoprefixer',
        'cssmin',
        'imagemin',
        'copy'
    ]);

    grunt.registerTask('default', function () {
        grunt.option('force', true);

        grunt.task.run([
            'build',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'jshint',
        'build'
    ]);
};
