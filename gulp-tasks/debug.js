var gulp = require('gulp');
var clean = require('gulp-clean')
var gulpsync = require('gulp-sync')(gulp)
var symlink = require('gulp-sym')
  , p = require('path')
  , File = require('gulp-util').File


var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var cleanCSS = require('gulp-clean-css');
var cleanJS = require('gulp-minify');
var uglify = require('gulp-uglify');

var concat = require('gulp-concat');
var rename = require('gulp-rename');

var htmlmin = require('gulp-htmlmin');


gulp.task('cleanwww_debug', function() {
  return gulp.src('www_debug_local', {
      read: false
    })
    .pipe(clean());
})

gulp.task('sass_debug', function(done){

  gulp.src('./app/scss/*.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(sourcemaps.init())
      .pipe(cleanCSS({
        keepSpecialComments: 0,
        compatibility: 'ie8'
      }))
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./www_debug_local/assets/css/'))
      .on('end', done);
})

gulp.task('create_symlinks_wwwdebug', function(){
  gulp
    .src(['./app/a*', '!./app/assets'])
    .pipe(symlink(function(source) {
        return p.resolve('./', 'www_debug_local/', p.basename(source.path))
    }))


    gulp.src('./app/c*')
    .pipe(symlink(function(source) {
        return p.resolve('./', 'www_debug_local/', p.basename(source.path))
    }))

    gulp.src('./app/h*')
    .pipe(symlink(function(source) {
        return p.resolve('./', 'www_debug_local/', p.basename(source.path))
    }))

    gulp.src('./app/l*')
    .pipe(symlink(function(source) {
        return p.resolve('./', 'www_debug_local/', p.basename(source.path))
    }))

    gulp.src('./app/s*')
    .pipe(symlink(function(source) {
        return p.resolve('./', 'www_debug_local/', p.basename(source.path))
    }))
    gulp.src('./app/t*')
    .pipe(symlink(function(source) {
        return p.resolve('./', 'www_debug_local/', p.basename(source.path))
    }))

    gulp.src('./app/i*')
    .pipe(symlink(function(source) {
        return p.resolve('./', 'www_debug_local/', p.basename(source.path))
    }))

})

gulp.task('create_symlinks_assets', function(){
  gulp.src(['./app/assets/img'])
      .pipe(symlink(function(source) {
          return p.resolve('./', 'www_debug_local/assets/', p.basename(source.path))
      }));
      gulp.src(['./app/assets/fonts'
              ])
          .pipe(symlink(function(source) {
              return p.resolve('./', 'www_debug_local/assets/', p.basename(source.path))
          }));
})

gulp.task('create_symlinks',
  gulpsync.sync(['cleanwww_debug', ['create_symlinks_wwwdebug', 'create_symlinks_assets',['sass_debug']]]))


var paths = {
  customsass: ['./app/scss/**/*']
};

gulp.task('watch_debug', function() {
  gulp.watch(paths.customsass, ['sass_debug']);
});
