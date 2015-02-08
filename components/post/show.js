var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');
var marked = require('../../lib/marked');
var parseDate = require('../../lib/format_date');
var SingleItem = require('../shared/SingleItem');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            post: this.props.post || {},
            slug: this.props.slug || ''
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;

       request.get('/posts/' + slug)
       .query({
           query: 'isClient'
       })
       .end(function(res) {
           self.setState({
               post: JSON.parse(res.text).post
           });
       });
    },

    render: function(){
        var html = marked(this.state.post.body || '');
        var date = parseDate(this.state.post.created_at);
        var tags = this.state.post.tags ? this.state.post.tags.map(function(tag) {
            return tag.name;
        }).join(', ') : ""; 

        var metaOne = [
            {
                title: 'Date Posted',
                value: date
            }
        ];

        var metaTwo = [
            {
                title: 'Tags',
                value: tags
            }
        ];

        return <SingleItem 
            metaOne={metaOne}
            metaTwo={metaTwo}
            title={this.state.post.title}
            content={html}
        /> 

    }

});
