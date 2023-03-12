require('dotenv').config();

module.exports = function(grunt) {

  // Load the Grunt plugins
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-shell');

  // Configure the Grunt plugins
  grunt.initConfig({
    eslint: {
      target: [ 'src/**/*.js', 'src/**/!(*.test).@(ts|tsx)' ],
    },
    run: {
      build: {
        cmd: 'npm',
        args: [
          'run',
          'build',
        ],
      },
      test: {
        cmd: 'npm',
        args: [
          'run',
          'test',
          '--',
          '--watchAll=false',
        ],
      }
    },
    rsync: {
      options: {
        args: [ "--verbose" ],
        recursive: true,
      },
      prod: {
        options: {
          src: "./dist/",
          dest: process.env.SERVER_PATH,
          host: `${process.env.SERVER_USER}@${process.env.SERVER_IP}`,
          delete: true,
        }
      }
    }
  });

  // Register the Grunt tasks
  grunt.registerTask('default', [
    'eslint',
    'run:test',
    'run:build',
  ]);

  grunt.registerTask('deploy', [
    'eslint',
    'run:test',
    'run:build',
    'rsync',
  ]);
};
