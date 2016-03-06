var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var msIf = require('metalsmith-if');
var swig = require('swig');
var metallic = require('metalsmith-metallic');
var hljs = require('highlight.js');

hljs.configure({
    classPrefix: ''
});

swig.setDefaults({
    locals: {
        titleize: function(title) {
            return title.toLowerCase().replace(/\s/g, '-');
        }
    }
});

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

        // .use(metallic({
        //     classPrefix: ''
        // }))

        // Markdown
        .use(markdown({
            highlight: function(code) {
                return hljs.highlightAuto(code).value
            }
        }))


        .use(msIf(
            doServe,
            watch({
                paths: {
                    'src/**/*': true,
                    'layouts/**/*': true
                },
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
