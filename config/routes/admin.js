var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');
var normalize = require('../routeHelpers/normalizeAPIResponse');

exports.index = function* () {

    var posts = yield knex('posts').select('title', 'excerpt', 'slug', 'id', 'published');
    var projects = yield knex('projects').select('name', 'slug', 'id', 'published');

    var data = yield normalize({
        projects: projects,
        posts: posts,
        path: '/admin',
        req: this
    });

    if (this.request.isClient) {
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
