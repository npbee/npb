var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var _ = require('lodash');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');

// Post index
// Show all projects
exports.index = function *() {
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var projects = yield knex('projects')
                            .select('name', 'slug', 'id');
    

    if (isClient) {
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

// Show an individual project
exports.show = function*(slug) {
    var isClient = this.request.url.indexOf('isClient') !== -1;
    // Detect if the param passed is a number so that we can look up a project
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var project = yield knex('projects').where(_id, slug);

    if (isClient) {
        this.body = JSON.stringify(project[0]);
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

// Show the new project form
exports.new = function*() {
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var data = {
        path: '/projects/new',
        history: true
    };

    var markup = React.renderToString(
            <App data={data} history="true" path="/projects/new" />
            );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Create a project
exports.create = function*() {
    var body = this.request.body;
    var error;

    // Validations
    try {
        yield checkit(validations.project.new).run(body);
    } catch(err) {
        error = err;
    }

    if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };

    } else {
        var _project = yield knex('projects').insert({
            name: body.name,
            role: body.role,
            body: body.body,
            url: body.url,
            date_completed: body.date_completed,
            logo: body.logo,
            thumbnail: body.thumbnail,
            small_screen: body.small_screen,
            medium_screen: body.medium_screen,
            large_screen: body.large_screen,
            slug: body.slug,
            published: body.published,
            created_at: new Date(),
            updated_at: new Date()
        }, 'id');

        this.body = {
            success: true,
            project_id: _project[0]
        };
    }

};


// Show the edit project form
exports.edit = function* (id) {
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var data = {
        path: '/projects/' + id +'/edit',
        history: true
    };

    var markup = React.renderToString(
            <App data={data} history="true" path={"/projects/" + id + "/edit"} />
            );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });

};

// Update a project
exports.put = function* () {
    var body = this.request.body;
    var id = body.id;
    var error;

    // Validations
    try {
        yield checkit(validations.project.update).run(body);
    } catch(err) {
        error = err;
    }

     if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };

    } else {
        var update = yield knex('projects')
            .where('id', id)
            .update({
            name: body.name,
            role: body.role,
            url: body.url,
            body: body.body,
            date_completed: body.date_completed,
            logo: body.logo,
            thumbnail: body.thumbnail,
            small_screen: body.small_screen,
            medium_screen: body.medium_screen,
            large_screen: body.large_screen,
            slug: body.slug,
            published: body.published,
            updated_at: new Date()
        }, 'id');
        this.body = {
            success: true,
            project_id: update[0]
        };
    }

};


// Delete a project
exports.del = function* () {
    var body = this.request.body;
    var id = body.id;

    var deletion = yield knex('projects')
                    .where('id', id)
                    .del();
    
    this.body = {
        success: true,
        affected_rows: deletion
    };
};
