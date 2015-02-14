var React = require('react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            tagRelationship: {},
            tag: {},
            tagId: this.props.tagId || null
        };
    },

    componentWillReceiveProps: function(newProps) {
        var self = this;

        this.setState({
            tagId: newProps.tagId
        });

        // get the tag relationship
        if (newProps.tagId) {
            request.get('/tags/' + newProps.tagId)
            .query({ isClient: true })
            .end(function(res) {
                var response = JSON.parse(res.text);
                self.setState({
                    tag: response.tag
                });
            });
        }
    },

    componentDidMount: function() {

    },

    render: function() {
        var posts = this.state.tag.posts || [];
        var projects = this.state.tag.projects || [];

        return <div className="quick-tag">
            <h1>{this.state.tag.name}</h1>
            <h2>Posts</h2>
            {posts.map(function(post) {
                return <h3>{post.title}</h3>;
            })}
            <h2>Projects</h2>
            {projects.map(function(project) {
                return <h3>{project.name}</h3>;
            })}
        </div>
    }

});
