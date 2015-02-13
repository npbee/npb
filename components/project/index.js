var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            projects: this.props.projects || []
        };
    },

    componentDidMount: function() {
        var self = this;

        request.get('/projects')
        .query({isClient: true})
        .end(function(res) {
            self.setState({
                projects: JSON.parse(res.text).projects
            });
        });
    },

    render: function(){

        return (
            <section className="projects">
            {this.state.projects.map(function(project) {
                return <Snippet key={project.id} title={project.role} tagline={project.name} url={'/projects/' + project.slug} />
            })}
            </section>
        )

    }

});
