var React = require('react');
var slab = require('../../lib/vanilla_slab');

module.exports = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        slab.init();
    },

    render: function() {
        return <h1 className={this.props.klass + ' giga js-vanilla-slab'}>{this.props.value}</h1>
    }

});
