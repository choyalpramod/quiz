var gulp = require('gulp');
var clean = require('gulp-clean')
var gulpsync = require('gulp-sync')(gulp)

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var cleanCSS = require('gulp-clean-css');
var cleanJS = require('gulp-minify');
var uglify = require('gulp-uglify');

var concat = require('gulp-concat');
var rename = require('gulp-rename');

var htmlmin = require('gulp-htmlmin');

gulp.task('minifyhtml', function() {
  gulp.src([
      'app/**/*.html'
    ])
    .pipe(htmlmin({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('www'))
})

gulp.task('cleanwww', function() {
  return gulp.src('www', {
      read: false
    })
    .pipe(clean());
})

gulp.task('minifycss', function(done){
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
        .pipe(gulp.dest('./www/assets/css/'))
        .on('end', done);
})

gulp.task('minifyjs', function(done){
    gulp.src([
      './app/libs/**/*.js',
      '!./app/**/*test.js'
    ])
        // .pipe(concat('./scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.init())
        // .pipe(cleanJS({
        //   keepSpecialComments: 0,
        // }))
        // .pipe(rename({
        //   extname: '.min.js'
        // }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
})


gulp.task('release',
  gulpsync.sync(['cleanwww', ['minifyhtml', 'minifycss', 'minifyjs'] ]))
