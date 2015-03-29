var React = require('react');
var NavActions = require('../actions/NavActions');
var AppActions = require('../actions/AppActions');

module.exports = React.createClass({
    render: function() {
        var title = this.props.title;
        var excerpt = this.props.excerpt;
        var slug = this.props.url;
        
        return (
            <a href={slug} className="snippet" onClick={this._onClick}>
                <h2 className="snippet__tagline">{this.props.tagline}</h2>
                <span className="snippet__item">
                    <span>{title}</span>
                    <span>{excerpt}</span>
                </span>
            </a>
            )
    },

    _onClick: function() {
        NavActions.close();
        AppActions.navigate();
    }
});
