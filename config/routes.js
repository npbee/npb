var React = require('react');
var render = require('../lib/render');
var Homepage = require('../components/page/Homepage.react');
var NavList = require('../components/nav/NavList.react');

exports.index = function *() {
	var latestPostQuery = yield this.pg.db.client.query_('SELECT * FROM posts ORDER BY created_at DESC LIMIT 1');
	var latestPost = latestPostQuery.rows[0];

	var markup = React.renderToString(
		<main id="react-app">
			<NavList active="homepage" />
			<Homepage post={latestPost} />
		</main>
	);

    this.body = yield render('default', { markup: markup });
};