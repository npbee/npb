var React = require('react');
var navigate = require('react-mini-router').navigate;
var ProjectForm = require('./form');

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
            <section className="project single-item">
                <header>
                    <h1>New Project</h1>
                </header>
                <ProjectForm
                    project={{}}
                    method="post"
                    action="/projects" />
            </section>
        );

    }


});
