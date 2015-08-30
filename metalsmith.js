var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

const LABS = ['health'];
const START_CUT = '<!-- CUT -->';
const END_CUT = '<!-- /CUT -->';
const PASTE = '<!-- PASTE -->';

/**
 * Merges the `index.html` and the `readme.md` files together.
 *
 */
function labTransform(files, metalsmith, done) {
    var transformedIndex = '';
    var transformedMd = '';

    var originalIndex = files['index.html'];
    var indexContent = originalIndex.contents.toString();
    var startRegex = new RegExp('[\\s\\S]*' + START_CUT, 'g');
    var endRegex = new RegExp(END_CUT + '[\\s\\S]*', 'g');

    indexContent = indexContent.replace(startRegex, '');
    indexContent = indexContent.replace(endRegex, '');

    transformedIndex = indexContent.trim();

    var originalMd = files['readme.md'];
    var mdContent = originalMd.contents.toString();

    mdContent = mdContent.replace(PASTE, transformedIndex);

    delete files['index.html'];
    delete files['readme.md'];

    files['index.md'] = {
        contents: new Buffer(mdContent),
        layout: __dirname + '/layouts/lab.html'
    };

    done();
}


/**********
 * Labs Metalsmith build
 **********/
exports.labs = function() {
    LABS.forEach(function(lab) {
        Metalsmith('./labs')
            .destination('../build/labs/' + lab)
            .source(lab)
            .use(labTransform)
            .use(markdown())
            .use(layouts({
                engine: 'swig'
            }))
            .build(function(err, files) {
                if (err) { throw err; }
            });
    });
};


/**********
 * Standard Metalsmith build
 **********/
exports.standard = function(doServe) {

    function serveIf(doServe) {
        if (doServe) {
            return serve({
                port: 3000
            });
        } else {
            return function(files, ms, done) {
                done();
            };
        }
    }

    function watchIf(doServe) {

        if (doServe) {
            return watch({
                livereload: true
            });
        } else {
            return function(files, ms, done) {
                done();
            };
        }
    }

    Metalsmith(__dirname)
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
            "source": "./src/static",
            "destination": "./static"
        }))

        // Markdown
        .use(markdown())

        .use(serveIf(doServe))
        .use(watchIf(doServe))

        // Templates
        .use(layouts({
            engine: 'swig'
        }))

        // Build
        .build(function(err) {
            if (err) throw err;
        });
};
