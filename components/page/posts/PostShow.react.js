var React = require('react');
var Snippet = require('../../Snippet.react');
var request = require('superagent');
var marked = require('marked');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            post: this.props.post || {},
            slug: this.props.slug || ''
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;

       // Only fetch a post if there is not one already there from the
       // server
       if (!Object.keys(this.state.post).length) {
           request.get('/posts/' + slug)
            .query({
                query: 'isReact'
            })
            .end(function(res) {
                self.setState({
                    post: JSON.parse(res.text)
                });
            });
       }
    },

    render: function(){
        var html = marked(this.state.post.body || '');
        
        return (
            <section className="post">
                <h1>{this.state.post.title}</h1>
                <article dangerouslySetInnerHTML = {{__html: html }}></article>
            </section>
        )

    }

});
