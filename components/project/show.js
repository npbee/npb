var React = require('react');
var Snippet = require('../Snippet.react');
var SingleItem = require('../shared/SingleItem');
var request = require('superagent');
var parseDate = require('../../lib/format_date');
var marked = require('../../lib/marked');
var SingleItem = require('../shared/SingleItem');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            project: this.props.project || {},
            slug: this.props.slug || '',
            loaded: false
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;

       request.get('/projects/' + slug)
       .query({
           isClient: true
       })
       .end(function(res) {
           self.setState({
               project: JSON.parse(res.text).project,
               loaded: true
           });
       });
    },

    render: function(){
        var html = marked(this.state.project.body || '');
        var date = parseDate(this.state.project.date_completed);
        
        var tags;
        if (this.state.project.tags) {
            tags = <div className="tag-list--comma">
                {this.state.project.tags.map((tag, index) => <a 
                    key={index} href={"/tags/" + tag.name}>{tag.name}</a>
                )}
            </div>;
        }
        
        var metaOne = [
            {
                title: 'Date Completed',
                value: date
            },
            {
                title: 'Role',
                value: this.state.project.role
            }
        ];

        var metaTwo = [
            {
                title: 'Site URL',
                value: this.state.project.url
            },
            {
                title: 'Tags',
                value: tags
            }
        ];

        return <SingleItem 
            metaOne={metaOne}
            metaTwo={metaTwo}
            title={this.state.project.name}
            content={html}
            loaded={this.state.loaded}
        /> 

    }

});
