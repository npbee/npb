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
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                        name="name"
                        ref="name" 
                        value={this.props.project.name} 
                        onChange={this.props.onChange}
                    />
                    <br/>

                    <label htmlFor="url">URL</label>
                    <input type="text"
                        name="url"
                        ref="url"
                        value={this.props.project.url}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor="role">Role</label>
                    <input type="text"
                        name="role"
                        ref="role"
                        value={this.props.project.role}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor="date_completed">Date Completed</label>
                    <input type="text"
                        name="date_completed"
                        ref="date_completed"
                        value={this.props.project.date_completed}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor="logo">Logo</label>
                    <input type="text"
                        name="logo"
                        ref="logo"
                        value={this.props.project.logo}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input type="text"
                        name="thumbnail"
                        ref="thumbnail"
                        value={this.props.project.thumbnail}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor="small_screen">Small Screen</label>
                    <input type="text"
                        name="small_screen"
                        ref="small_screen"
                        value={this.props.project.small_screen}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor="medium_screen">Medium Screen</label>
                    <input type="text"
                        name="medium_screen"
                        ref="medium_screen"
                        value={this.props.project.medium_screen}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor="large_screen">Large Screen</label>
                    <input type="text"
                        name="large_screen"
                        ref="large_screen"
                        value={this.props.project.large_screen}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <textarea 
                        name="body" 
                        ref="body"
                        value={this.props.project.body}
                        onChange={this.props.onChange}></textarea>
                    <br/>

                    <label htmlFor="slug">Slug</label>
                    <input 
                        type="text" 
                        name="slug" 
                        ref="slug"
                        value={this.props.project.slug}
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
        var id = this.props.project.id || null;
        var name = this.refs.name.getDOMNode().value.trim();
        var role = this.refs.role.getDOMNode().value.trim();
        var url = this.refs.url.getDOMNode().value.trim();
        var date_completed = this.refs.date_completed.getDOMNode().value.trim();
        var body = this.refs.body.getDOMNode().value.trim();
        var logo = this.refs.logo.getDOMNode().value.trim();
        var thumbnail = this.refs.thumbnail.getDOMNode().value.trim();
        var small_screen = this.refs.small_screen.getDOMNode().value.trim();
        var medium_screen = this.refs.medium_screen.getDOMNode().value.trim();
        var large_screen = this.refs.large_screen.getDOMNode().value.trim();
        var slug = this.refs.slug.getDOMNode().value.trim();
        var published = this.refs.published.getDOMNode().value.trim();

        request[this.props.method](this.props.action)
        .send({
            id: id,
            name: name,
            role: role,
            url: url,
            date_completed: date_completed,
            body: body,
            logo: logo,
            thumbnail: thumbnail,
            small_screen: small_screen,
            medium_screen: medium_screen,
            large_screen: large_screen,
            slug: slug,
            published: published
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            if (response.success) {
                navigate('/projects');
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
        var id = this.props.project.id;

        request.del(this.props.action)
        .send({
            id: id
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            if (response.success) {
                navigate('/projects');
            } else {
                self.setState({
                    errors: response.errors
                });
            }
        });
    }

});
