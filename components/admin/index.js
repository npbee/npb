var React = require('react');
var request = require('superagent');
var Table = require('../Table');

module.exports = React.createClass({

  getInitialState: function() {
    return {
        posts: this.props.data.posts || [],
        projects: this.props.data.projects || []
    };
  },

  componentDidMount: function() {
    var self = this;

    request.get('/admin')
    .query({ query: 'isClient' })
    .end(function(res) {
      self.setState({
        posts: JSON.parse(res.text).posts
      });
    });
  },

  render: function(){
    return <section className="admin">
        <Table name="Posts" data={this.state.posts} />
        <Table name="Projects" data={this.state.projects} />
    </section>

  }

});
