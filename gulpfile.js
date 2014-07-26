var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var tinylr = require('tiny-lr');
var server = tinylr();
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');



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

gulp.task('sass-build', function() {
  return gulp.src('public/assets/scss/style.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
        errLogToConsole: true
      }))
    .pipe(gulp.dest('public/assets/css/'))
});

// Minify CSS
gulp.task('minify-css', function() {
  gulp.src('public/assets/css/')
  .pipe(minifyCSS({
  }))
  .pipe(gulp.dest('public/assets/css'));
});



// JSHINT
gulp.task('jshint', function() {
  return gulp.src([
    'public/assets/js/modules/*.js',
    'public/assets/js/utils/*.js',
    'public/assets/js/main.js',
    'public/assets/js/admin.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});


// Browserify
gulp.task('main-scripts', function() {
  gulp.src('public/assets/js/main.js')
  .pipe(browserify({
  }))
  .pipe(rename('main-build.js'))
  .pipe(uglify({
    mangle: true
  }))
  .pipe(gulp.dest('public/assets/js/'))
  .pipe(livereload(server));
});

gulp.task('admin-scripts', function() {
  gulp.src('public/assets/js/admin.js')
  .pipe(browserify({
  }))
  .pipe(rename('admin-build.js'))
  .pipe(uglify({
    mangle: true
  }))
  .pipe(gulp.dest('public/assets/js/'));
});



// Uglify
gulp.task('compress-main', function() {
  gulp.src('public/assets/js/main-build.js')
  .pipe(uglify({
    mangle: true
  }))
  .pipe(gulp.dest('public/assets/js/'))
});

gulp.task('compress-admin', function() {
  gulp.src('public/assets/js/admin-build.js')
  .pipe(uglify({
    mangle: true
  }))
  .pipe(gulp.dest('public/assets/js/'));
});

 

// WATCH
gulp.task('watch', function() {
  server.listen(35730, function(err) {
    if (err) {
      return console.log(err);
    }
    gulp.watch('public/assets/scss/**/*.scss', ['sass']);
    gulp.watch('public/assets/js/modules/**/*.js', ['scripts', 'jshint']);                              
    gulp.watch('public/assets/js/utils/**/*.js', ['scripts', 'jshint']);                              
    gulp.watch('public/assets/js/main.js', ['scripts', 'jshint']);                              
    gulp.watch('public/assets/js/admin.js', ['scripts', 'jshint']);                              
  });
});

gulp.task('default', ['watch']);
gulp.task('build', ['compress-main', 'compress-admin', 'sass-build', 'minify-css']);
gulp.task('scripts', ['main-scripts', 'admin-scripts']);
