var React = require('react');
var Snippet = require('../../Snippet.react');
var request = require('superagent');
var marked = require('marked');
var navigate = require('react-mini-router').navigate;

module.exports = React.createClass({

    getInitialState: function() {
        return {
            hasErrors: false,
            errors: {}
        };
    },

    componentDidMount: function() {
    },

    render: function(){
        return (
            <section className="post">
                <h1>New Post</h1>
                <form action="/posts/" method="post" onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" ref="title"/>
                    <br/>

                    <textarea name="body" ref="body"></textarea>
                    <br/>

                    <label htmlFor="slug">Slug</label>
                    <input type="text" name="slug" ref="slug" />
                    <br/>

                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" ref="tags" />
                    <br/>

                    <label htmlFor="excerpt">Excerpt</label>
                    <input type="text" name="excerpt" ref="excerpt" />
                    <br/>

                    <label htmlFor="published">Published?</label>
                    <input type="checkbox" name="published" ref="published" />
                    <br/>
                    
                    <button type="submit">Create Post</button>
                </form>
                <pre>{this.state.errors}</pre>
            </section>
        );

    },

    handleSubmit: function(e) {
        var self = this;

        e.preventDefault();
        var title = this.refs.title.getDOMNode().value.trim();
        var body = this.refs.body.getDOMNode().value.trim();
        var slug = this.refs.slug.getDOMNode().value.trim();
        var tags = this.refs.tags.getDOMNode().value.trim();
        var excerpt = this.refs.excerpt.getDOMNode().value.trim();
        var published = this.refs.published.getDOMNode().value.trim();

        request.post('/posts')
            .send({
                title: title,
                body: body,
                slug: slug,
                tags: tags,
                excerpt: excerpt,
                published: published
            })
            .end(function(res) {
                var response = JSON.parse(res.text);
                if (res.text.success) {
                    navigate('/posts');
                } else {
                    self.setState({
                        errors: response.errors
                    });
                }
            });
    }

});
