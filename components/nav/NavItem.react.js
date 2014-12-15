var React = require('react');

module.exports = React.createClass({

	render: function() {
		var title = this.props.data;

		return (
			<a>{title}</a>
		);
	}
});