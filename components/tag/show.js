var React = require('react');
var Snippet = require('../Snippet.react');
var SingleItem = require('../shared/SingleItem');
var request = require('superagent');
var parseDate = require('../../lib/format_date');
var marked = require('../../lib/marked');
var SingleItem = require('../shared/SingleItem');

var TagShow = React.createClass({

    getInitialState: function() {
        return {
            tag: this.props.tag || {},
            slug: this.props.slug || ''
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;

       request.get('/tags/' + slug)
       .query({
           isClient: true
       })
       .end(function(res) {
           self.setState({
               tag: JSON.parse(res.text).tag
           });
       });
    },

    render: function(){
        var html = '';
        var date = parseDate(this.state.tag.created_at);

        var metaOne = [
            {
                title: 'Created At',
                value: date
            }
        ];

        var metaTwo = [
            {
                title: 'Tagged Items',
                value: this.state.tag.count
            }
        ];

        if (this.state.tag.posts && this.state.tag.posts.length) {
            html += '<h2>Posts</h2>';
            this.state.tag.posts.forEach(function(post) {
                html+= `<a href="/posts/${post.slug}">${post.title}</a>`;
            });
            html += '<hr class="rule--small" />';
        }

        if (this.state.tag.projects && this.state.tag.projects.length) {
            html += '<h2>Projects</h2>';
            this.state.tag.projects.forEach(function(project) {
                html+= `<a href="/projects/${project.slug}">${project.name}</a>`;
            });
        }


        return <SingleItem 
            metaOne={metaOne}
            metaTwo={metaTwo}
            title={this.state.tag.name}
            content={html}
        /> 

    }

});

module.exports = TagShow;
