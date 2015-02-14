var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');
var Cloud = require('../shared/Cloud');
var TagQuickView = require('./quickView');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            tags: this.props.tags || [],
            tag: {},
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
            <section className="tags">
                <h1>Tags</h1>
                <Cloud 
                    items={this.state.tags}
                    onItemClick={this.onCloudItemClick} />
                <TagQuickView
                    tag={this.state.tag}
                />
                <a onClick={this.resetCloud}>Back</a>
            </section>
        )

    },

    onCloudItemClick: function(tag) {
        this.setState({
            tags: [],
            tag: tag
        });
    },

    resetCloud: function() {
        this.setState({
            tags: this.state.savedTags,
            tag: {}
        });
    }

});
