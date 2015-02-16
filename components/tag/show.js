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

        return <SingleItem 
            metaOne={metaOne}
            metaTwo={metaTwo}
            title={this.state.tag.name}
            content={html}
            tag={this.state.tag}
        /> 

    }

});

module.exports = TagShow;
