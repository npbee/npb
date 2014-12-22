var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');

// Post index
// Show all posts
exports.index = function *() {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var _posts = yield this.pg.db.client.query_('SELECT * FROM posts');
    var posts = _posts.rows;

    if (isReact) {
        this.body = yield posts;
        return;
    }

    var data = {
        posts: posts
    };

    var markup = React.renderToString(
            <App path='/posts' history="true" data={data} />
            );

    this.body = yield render('default', { markup: markup });
};

exports.show = function*(slug) {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var query = "SELECT * FROM posts WHERE slug = '" + slug + "';";
    var post = yield this.pg.db.client.query_(query);
    
    if (isReact) {
        this.body = post.rows[0];
        return;
    }

    var data = {
        post: post.rows[0],
        slug: slug
    };

    var markup = React.renderToString(
            <App path='/posts/:slug' history='true' data={data} />
            );

    this.body = yield render('default', { markup: markup });
};
