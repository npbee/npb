var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var msIf = require('metalsmith-if');
var swig = require('swig');

const labsPlugin = require('./labs');

swig.setDefaults({
    locals: {
        titleize: function(title) {
            return title.toLowerCase().replace(/\s/g, '-');
        }
    }
});

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
