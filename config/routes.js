var React = require('react');
var render = require('../lib/render');
// var Homepage = require('../components/page/Home.react');
// var NavList = require('../components/nav/NavList.react');
var App = require('../components/App.react');

exports.index = function *() {
	var latestPostQuery = yield this.pg.db.client.query_('SELECT title FROM posts ORDER BY created_at DESC LIMIT 1');
	var latestPost = latestPostQuery.rows[0];

	var latestProjectQuery = yield this.pg.db.client.query_('SELECT name FROM projects ORDER BY created_at DESC LIMIT 1');
	var latestProject = latestProjectQuery.rows[0];

	var data = {
		latestPost: latestPost,
		latestProject: latestProject
	};

	var markup = React.renderToString(
		<App path='/' history='true' data={data} />
	);

    this.body = yield render('default', { 
      markup: markup,
      state: JSON.stringify(data)
    });
};


exports.posts = function *() {
	var _posts = yield this.pg.db.client.query_('SELECT * FROM posts');
	var posts = _posts.rows;

	var data = {
		posts: posts
	};

	var markup = React.renderToString(
		<App path='/posts' history="true" data={data} />
	);

	this.body = yield render('default', { markup: markup });
};
