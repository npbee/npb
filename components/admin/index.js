var React = require('react');
var request = require('superagent');
var Table = require('../shared/Table');
var AppActions = require('../../actions/AppActions');

var sort = 'ASC';

module.exports = React.createClass({

    getInitialState: function() {
        return {
            posts: this.props.data.posts || [],
            projects: this.props.data.projects || [],
            tags: this.props.data.tags || []
        };
    },

    componentDidMount: function() {
        var self = this;

        request.get('/admin')
        .query({ isClient: true })
        .end(function(res) {
            var response = JSON.parse(res.text);
            self.setState(response);
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
            <Table 
                onSort={this.handleTagSort}
                name="Tags" data={this.state.tags} admin='true' />
        </section>

    },

    handlePostSort: function(column) {
        var self = this;

        request.get('/admin')
        .query({
            isClient: true,
            orderBy: column,
            sort: sort,
            limit: 'posts'
        })
        .end(function(res) {
            self.setState({
                posts: JSON.parse(res.text).posts
            });
        });

        sort = sort == 'ASC' ? 'DESC' : 'ASC';

    },

    handleProjectSort: function(column) {
        var self = this;

        request.get('/admin')
        .query({
            isClient: true,
            orderBy: column,
            sort: sort,
            limit: 'projects'
        })
        .end(function(res) {
            self.setState({
                projects: JSON.parse(res.text).projects
            });
        });

        sort = sort == 'ASC' ? 'DESC' : 'ASC';

    },

    handleTagSort: function(column) {
        var self = this;

        request.get('/admin')
        .query({
            isClient: true,
            orderBy: column,
            sort: sort,
            limit: 'tags'
        })
        .end(function(res) {
            self.setState({
                tags: JSON.parse(res.text).tags
            });
        });

        sort = sort == 'ASC' ? 'DESC' : 'ASC';
    },

});
