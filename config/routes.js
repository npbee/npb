var React = require('react');
var render = require('../lib/render');
var App = require('../components/App.react');

exports.posts = require('./routes/posts');
exports.projects = require('./routes/projects');

exports.index = function *() {
    var isAjax = this.request.url.indexOf('isReact') !== -1;
    
    var latestPostQuery = yield this.pg.db.client.query_('SELECT title, slug FROM posts ORDER BY created_at DESC LIMIT 1');
    var latestPost = latestPostQuery.rows[0];

    var latestProjectQuery = yield this.pg.db.client.query_('SELECT name, slug FROM projects ORDER BY created_at DESC LIMIT 1');
    var latestProject = latestProjectQuery.rows[0];

    var data = {
        latestPost: latestPost,
        latestProject: latestProject,
        path: '/',
        history: true
    };

    if (isAjax) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path="/" />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};
