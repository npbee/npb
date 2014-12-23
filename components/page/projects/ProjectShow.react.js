var React = require('react');
var Snippet = require('../../Snippet.react');
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
        
       // Only fetch a post if there is not one already there from the
       // server
       if (!Object.keys(this.state.project).length) {
           request.get('/projects/' + this.state.slug)
            .query({
                query: 'isReact'
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
        
        return (
            <section className="project">
                <h1>{this.state.project.name}</h1>
                <article dangerouslySetInnerHTML = {{__html: html }}></article>
            </section>
        )

    }

});
