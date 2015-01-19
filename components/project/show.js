var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');
var marked = require('marked');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            project: this.props.project || {},
            slug: this.props.slug || ''
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;

       request.get('/projects/' + slug)
       .query({
           query: 'isClient'
       })
       .end(function(res) {
           self.setState({
               project: JSON.parse(res.text).project
           });
       });
    },

    render: function(){
        var html = marked(this.state.project.body || '');

        return (
            <section className="project">
                <h1>{this.state.project.name}</h1>
                <article dangerouslySetInnerHTML = {{__html: html }}></article>
            </section>
        )

    }

});
