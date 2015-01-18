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
        var hasId = this.props.data.every(function(item) {
            return item['id'] !== null;
        });
        console.log(hasId);
        var self = this;

        request.get('/posts')
        .query({ query: 'isClient' })
        .end(function(res) {
            self.setState({
                posts: JSON.parse(res.text).posts
            });
        });
    },

    render: function(){

        return (
            <section className="posts">
                {this.state.posts.map(function(post) {
                    return <Snippet key={post.id} title={post.excerpt} tagline={post.title} url={'/posts/' + post.slug} />
                    })}
                </section>
        )

    }

});
