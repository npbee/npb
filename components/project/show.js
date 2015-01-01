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

       // Only fetch a project if there is not one already there from the
       // server
       if (!Object.keys(this.state.project).length) {
           request.get('/projects/' + slug)
            .query({
                query: 'isClient'
            })
            .end(function(res) {
                self.setState({
                    project: JSON.parse(res.text)
                });
            });
       }
    },

    render: function(){
        var html = marked(this.state.project.body || '');
        console.log(this.state.project);
        return (
            <section className="project">
                <h1>{this.state.project.name}</h1>
                <article dangerouslySetInnerHTML = {{__html: html }}></article>
                <a href={"/projects/" + this.state.project.id + "/edit"}>Edit</a>
            </section>
        )

    }

});
