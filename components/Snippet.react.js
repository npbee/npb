var React = require('react');

module.exports = React.createClass({
    render: function() {
        var title = this.props.title;
        var excerpt = this.props.excerpt;
        var slug = this.props.url;
        
        return (
            <article className="snippet">
                <h2 className="snippet__tagline">{this.props.tagline}</h2>
                <a className="snippet__item" href={slug}>
                    <span>{title}</span>
                    <span>{excerpt}</span>
                </a>
            </article>
            )
    }
});
