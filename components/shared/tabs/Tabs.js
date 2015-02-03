var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    render: function() {
        return <h1 className={this.props.klass + ' js-vanilla-slab'}>{this.props.value}</h1>
    }

});
