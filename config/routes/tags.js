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
exports.index = function *() {

    var orderBy = this.request.query.orderBy || 'name';
    var sort = this.request.query.sort || 'ASC';

    var tags = yield knex('tags').orderBy(orderBy, sort);

    tags.map(function(tag) {
        var tagRelationships;
        knex('tag_relationships')
        .count('*')
        .where('tag_id', tag.id)
        .then(function(relationships) {
            tag.count = relationships[0].count;
        });
    });
    

    var data = yield normalize({
        tags: tags,
        path: '/tags',
        req: this
    });

    if (this.request.query.isClient) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path="/tags" />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Show an individual tag
exports.show = function*() {
    var slug = this.params.slug;
    
    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'name' : 'id';
    var _tag = yield knex('tags').where(_id, slug);
    var tag = _tag[0];

    var relationships = yield knex('tag_relationships').count('*').where('tag_id', tag.id);

    tag.count = relationships[0].count;

    var data = yield normalize({
        tags: tag,
        path: '/tags/' + slug,
        req: this
    });

    if (this.request.query.isClient) {
        this.body = data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path={"/tags/" + slug} />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Show the new post form
//exports.new = function*() {

    //var data = yield normalize({
        //path: '/posts/new',
        //req: this
    //});

    //var markup = React.renderToString(
            //<App data={data} history="true" path="/posts/new" />
            //);

    //this.body = yield render('default', {
        //markup: markup,
        //state: JSON.stringify(data)
    //});
//};

// Create a post
//exports.create = function*() {
    //var body = this.request.body;
    //var error;
    //var postId;
    //var tags = body.tags;

     //Validations
    //try {
        //yield checkit(validations.post.new).run(body);
    //} catch(err) {
        //error = err;
    //}

    //try {
        //yield knex.transaction(function(trx) {
            //return trx('posts').insert({
                //title: body.title,
                //body: body.body,
                //slug: body.slug,
                //excerpt: body.excerpt,
                //published: body.published,
                //created_at: new Date(),
                //updated_at: new Date()
            //}, 'id').then(function(id) {
                //postId = id[0];
                //return tagHelper.createTagIfNot(trx, body.tags);
            //}).then(function(tagIds) {
                //return tagHelper.createTagRelationship(trx, tagIds, postId, 'post');
            //});
        //});
    //} catch(err) {
        //error = err;
    //}

    //if (error) {
        //this.body = {
            //success: false,
            //errors: JSON.stringify(error)
        //};
    //} else {
        //this.body = {
            //success: true,
            //post_id: postId
        //};
    //}

//};

// Show the edit post form
exports.edit = function* () {

    var slug = this.params.slug;

    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var _tag = yield knex('tags').where(_id, slug);
    var tag = _tag[0];

    var data = yield normalize({
        tags: tag,
        path: '/tags/' + slug + '/edit',
        req: this
    });

    if (this.request.query.isClient) {
        this.body = data;
        return;
    }

    var markup = React.renderToString(
        <App data={data} history="true" path={"/tags/" + slug + "/edit"} />
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
