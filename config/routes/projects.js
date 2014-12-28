var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var marked = require('marked');

// Project index
// Show all projects
exports.index = function *() {
    var isReact = this.request.url.indexOf('isReact') !== -1;

    var projects = yield this.knex('projects').select('name');

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

    var project = yield this.knex('projects').where('slug', slug);
    
    if (isReact) {
        this.body = JSON.stringify(project);
        return;
    }

    var data = {
        project: project[0],
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

