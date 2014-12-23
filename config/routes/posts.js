var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var _ = require('lodash');
var marked = require('marked');

// Post index
// Show all posts
exports.index = function *() {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var _posts = yield this.pg.db.client.query_('SELECT title, excerpt, slug, id FROM posts');
    var posts = _posts.rows;

    if (isReact) {
        this.body = yield posts;
        return;
    }

    var data = {
        posts: posts,
        path: '/posts',
        history: 'true'
    };

    var markup = React.renderToString(
            <App data={data} history="true" path="/posts" />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

exports.show = function*(slug) {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var query = "SELECT * FROM posts WHERE slug = '" + slug + "';";
    var _post = yield this.pg.db.client.query_(query);
    var post = _post.rows[0];

    if (isReact) {
        this.body = JSON.stringify(post);
        return;
    }

    var data = {
        post: post,
        slug: slug,
        path: '/posts/' + slug,
        history: true
    };

    var markup = React.renderToString(
            <App data={data} history="true" path={"/posts/" + slug} />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};
