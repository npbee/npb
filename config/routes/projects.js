var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var marked = require('marked');

// Project index
// Show all projects
exports.index = function *() {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var _projects = yield this.pg.db.client.query_('SELECT name FROM projects');
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

    var query = "SELECT * FROM projects WHERE slug = '" + slug + "';";
    var _project = yield this.pg.db.client.query_(query);
    var project = _project.rows[0];
    
    if (isReact) {
        this.body = JSON.stringify(project);
        return;
    }

    var data = {
        post: project,
        slug: slug,
        path: '/projects/' + slug,
        history: true
    };

    var markup = React.renderToString(
            <App data={data} history="true" path={"/projects/" + slug} />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

