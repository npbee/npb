var React = require('react');

module.exports = React.createClass({
	render: function() {
		var title = this.props.title;
		var tagline = this.props.tagline;
		var slug = this.props.url;

		return (
			<a href={slug}>
				<h2>{tagline}</h2>
				<p>{title}</p>
			</a>
		)
	}
});