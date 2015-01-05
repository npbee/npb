var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            post: this.props.post || {},
            project: this.props.project || {}
        }
    },

    componentDidMount: function() {
       var self = this;
        
       if (!Object.keys(this.state.project).length) {
           request.get('/')
            .query({
                query: 'isReact'
            })
            .end(function(res) {
                var data = JSON.parse(res.text);
                self.setState({
                    project: data.latestProject,
                    post: data.latestPost
                });
            });
       }
    },

    render: function(){

        return (
            <section className="home">
                <p className="tagline">Development + Design + Other Stuff</p>
                <Snippet title={this.state.post.title} tagline="Latest Post" url={'posts/' + this.state.post.slug} />
                <Snippet title={this.state.project.name} tagline="Latest Project" url={'projects/' + this.state.project.slug} />
                <Snippet tagline="Connect" title='Find me!' url={'connect'} />
            </section>
            )

    }

});
