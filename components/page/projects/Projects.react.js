var React = require('react');
var Snippet = require('../../Snippet.react');
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
    .query({ query: 'isReact' })
    .end(function(res) {
      self.setState({
        projects: JSON.parse(res.text)
      });
    });
  },

  render: function(){

    return (
    	<section className="projects">
      		{this.state.projects.map(function(project) {
      			return <a key={project.name}>{project.name}</a>
      		})}
      	</section>
    )

  }

});
