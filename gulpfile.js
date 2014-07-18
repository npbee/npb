var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var tinylr = require('tiny-lr');
var server = tinylr();
var jshint = require('gulp-jshint');
var rjs = require('gulp-requirejs');

// SASS
gulp.task('sass', function() {
  return gulp.src('public/assets/scss/style.scss')
    .pipe(
      sass({
        outputStyle: 'expanded',
        errLogToConsole: true
      }))
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(livereload(server));
});

// JSHINT
gulp.task('jshint', function() {
  return gulp.src([
    'public/assets/js/modules/*.js',
    'public/assets/js/main.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(livereload(server));
});


// REQUIREJS BUILD
gulp.task('requirejsBuild', function() {
  rjs({
    name: 'main',
    baseUrl: 'public/assets/js',
    mainConfigFile: 'public/assets/js/main.js',
    out: 'build.js'
  })
    .pipe(gulp.dest('public/assets/js/'));
});


// WATCH
gulp.task('watch', function() {
  server.listen(35730, function(err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('public/assets/scss/**/*.scss', ['sass']);
    gulp.watch('public/assets/js/**/*.js', ['jshint']);                              
  });
});

gulp.task('default', ['watch']);
gulp.task('build', ['requirejsBuild']);
