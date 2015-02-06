var React = require('react');
var request = require('superagent');
var navigate = require('react-mini-router').navigate;
var Tabs = require('../shared/tabs/Tabs');

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
                <div className="form-row">
                    <label htmlFor="title">Title</label>
                    <input type="text" 
                        name="title"
                        ref="title" 
                        value={this.props.post.title} 
                        onChange={this.props.onChange}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="body">Body</label>
                    <Tabs>
                        <Tabs.Panel title="Markdown">
                            <textarea 
                                name="body" 
                                ref="body"
                                value={this.props.post.body}
                                onChange={this.props.onChange}></textarea>
                        </Tabs.Panel>
                        <Tabs.Panel title="Preview">
                            <h2>Content #2</h2>
                        </Tabs.Panel>
                    </Tabs>
                </div>

                <div className="form-row">
                    <label htmlFor="slug">Slug</label>
                    <input 
                        type="text" 
                        name="slug" 
                        ref="slug"
                        value={this.props.post.slug}
                        onChange={this.props.onChange} />
                </div>

                <div className="form-row">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" ref="tags" />
                </div>

                <div className="form-row">
                    <label htmlFor="excerpt">Excerpt</label>
                    <input 
                        type="text" 
                        name="excerpt" 
                        ref="excerpt"
                        value={this.props.post.excerpt}
                        onChange={this.props.onChange} />
                </div>

                <div className="form-row">
                    <div className="checkbox">
                        <input type="checkbox" name="published" ref="published" />
                        <label htmlFor="published">Published?</label>
                    </div>
                </div>

                <div className="form-row">
                    <button type="submit">Submit</button>
                </div>

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
