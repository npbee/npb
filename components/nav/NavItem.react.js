var React = require('react');

module.exports = React.createClass({

	render: function() {
		var title = this.props.data;
		var className = this.props.className;

		return (
			<nav>
				<a className={className} >{title}</a>
			</nav>
		);
	}
});