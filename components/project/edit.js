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
                query: 'isClient'
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
            <section className="project">
                <h1>New Post</h1>
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
        
        var newData = {};
        newData[attr] = value;

        var previousState = this.state.project;
        var newState = _.assign(previousState, newData);

        this.setState({
            project: newState
        });

    }

    
});
