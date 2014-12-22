var React = require('react');
var Snippet = require('../../Snippet.react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            post: this.props.post || {},
            slug: this.props.slug || ''
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;
       
       request.get('/posts/' + slug)
        .query({
            query: 'isReact'
        })
        .end(function(res) {
            console.log(res);
            self.setState({
                post: JSON.parse(res.text)
            });
        });
    },

    render: function(){

        return (
            <section className="post">
                <h1>{this.state.post.title}</h1>
                {this.state.post.body}
            </section>
        )

    }

});
