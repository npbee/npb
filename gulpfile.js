var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

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

gulp.task('js', bundle);
bundler.on('update', bundle);

function bundle() {
	return bundler.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./static'));
}
