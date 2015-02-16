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

    yield Promise.map(tags, function(tag) {
        return knex('tag_relationships')
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

    var postSubQuery = knex('tag_relationships')
        .select('reference_id')
        .where('reference_type', 'post')
        .andWhere('tag_id', tag.id);

    tag.posts = yield knex('posts').where('id', 'in', postSubQuery);

    var projectSubQuery = knex('tag_relationships')
        .select('reference_id')
        .where('reference_type', 'project')
        .andWhere('tag_id', tag.id);

    tag.projects = yield knex('projects').where('id', 'in', projectSubQuery);

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


// Show the edit post form
exports.edit = function* () {

    var slug = this.params.slug;

    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'name' : 'id';
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
            return trx('tags').where('id', id).update({
                name: body.name
            }, 'id');
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
            tag_id: id
        };
    }

};


// Delete a post
exports.del = function* () {
    var body = this.request.body;
    var id = body.id;
    var error;

    try {
        yield knex.transaction(function(trx) {
            return trx('tags').where('id', id).del()
            .then(function() {
                return trx('tag_relationships').where('tag_id', id).del();
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
            success: true
        };
    }
};
