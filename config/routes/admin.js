var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');
var normalize = require('../routeHelpers/normalizeAPIResponse');

exports.index = function* () {

    var orderBy = this.request.query.orderBy || 'id';
    var sort = this.request.query.sort || 'ASC';

    postOrder = orderBy = 'name' ? 'title' : orderBy;
    var posts = yield knex('posts')
                    .select('title', 'excerpt', 'slug', 'id', 'published')
                    .orderBy(postOrder, sort);

    projectOrder = orderBy = 'title' ? 'name' : orderBy;
    var projects = yield knex('projects').
        select('name', 'slug', 'id', 'published')
        .orderBy(projectOrder, sort);

    var data = yield normalize({
        projects: projects,
        posts: posts,
        path: '/admin',
        req: this
    });

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
