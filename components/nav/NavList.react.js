var React = require('react');
var NavItem = require('./NavItem.react');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			selected: 'home',
			items: ['projects', 'blog', 'connect']
		}
	},

	render: function() {
		var selected = this.props.selected || this.state.selected;

		return (
			<nav>
				<a href="/">Logo</a>
				{this.state.items.map(function(result) {
					var className = result === selected ? 'active' : '';
					return <NavItem key={result} data={result} className={className} />;
				})}
			</nav>
		)
	}
});