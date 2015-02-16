var React = require('react');
var request = require('superagent');
var navigate = require('react-mini-router').navigate;
var Tabs = require('../shared/tabs/Tabs');
var TagList = require('../shared/TagList');
var _ = require('lodash');

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
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                            name="name"
                            ref="name" 
                            value={this.props.tag.name} 
                            onChange={this.props.onChange}
                        />
                    </div>


                    <div className="form-row">
                        <button className="button" type="submit">Submit</button>
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
        var name = this.refs.name.getDOMNode().value.trim();

        request[this.props.method](this.props.action)
        .send({
            id: this.props.tag.id,
            name: name
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            if (response.success) {
                navigate('/admin');
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
        var id = this.props.tag.id;

        request.del(this.props.action)
        .send({
            id: id
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            if (response.success) {
                navigate('/admin');
            } else {
                self.setState({
                    errors: response.errors
                });
            }
        });
    }

});
