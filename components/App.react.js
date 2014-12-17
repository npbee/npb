'use strict';

var React = require('react');
var Home = require('./page/Home.react');
var Posts = require('./page/Posts.react');
var NavList = require('./nav/NavList.react');
var RouterMixin = require('react-mini-router').RouterMixin;

var App = React.createClass({

	mixins: [RouterMixin],

	routes: {
		'/': 'home',
		'/posts': 'posts'
	},

	home: function() {
		return <Home
			post={this.props.data.latestPost}
			project={this.props.data.latestProject}/>;
	},

	posts: function() {
		return <Posts posts={this.props.data.posts} />;
	},

	render: function() {
		return <main id="react-app">
				<NavList />
				{this.renderCurrentRoute()}
			</main>
	}


});

module.exports = App;