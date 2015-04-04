var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');
var Cloud = require('../shared/Cloud');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            tags: this.props.tags || [],
            tagId: null,
            savedTags: this.props.tags || []
        };
    },

    componentDidMount: function() {
        var self = this;

        request.get('/tags')
        .query({isClient: true})
        .end(function(res) {
            self.setState({
                tags: JSON.parse(res.text).tags
            });
        });
    },

    render: function(){
        return (
            <section className="tags center">
                <h1>Tags</h1>
                <Cloud
                    items={this.state.tags}
                    kind="tags"
                />
            </section>
        )

    }

});
