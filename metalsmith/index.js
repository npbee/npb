var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var msIf = require('metalsmith-if');

const labsPlugin = require('./labs');

/**********
 * Labs Metalsmith build
 **********/
const LABS = ['health'];

exports.labs = function(root) {
    LABS.forEach(function(lab) {
        Metalsmith(root + '/labs')
            .destination('../build/labs/' + lab)
            .source(lab)
            .use(labsPlugin(root))
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
exports.standard = function(root, doServe) {

    Metalsmith(root)
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

        .use(msIf(
            doServe,
            serve({
                port: 3000
            })
        ))

        .use(msIf(
            doServe,
            watch({
                livereload: doServe
            })
        ))

        // Templates
        .use(layouts({
            engine: 'swig'
        }))

        // Build
        .build(function(err) {
            if (err) throw err;
        });
};
