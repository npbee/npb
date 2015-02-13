var React = require('react');
var request = require('superagent');
var Table = require('../shared/Table');
var AppActions = require('../../actions/AppActions');

var sort = 'ASC';

module.exports = React.createClass({

    getInitialState: function() {
        return {
            posts: this.props.data.posts || [],
            projects: this.props.data.projects || []
        };
    },

    componentDidMount: function() {
        var self = this;

        request.get('/posts')
        .query({ isClient: true })
        .end(function(res) {
            var response = JSON.parse(res.text);
            self.setState({
                posts: response.posts
            });
            AppActions.authenticate(response.isAuthenticated);
        });

        request.get('/projects')
        .query({ isClient: true })
        .end(function(res) {
            var response = JSON.parse(res.text);
            self.setState({
                projects: response.projects
            });
            AppActions.authenticate(response.isAuthenticated);
        });
    },

    render: function(){
        return <section className="admin">
            <Table 
                onSort={this.handlePostSort}
                name="Posts" data={this.state.posts} admin='true' />
            <Table 
                onSort={this.handleProjectSort}
                name="Projects" data={this.state.projects} admin='true' />
        </section>

    },

    handlePostSort: function(column) {
        var self = this;

        request.get('/posts')
        .query({
            isClient: true,
            orderBy: column,
            sort: sort
        })
        .end(function(res) {
            self.setState({
                posts: JSON.parse(res.text)
            });
        });

        sort = sort == 'ASC' ? 'DESC' : 'ASC';

    },

    handleProjectSort: function(column) {
        var self = this;

        request.get('/projects')
        .query({
            isClient: true,
            orderBy: column,
            sort: sort
        })
        .end(function(res) {
            self.setState({
                projects: JSON.parse(res.text)
            });
        });

        sort = sort == 'ASC' ? 'DESC' : 'ASC';

    },


});
