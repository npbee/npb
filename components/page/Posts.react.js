var React = require('react');
var Snippet = require('../Snippet.react');

module.exports = React.createClass({

  render: function(){
  	var posts = this.props.posts;

    return (
    	<section className="posts">
      		{posts.map(function(post) {
      			return <Snippet key={post.id} title={post.excerpt} tagline={post.title} url={post.slug} />
      		})}
      	</section>
    )

  }

});