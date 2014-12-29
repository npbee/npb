var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var config = require('./config/paths');
var paths = config.paths;


// Scripts
var bundler = watchify(browserify({
    entries: ['./app.js'],
    transform: [reactify],
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

gulp.task('js', bundle);
bundler.on('update', bundle);


// Node monitor
gulp.task('server', function() {
    nodemon({
        script: 'server.js',
        ext: 'html js',
        nodeArgs: ['--harmony'],
        env: {
            'NODE_ENV': 'DEVELOPMENT'
        }
    })
    .on('change', [])
    .on('restart', function() {
        console.log('restarted')
    });
});

//Unit tests
gulp.task('test', function() {
    return gulp.src('./tests/**/*.js')
        .pipe(mocha({
            reporter: 'nyan'
        }));
   }
);

// Default task
gulp.task('default', ['server', 'js']);
