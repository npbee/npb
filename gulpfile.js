var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var sourcemaps = require('gulp-sourcemaps');
var ms = require('./metalsmith');

/**********
 * SCSS DEV
 **********/
gulp.task('scss', function () {
    return sass('scss/app.scss', {
        sourcemap: true,
        style: 'compressed',
        require: 'susy'
    })
    .on('error', function(err) {
        console.error('Error', err.message);
    })
    .pipe(postcss([
        autoprefixer({
            browsers: ['last 2 version']
        })
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/static/css'));
});


/**********
 * METALSMITH
 **********/
gulp.task('metalsmith-standard', ms.standard.bind(null, __dirname, false));
//gulp.task('metalsmith-labs', ms.labs.bind(null, __dirname, false));
gulp.task('serve', ['watch-scss'], ms.standard.bind(null, __dirname, true));

gulp.task('watch-scss', function() {
    gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('default', ['serve']);
gulp.task('build', ['scss', 'metalsmith-standard']);
