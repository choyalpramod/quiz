var gulp = require('gulp')
var clean = require('gulp-clean')
var gulpsync = require('gulp-sync')(gulp)

gulp.task('cleanlibs', function() {
  return gulp.src('app/libs', {
      read: false
    })
    .pipe(clean());
})

gulp.task('copy-angular', function() {
  gulp.src([
      'bower_components/angular*/*.min.js'
    ])
    .pipe(gulp.dest('app/libs/'))
})

gulp.task('copy-angular-ui-router', function() {
  gulp.src([
      'bower_components/angular-ui-router/release/*.min.js'
    ])
    .pipe(gulp.dest('app/libs/angular-ui-router/'))
})

gulp.task('copy-angular-xml2json', function() {
  gulp.src([
      'bower_components/angular-xml2json/angular-xml2json.js'
    ])
    .pipe(gulp.dest('app/libs/angular-xml2json/'))
})

gulp.task('copy-moment', function() {
  gulp.src([
      'bower_components/moment/min/moment.min.js'
    ])
    .pipe(gulp.dest('app/libs/moment/'))
})


gulp.task('copy-angular-material', function() {
  gulp.src([
      'bower_components/angular-material/*.min**.js',
      'bower_components/angular-material/*.min**.css'
    ])
    .pipe(gulp.dest('app/libs/angular-material/'))
})


gulp.task('copy-bootstrap', function() {
  // gulp.src([
  //   'bower_components/bootstrap/dist/css/bootstrap.min.css',
  //   'bower_components/bootstrap/dist/css/bootstrap.css.map',
  //   'bower_components/bootstrap/dist/js/bootstrap.min.js'
  // ])
  // .pipe(gulp.dest('app/libs/bootstrap/'))
})

gulp.task('copy-bootstrap-material', function() {
  // gulp.src([
  //   'bower_components/bootstrap-material-design/dist/bootstrap-material-design.min.css',
  //   'bower_components/bootstrap-material-design/dist/bootstrap-material-design.css.map',
  //   'bower_components/bootstrap-material-design/dist/bootstrap-material-design.umd.js'
  // ])
  // .pipe(gulp.dest('app/libs/bootstrap-material/'))
})

gulp.task('copy-angular-bootstrap', function() {
  // gulp.src([
  //   'bower_components/angular-bootstrap/ui-bootstrap.js',
  //   'bower_components/angular-bootstrap/ui-bootstrap.min.js',
  //   'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
  //   'bower_components/angular-bootstrap/ui-bootstrap-tpls.css',
  //   'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.css'
  // ])
  // .pipe(gulp.dest('app/libs/angular-bootstrap/'))
})

gulp.task('copy-angular-aria', function() {
  // gulp.src([
  //     'bower_components/angular-aria/*.min.js',
  //   ])
  //   .pipe(gulp.dest('app/libs/angular-aria/'))
})


gulp.task('copylibs',
gulpsync.sync(['cleanlibs',
  [
    'copy-angular',
    // 'copy-bootstrap',
    // 'copy-bootstrap-material',
    // 'copy-angular-bootstrap',
    'copy-angular-ui-router',
    // 'copy-angular-animate',
    // 'copy-angular-messages',
    'copy-angular-material',
    'copy-moment',
    // 'copy-angular-aria',
    // 'copy-angular-moment',
    'copy-angular-xml2json',
'copy-chart.js'
  ]]))
