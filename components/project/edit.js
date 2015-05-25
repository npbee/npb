var React = require('react'); var navigate = require('react-mini-router').navigate;
var ProjectForm = require('./form');
var request = require('superagent');
var _ = require('lodash');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            hasErrors: false,
            errors: {},
            project: this.props.project || {},
            loaded: false
        };
    },

    componentDidMount: function() {
        var self = this;

        if (!Object.keys(this.state.project).length) {
           request.get('/projects/' + this.props.projectId)
            .query({
                isClient: true
            })
            .end(function(res) {
                self.setState({
                    project: JSON.parse(res.text).project,
                    loaded: true
                });
            });
       }
    },

    render: function(){
        return (
            <section className="project single-item">
                <header>
                    <h1>New Post</h1>
                </header>
                <ProjectForm
                    project={this.state.project}
                    onChange={this.handleChange}
                    method="put"
                    action="/projects" />
            </section>
        );
    },

    handleChange: function(event) {
        var attr = event.target.name;
        var value = event.target.value;

        if (attr === 'published') {
            value = !this.state.project.published;
        }

        var newData = {};
        newData[attr] = value;

        var previousState = this.state.project;
        var newState = _.assign(previousState, newData);

        this.setState({
            project: newState
        });

    }


});
