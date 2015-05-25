var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {

        return {
            posts: this.props.posts || []
        };
    },

    componentDidMount: function() {
        var self = this;

        request.get('/posts')
        .query(
            {
                isClient: true,
                orderBy: 'created_at',
                sort: 'DESC'
            }
        )
        .end(function(res) {
            self.setState({
                posts: JSON.parse(res.text).posts
            });
        });
    },

    render: function(){

        return (
            <section className="posts center">
                <h1>Posts</h1>
                {this.state.posts.map(function(post) {
                    return <Snippet key={post.id} title={post.excerpt} tagline={post.title} url={'/posts/' + post.slug} />
                })}
            </section>
        )

    }

});
