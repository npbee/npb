var React = require('react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            tagRelationship: {}
        };
    },

    componentDidMount: function() {
        var self = this;

        // get the tag relationship
    },

    render: function() {
        return <div className="quick-tag">
            <h1>{this.props.tag.name}</h1>
            <p>{this.props.tag.count}</p>
        </div>
    }

});
