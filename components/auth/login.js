var React = require('react');
var navigate = require('react-mini-router').navigate;
var request = require('superagent');
var ErrorList = require('../shared/ErrorList');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            hasErrors: false,
            errors: []
        };
    },

    componentDidMount: function() {
    },

    render: function(){
        return (
            <section className="login skinny">
                <h1>Login</h1>
                <form action="/login" method="post" onSubmit={this.handleSubmit}>
                    <div className='form-row'>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            ref="username"
                        />
                    </div>

                    <div className='form-row'>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            ref="password"
                        />
                    </div>

                    <div className='form-row'>
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
                <ErrorList errors={this.state.errors} />
            </section>
        );

    },

    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        var username = this.refs.username.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim();

        request.post('/login')
        .query({
            isClient: true
        })
        .send({
            username: username,
            password: password
        })
        .end(function(res) {
            var resp = JSON.parse(res.text);
            if (resp.success) {
                navigate('/admin');
            } else {
                self.setState({
                    errors: resp.errors
                });
            }
        });
    }

    
});
