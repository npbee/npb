var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var _ = require('lodash');
var parse = require('co-body');

// Post index
// Show all posts
exports.index = function *() {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var posts = yield this.knex('posts')
                            .select('title', 'excerpt', 'slug', 'id');
    

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

// Show an individual post
exports.show = function*(slug) {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var post = yield this.knex('posts').where('slug', slug);

    if (isReact) {
        this.body = JSON.stringify(post[0]);
        return;
    }

    var data = {
        post: post[0],
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

// Show the new post form
exports.new = function*() {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var data = {
        path: '/posts/new',
        history: true
    };

    var markup = React.renderToString(
            <App data={data} history="true" path="/posts/new" />
            );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Create a post
exports.create = function*() {
    var body = yield parse(this);
    var creation = yield this.knex('posts').insert({
        title: body.title
    });

    this.redirect('/posts');
};
