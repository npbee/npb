'use strict';

var React = require('react');
var Home = require('./page/Home.react');
var Posts = require('./page/Posts.react');
var NavList = require('./nav/NavList.react');


var App = React.createClass({

	render: function() {
		var output = '';

		switch(this.props.currentPage) {
			case 'home':
				output = <Home
					post={this.props.data.latestPost}
					project={this.props.data.latestProject}
				/>;
				break;
			case 'posts':
				output = <Posts posts={this.props.data.posts} />
				break;
		}

		return (
			<main id="react-app">
				<NavList selected={this.props.currentPage} />
				{output}
			</main>
		)
	}


});

module.exports = App;