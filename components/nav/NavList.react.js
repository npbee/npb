var React = require('react');
var NavItem = require('./NavItem.react');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			active: this.props.active,
			items: ['projects', 'blog', 'connect']
		}
	},

	render: function() {

		return (
			<nav>
				<a>Logo</a>
				{this.state.items.map(function(result) {
					return <NavItem key={result} data={result} />;
				})}
			</nav>
		)
	}
});