var React = require('react');
var AppStore = require('../../stores/AppStore');


module.exports = React.createClass({

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    render: function() {
        var editLink = this.props.data.editLink ?
                        <a href={this.props.data.editLink}>Edit</a> : '';
        return (
            <div className="dropdown">
                <a><img className="icon" src="/static/images/icons/icomoon/user.svg" /></a>
                <ul>
                    <li><a>Admin page</a></li>
                    <li>{editLink}</li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
        )
    },

    _onChange: function() {
        console.log('we have changed');
    }
});
