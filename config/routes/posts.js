var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var _ = require('lodash');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');
var normalize = require('../routeHelpers/normalizeAPIResponse');
var Promise = require('bluebird');
var tagHelper = require('../routeHelpers/tagHelper');

// Post index
// Show all posts
exports.index = function *() {

    var orderBy = this.request.query.orderBy || 'title';
    var sort = this.request.query.sort || 'ASC';

    var posts = yield knex('posts').where('published', true).orderBy(orderBy, sort);
    

    var data = yield normalize({
        posts: posts,
        path: '/posts',
        req: this
    });

    if (this.request.query.isClient) {
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
    var slug = this.params.slug;
    
    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var _post = yield knex('posts').where(_id, slug);
    var post = _post[0];

    if (!post.published && !this.isAuthenticated()) {
        this.redirect('/login');
    }

    var subquery = knex('tag_relationships')
                        .where('reference_type', 'post')
                        .andWhere('reference_id', post.id).select('tag_id');

    if (post) {
        var tags = yield knex('tags').where('id', 'in', subquery);
    }

    post.tags = tags;

    var data = yield normalize({
        posts: post,
        path: '/posts/' + slug,
        req: this
    });

    if (this.request.query.isClient) {
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
    var postId;
    var tags = body.tags;

    // Validations
    try {
        yield checkit(validations.post.new).run(body);
    } catch(err) {
        error = err;
    }

    try {
        yield knex.transaction(function(trx) {
            return trx('posts').insert({
                title: body.title,
                body: body.body,
                slug: body.slug,
                excerpt: body.excerpt,
                published: body.published,
                created_at: new Date(),
                updated_at: new Date()
            }, 'id').then(function(id) {
                postId = id[0];
                return tagHelper.createTagIfNot(trx, body.tags);
            }).then(function(tagIds) {
                return tagHelper.createTagRelationship(trx, tagIds, postId, 'post');
            });
        });
    } catch(err) {
        error = err;
    }

    if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };
    } else {
        this.body = {
            success: true,
            post_id: postId
        };
    }

};

// Show the edit post form
exports.edit = function* () {

    var slug = this.params.slug;

    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var _post = yield knex('posts').where(_id, slug);
    var post = _post[0];

    var subquery = knex('tag_relationships')
                        .where('reference_type', 'post')
                        .andWhere('reference_id', post.id).select('tag_id');

    var tags = yield knex('tags').where('id', 'in', subquery);

    post.tags = tags;

    var data = yield normalize({
        posts: post,
        path: '/posts/' + slug + '/edit',
        req: this
    });

    if (this.request.query.isClient) {
        this.body = data;
        return;
    }

    var markup = React.renderToString(
        <App data={data} history="true" path={"/posts/" + slug + "/edit"} />
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
    var tags = body.tags;

    try {
        yield knex.transaction(function(trx) {
            return trx('posts').where('id', id).update({
                title: body.title,
                body: body.body,
                slug: body.slug,
                excerpt: body.excerpt,
                published: body.published,
                created_at: new Date(),
                updated_at: new Date()
            }, 'id').then(function(id) {
                return tagHelper.collect(trx, tags);
            }).then(function(tagIds) {
                return tagHelper.upsert(trx, tagIds, id, 'post');
            });
        });
    } catch(err) {
        error = err;
    }

    if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };
    } else {
        this.body = {
            success: true,
            post_id: id
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
