var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var marked = require('marked');

// Project index
// Show all projects
exports.index = function *() {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var _projects = yield this.pg.db.client.query_('SELECT * FROM projects');
    var projects = _projects.rows;

    if (isReact) {
        this.body = yield projects;
        return;
    }

    var data = {
        projects: projects,
        path: '/projects',
        history: 'true'
    };

    var markup = React.renderToString(
            <App data={data} history="true" path="/projects" />
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

