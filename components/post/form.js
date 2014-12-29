var React = require('react');
var request = require('superagent');
var navigate = require('react-mini-router').navigate;


module.exports = React.createClass({
    getInitialState: function() {
        return {
            errors: {}
        }
    },

    render: function() {

        return (
            <section>
            <form 
            action={this.props.action} 
            method={this.props.method} 
            onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" 
            name="title"
            ref="title" 
            value={this.props.post.title} 
            onChange={this.props.onChange}
            />
            <br/>

            <textarea 
            name="body" 
            ref="body"
            value={this.props.post.body}
            onChange={this.props.onChange}></textarea>
            <br/>

            <label htmlFor="slug">Slug</label>
            <input 
            type="text" 
            name="slug" 
            ref="slug"
            value={this.props.post.slug}
            onChange={this.props.onChange} />
                <br/>

                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" ref="tags" />
                <br/>

                <label htmlFor="excerpt">Excerpt</label>
                <input 
                type="text" 
                name="excerpt" 
                ref="excerpt"
                value={this.props.post.excerpt}
            onChange={this.props.onChange} />
                <br/>

                <label htmlFor="published">Published?</label>
                <input type="checkbox" name="published" ref="published" />
                <br/>

                <button type="submit">Submit</button>

                <pre>{this.state.errors}</pre>
                </form>
                <a id="delete" onClick={this.handleDelete} >Delete</a>
                </section>
        );
    },

    handleSubmit: function(e) {
        var self = this;

        e.preventDefault();
        var id = this.props.post.id || null;
        var title = this.refs.title.getDOMNode().value.trim();
        var body = this.refs.body.getDOMNode().value.trim();
        var slug = this.refs.slug.getDOMNode().value.trim();
        var tags = this.refs.tags.getDOMNode().value.trim();
        var excerpt = this.refs.excerpt.getDOMNode().value.trim();
        var published = this.refs.published.getDOMNode().value.trim();

        request[this.props.method](this.props.action)
            .send({
                id: id,
                title: title,
                body: body,
                slug: slug,
                tags: tags,
                excerpt: excerpt,
                published: published
            })
            .end(function(res) {
                var response = JSON.parse(res.text);
                if (response.success) {
                    navigate('/posts');
                } else {
                    self.setState({
                        errors: response.errors
                    });
                }
            });
    },

    handleDelete: function(e) {
        var self = this;

        e.preventDefault();
        var id = this.props.post.id;
        
        request.del(this.props.action)
            .send({
                id: id
            })
            .end(function(res) {
                var response = JSON.parse(res.text);
                if (response.success) {
                    navigate('/posts');
                } else {
                    self.setState({
                        errors: response.errors
                    });
                }
            });
    }

});
