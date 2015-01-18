var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var _ = require('lodash');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');
var normalize = require('../routeHelpers/normalizeAPIResponse');

// Post index
// Show all posts
exports.index = function *() {
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var posts = yield knex('posts')
                            .select('title', 'excerpt', 'slug', 'id');
    

    var data = yield normalize({
        posts: posts,
        path: '/posts',
        req: this
    });

    if (isClient) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path="/posts" />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Show an individual post
exports.show = function*() {
    var isClient = this.request.url.indexOf('isClient') !== -1;
    var slug = this.params.slug;
    
    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var post = yield knex('posts').where(_id, slug);

    var data = yield normalize({
        posts: post[0],
        path: '/posts/' + slug,
        req: this
    });

    if (isClient) {
        this.body = data;
        return;
    }

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
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var data = yield normalize({
        path: '/posts/new',
        req: this
    });

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
    var body = this.request.body;
    var error;

    // Validations
    try {
        yield checkit(validations.post.new).run(body);
    } catch(err) {
        error = err;
    }

    if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };

    } else {
        var _post = yield knex('posts').insert({
            title: body.title,
            body: body.body,
            slug: body.slug,
            excerpt: body.excerpt,
            published: body.published,
            created_at: new Date(),
            updated_at: new Date()
        }, 'id');

        this.body = {
            success: true,
            post_id: _post[0]
        };
    }

};


// Show the edit post form
exports.edit = function* () {
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var id = this.params.id;

    var data = yield normalize({
        path: '/posts/' + id +'/edit',
        req: this
    });

    var markup = React.renderToString(
            <App data={data} history="true" path={"/posts/" + id + "/edit"} />
            );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });

};

// Update a post
exports.put = function* () {
    var body = this.request.body;
    var id = body.id;
    var error;

    // Validations
    try {
        yield checkit(validations.post.update).run(body);
    } catch(err) {
        error = err;
    }

     if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };

    } else {
        var update = yield knex('posts')
            .where('id', id)
            .update({
            title: body.title,
            body: body.body,
            slug: body.slug,
            excerpt: body.excerpt,
            published: body.published,
            updated_at: new Date()
        }, 'id');
        this.body = {
            success: true,
            post_id: update[0]
        };
    }

};


// Delete a post
exports.del = function* () {
    var body = this.request.body;
    var id = body.id;

    var deletion = yield knex('posts')
                    .where('id', id)
                    .del();
    
    this.body = {
        success: true,
        affected_rows: deletion
    };
};
