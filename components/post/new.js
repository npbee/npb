var React = require('react');
var navigate = require('react-mini-router').navigate;
var PostForm = require('./form');
var _ = require('lodash');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            hasErrors: false,
            errors: {},
            post: {}
        };
    },

    componentDidMount: function() {
    },

    render: function(){
        return (
            <section className="post single-item">
                <header>
                    <h1>New Post</h1>
                </header>
                <PostForm
                    post={this.state.post}
                    method="post"
                    onChange={this.handleChange}
                    action="/posts" />
            </section>
        );

    },

    handleChange: function(event) {
        var attr = event.target.name;
        var value = event.target.value;

        if (attr === 'published') {
            value = !this.state.post.published;
        }

        var newData = {};
        newData[attr] = value;

        var previousState = this.state.post;
        var newState = _.assign(previousState, newData);

        this.setState({
            post: newState
        });

    }


});
