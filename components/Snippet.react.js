var React = require('react');

module.exports = React.createClass({
    render: function() {
        var title = this.props.title;
        var excerpt = this.props.excerpt;
        var slug = this.props.url;
        
        return (
            <div>
            <a href={slug}>
                <span>{title}</span>
                <span>{excerpt}</span>
            </a>
            </div>
            )
    }
});
