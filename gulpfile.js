var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var swig = require('swig');
var server = require('gulp-webserver');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');


// Metalsmith stuff
var metalsmith = require('metalsmith');
var assets = require('metalsmith-assets');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');

swig.setDefaults({
    locals: {
        titleize: function(title) {
            return title.toLowerCase().replace(/\s/g, '-');
        }
    }
});

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
    .pipe(gulp.dest('./static/css'));
});


/**********
 * JS
 **********/
gulp.task('js', function() {
    return gulp.src('js/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('static/js'));
});


/**********
 * METALSMITH
 **********/
gulp.task('metalsmith', function(done) {

    return metalsmith(__dirname)

        // Collections
        .use(collections({
            posts: {
                sortBy: 'date',
                reverse: true
            }
        }))

        // Permalinks
        .use(permalinks({
            pattern: ':title'
        }))

        // Assets
        .use(assets({
            "source": "./static",
            "destination": "./static"
        }))

        // Markdown
        .use(markdown())

        // Templates
        .use(layouts({
            engine: 'swig'
        }))

        // Build
        .build(function(err) {
            if (err) throw err;
            done();
        });
});


gulp.task('serve', function() {
    connect.server({
        root: ['./build'],
        port: 3000,
        livereload: true
    })
});


gulp.task('reload', function() {
    gulp.src('./build/**/*.html')
        .pipe(connect.reload());
});


gulp.task('watch', ['serve'], function() {
    gulp.watch('scss/**/*.scss', ['scss']);

    gulp.watch(
        ['static/**/*', 'src/**/*', 'layouts/**/*'],
        ['metalsmith']
    );

    gulp.watch('build/**/*.html', ['reload']);
});

gulp.task('default', ['watch']);
