var React = require('react');
var render = require('../lib/render');
var Homepage = require('../components/Homepage.react');

exports.index = function *() {
	var latestPostQuery = yield this.pg.db.client.query_('SELECT * FROM posts ORDER BY created_at DESC LIMIT 1');
	var latestPost = latestPostQuery.rows[0];

	var markup = React.renderToString(<Homepage post={latestPost} />);

    this.body = yield render('index', { markup: markup });
};