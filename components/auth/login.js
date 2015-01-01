var React = require('react');
var navigate = require('react-mini-router').navigate;
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            hasErrors: false,
            errors: {}
        };
    },

    componentDidMount: function() {
    },

    render: function(){
        return (
            <section className="login">
                <h1>Login</h1>
                <form action="/login" method="post" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        ref="username"
                    />
                    <br />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        ref="password"
                    />
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </section>
        );

    },

    handleSubmit: function(e) {
        var self = this;
        //e.preventDefault();
        //var username = this.refs.username.getDOMNode().value.trim();
        //var password = this.refs.password.getDOMNode().value.trim();

        //request.post('/login')
        //.send({
            //username: username,
            //password: password
        //})
        //.end(function(res) {
            //console.log(res);
        //});
    }

    
});
