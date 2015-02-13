var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var _ = require('lodash');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');
var normalize = require('../routeHelpers/normalizeAPIResponse');
var tagHelper = require('../routeHelpers/tagHelper');

// Post index
// Show all projects
exports.index = function *() {

    var orderBy = this.request.query.orderBy || 'name';
    var sort = this.request.query.sort || 'ASC';
    
    var projects = yield knex('projects').orderBy(orderBy, sort);

    var data = yield normalize({
        projects: projects,
        path: '/projects',
        req: this
    });


    if (this.request.query.isClient) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path="/projects" />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Show an individual project
exports.show = function*() {
    var slug = this.params.slug;

    // Detect if the param passed is a number so that we can look up a project
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var _project = yield knex('projects').where(_id, slug);
    var project = _project[0];

    var subquery = knex('tag_relationships')
                        .where('reference_type', 'project')
                        .andWhere('reference_id', project.id).select('tag_id');

    var tags = yield knex('tags').where('id', 'in', subquery);

    project.tags = tags;

    var data = yield normalize({
        projects: project,
        path: '/projects/' + slug,
        req: this
    });


    if (this.request.isClient) {
        this.body = yield data;
        return;
    }

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

    var data = yield normalize({
        path: '/projects/new',
        req: this
    });

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
    var projectId;

    // Validations
    try {
        yield checkit(validations.project.new).run(body);
    } catch(err) {
        error = err;
    }

    try {
        yield knex.transaction(function(trx) {
            return trx('projects').insert({
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
            }, 'id').then(function(id) {
                projectId = id[0];
                return tagHelper.createTagIfNot(trx, body.tags);
            }).then(function(tagIds) {
                return tagHelper.createTagRelationship(trx, tagIds, projectId, 'project');
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
            project_id: projectId
        };
    }


};


// Show the edit project form
exports.edit = function* () {
    var slug = this.params.slug;

    // Detect if the param passed is a number so that we can look up a project
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var _project = yield knex('projects').where(_id, slug);
    var project = _project[0];

    var subquery = knex('tag_relationships')
                        .where('reference_type', 'project')
                        .andWhere('reference_id', project.id).select('tag_id');

    var tags = yield knex('tags').where('id', 'in', subquery);

    project.tags = tags;

    var data = yield normalize({
        projects: project,
        path: '/projects/' + slug + '/edit',
        req: this
    });


    if (this.request.isClient) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
        <App data={data} history="true" path={"/projects/" + slug + '/edit'} />
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


    try {
        yield knex.transaction(function(trx) {
            return trx('projects')
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
                }, 'id').then(function(id) {
                    return tagHelper.collect(trx, body.tags);
                }).then(function(tagIds) {
                    return tagHelper.upsert(trx, tagIds, id, 'project');
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
            project_id: id
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
