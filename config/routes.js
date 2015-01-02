var React = require('react');
var render = require('../lib/render');
var App = require('../components/App.react');
var db = require('../lib/db');

exports.posts = require('./routes/posts');
exports.projects = require('./routes/projects');
exports.admin = require('./routes/admin');
exports.auth = require('./routes/auth');

exports.index = function *() {
    var isAjax = this.request.url.indexOf('isReact') !== -1;
    
    var latestPost = yield db('posts')
                                    .select('title', 'slug')
                                    .orderBy('created_at', 'desc')
                                    .limit(1);

    var latestProject = yield db('projects')
                                    .select('name', 'slug')
                                    .orderBy('created_at', 'desc')
                                    .limit(1);

    var data = {
        latestPost: latestPost[0],
        latestProject: latestProject[0],
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
