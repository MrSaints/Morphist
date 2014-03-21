module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        uglify:
            options:
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */'
            dist:
                files:
                    'dist/morphist.min.js': ['dist/morphist.js']

        jshint:
            all: ['dist/morphist.js']

    grunt.loadNpmTasks 'grunt-contrib-jshint';
    grunt.loadNpmTasks 'grunt-contrib-uglify';

    grunt.registerTask('default', ['uglify', 'test']);
    grunt.registerTask('test', ['jshint']);