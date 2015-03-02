var React = require('react');
var AppStore = require('../../stores/AppStore');


module.exports = React.createClass({

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    render: function() {
        const editTypes = ['post', 'project'];
        var editLink;

        for (let type of editTypes) {
            if (this.props.data[type]) {
                editLink = <a href={this.props.data.path + '/edit'}>Edit</a>;
            }
        }


        return (
            <div className="dropdown">
                <a><img className="icon" src="/static/images/icons/icomoon/user.svg" /></a>
                <ul>
                    <li><a href="/admin">Admin page</a></li>
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
