var React = require('react');
var render = require('../lib/render');
// var Homepage = require('../components/page/Home.react');
// var NavList = require('../components/nav/NavList.react');
var App = require('../components/App.react');

var postRoutes = require('./routes/posts');
exports.posts = postRoutes;

exports.index = function *() {
    var latestPostQuery = yield this.pg.db.client.query_('SELECT title FROM posts ORDER BY created_at DESC LIMIT 1');
    var latestPost = latestPostQuery.rows[0];

    var latestProjectQuery = yield this.pg.db.client.query_('SELECT name FROM projects ORDER BY created_at DESC LIMIT 1');
    var latestProject = latestProjectQuery.rows[0];

    var data = {
        latestPost: latestPost,
        latestProject: latestProject,
        path: '/',
        history: true
    };

    var markup = React.renderToString(
            <App data={data} history="true" path="/" />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};
