var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha-co');
var exit = require('gulp-exit');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var to5ify = require('6to5ify');

var config = require('./config/paths');
var paths = config.paths;



/**********
 * SCSS
 *********/
gulp.task('scss-dev', function () {
    return sass('scss/app.scss', {
        sourcemap: true,
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
    .pipe(gulp.dest('./static/css'))
    .pipe(livereload());
});



/**********
 * JS
 *********/
var bundler = watchify(browserify({
    entries: ['./app.js'],
    transform: [to5ify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));


function bundle() {
    console.log('Rebundling...');
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static'));
}

bundler.on('update', bundle);



/**********
 * SERVER
 *********/
gulp.task('server', function() {
    nodemon({
        script: 'start.js',
        ext: 'html js',
        env: {
            'NODE_ENV': process.env.NODE_ENV || 'development'
        }
    })
    .on('change', [])
    .on('restart', function() {
        console.log('restarted')
    });
});



/**********
 * TESTS
 *********/
gulp.task('test', function() {
    require('babel/register');
    return gulp.src('./tests/**/*.js')
        .pipe(mocha({
            reporter: 'nyan'
        }))
        .pipe(exit());
   }
);



/**********
 * TASKS
 *********/
gulp.task('scss', function() {
    livereload.listen();
    watch('./scss/**/*.scss', function() {
        gulp.start('scss-dev');
    });
});
gulp.task('js', bundle);
gulp.task('default', ['server', 'js', 'scss']);
