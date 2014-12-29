var React = require('react');

module.exports = React.createClass({
    render: function() {
        var title = this.props.title;
        var tagline = this.props.tagline;
        var slug = this.props.url;

        return (
            <div>
            <a href={slug}>
                <span>{tagline}</span>
                <span>{title}</span>
            </a>
            </div>
            )
    }
});
