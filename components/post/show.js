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
            slug: this.props.slug || '',
            loaded: false
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;

       request.get('/posts/' + slug)
       .query({
           isClient: true
       })
       .end(function(res) {
           self.setState({
               post: JSON.parse(res.text).post,
               loaded: true
           });
       });
    },

    render: function(){
        var html = marked(this.state.post.body || '');
        var date = parseDate(this.state.post.created_at);

        var tags;
        if (this.state.post.tags) {
            tags = <div className="tag-list--comma">
                {this.state.post.tags.map((tag, index) => <a
                    key={index} href={"/tags/" + tag.name}>{tag.name}</a>
                )}
            </div>;
        }

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
            image={this.state.post.header_image}
            metaOne={metaOne}
            metaTwo={metaTwo}
            title={this.state.post.title}
            content={html}
            loaded={this.state.loaded}
        />

    }

});
