var React = require('react');
var Snippet = require('./Snippet.react');

module.exports = React.createClass({

  render: function(){
  	var post = this.props.post;

    return (
      	<Snippet title={post.title} excerpt={post.excerpt} />
    )

  }

});