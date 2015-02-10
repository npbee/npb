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
        AppActions.authenticate();

        var self = this;

        request.get('/admin')
        .query({ isClient: true })
        .end(function(res) {
            self.setState(JSON.parse(res.text));
        });
    },

    render: function(){
        return <section className="admin">
            <Table 
                onSort={this.handleSort}
                name="Posts" data={this.state.posts} admin='true' />
            <Table 
                onSort={this.handleSort}
                name="Projects" data={this.state.projects} admin='true' />
        </section>

    },

    handleSort: function(column) {
        var self = this;

        request.get('/admin')
        .query({
            isClient: true,
            orderBy: column,
            sort: sort
        })
        .end(function(res) {
            self.setState(JSON.parse(res.text));
        });

        sort = sort == 'ASC' ? 'DESC' : 'ASC';

    },


});
