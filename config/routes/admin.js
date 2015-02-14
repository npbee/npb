var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');
var normalize = require('../routeHelpers/normalizeAPIResponse');
var _ = require('lodash');

exports.index = function* () {

    var orderBy = this.request.query.orderBy || 'id';
    var sort = this.request.query.sort || 'ASC';
    var limit = this.request.query.limit || null;

    var payload = {
        path: '/admin',
        req: this
    };

    if (limit === 'posts') {
        var posts = yield knex('posts')
            .select('title', 'excerpt', 'slug', 'id', 'published')
            .orderBy(orderBy, sort);

            _.assign(payload, {
                posts: posts
            });

    } else if (limit==='projects') {
        var projects = yield knex('projects').
            select('name', 'slug', 'id', 'published')
            .orderBy(orderBy, sort);

        _.assign(payload, {
            projects: projects
        });
    } if (limit === 'tags') {
        var tags = yield knex('tags').select('name', 'id')
            .orderBy(orderBy, sort);

        _.assign(payload, {
            tags: tags
        });
    } else {
        var posts = yield knex('posts')
            .select('title', 'excerpt', 'slug', 'id', 'published')
            .orderBy(orderBy, sort);

        var projects = yield knex('projects').
            select('name', 'slug', 'id', 'published')
            .orderBy(orderBy, sort);

        var tags = yield knex('tags').select('name', 'id')
            .orderBy(orderBy, sort);

        _.assign(payload, {
            projects: projects,
            posts: posts,
            tags: tags
        });
    }

    var data = yield normalize(payload);

    if (this.request.query.isClient) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
        <App data={data} history="true" path="/admin" />
    );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });
};
