var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            tags: this.props.tags || []
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
            {this.state.tags.map(function(tag) {
                var count = tag.count > 1 ? `${tag.count} tags` : `${tag.count} tag`;
                return <Snippet key={tag.id} title={count} tagline={tag.name} url={'/tags/' + tag.name} />
            })}
            </section>
        )

    }

});
