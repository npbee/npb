var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        
    },

    render: function() {
        return <div className="error-list">
            <ul>
            {this.props.errors.map(function(err, i) {
                return <li 
                    className="alert alert--error" 
                    key={i}>
                    <img src="/static/images/icons/icomoon/user.svg" /><a>{err.error}</a></li>
            })}
            </ul>
        </div>
    }

});
