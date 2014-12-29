var React = require('react');
var navigate = require('react-mini-router').navigate;
var PostForm = require('./form');
var request = require('superagent');
var _ = require('lodash');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            hasErrors: false,
            errors: {},
            post: this.props.post || {},
            loaded: false
        };
    },

    componentDidMount: function() {
        var self = this;
        
        if (!Object.keys(this.state.post).length) {
           request.get('/posts/' + this.props.postId)
            .query({
                query: 'isReact'
            })
            .end(function(res) {
                self.setState({
                    post: JSON.parse(res.text),
                    loaded: true
                });
            });
       }
    },

    render: function(){
        return (
            <section className="post">
                <h1>New Post</h1>
                <PostForm 
                    post={this.state.post} 
                    onChange={this.handleChange}
                    method="put"
                    action="/posts" />
            </section>
        );
    },

    handleChange: function(event) {
        var attr = event.target.name;
        var value = event.target.value;
        
        var newData = {};
        newData[attr] = value;

        var previousState = this.state.post;
        var newState = _.assign(previousState, newData);

        this.setState({
            post: newState
        });

    }

    
});
