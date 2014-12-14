var React = require('react');

module.exports = React.createClass({
	render: function() {
		var title = this.props.title;
		var excerpt = this.props.excerpt;

		return (
			<section>
				<h1>{title}</h1>
				<p>{excerpt}</p>
			</section>
		)
	}
});