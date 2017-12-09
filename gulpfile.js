var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sh = require('shelljs');

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});



/* ZingoHub tasks */
var fs = require('fs')
fs.readdirSync(__dirname + '/gulp-tasks').forEach(function (task) {
  require('./gulp-tasks/' + task)
})

gulp.task('build', ['copylibs','watch']);
