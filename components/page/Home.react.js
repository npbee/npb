var React = require('react');
var Snippet = require('../Snippet.react');

module.exports = React.createClass({

  render: function(){
  	var post = this.props.post;
  	var project = this.props.project;

    return (
    	<section className="home">
      		<Snippet title={post.title} tagline="Latest Post" url={'posts/' + post.slug} />
      		<Snippet title={project.name} tagline="Latest Project" url={'projects/' + project.slug} />
      		<Snippet tagline="Connect" title='Find me!' url={'connect'} />
      	</section>
    )

  }

});