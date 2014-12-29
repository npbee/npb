var React = require('react');
var navigate = require('react-mini-router').navigate;
var PostForm = require('./form');

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
            <section className="post">
                <h1>New Post</h1>
                <PostForm
                    post={{}}
                    method="post"
                    action="/posts" />
            </section>
        );

    }

    
});
