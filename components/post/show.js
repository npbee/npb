var React = require('react');
var Snippet = require('../Snippet.react');
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

       request.get('/posts/' + slug)
       .query({
           query: 'isClient'
       })
       .end(function(res) {
           self.setState({
               post: JSON.parse(res.text).post
           });
       });
    },

    render: function(){
        var html = marked(this.state.post.body || '');
        
        return (
            <section className="post">
                <h1>{this.state.post.title}</h1>
                <article dangerouslySetInnerHTML = {{__html: html }}></article>
                <a href={"/posts/" + this.state.post.id + "/edit"}>Edit</a>
            </section>
        )

    }

});
