var React = require('react'); var navigate = require('react-mini-router').navigate;
var TagForm = require('./form');
var request = require('superagent');
var _ = require('lodash');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            hasErrors: false,
            errors: {},
            tag: this.props.tag || {},
            loaded: false
        };
    },

    componentDidMount: function() {
        var self = this;
        
        if (!Object.keys(this.state.tag).length) {
           request.get('/tags/' + this.props.slug)
            .query({
                isClient: true
            })
            .end(function(res) {
                self.setState({
                    tag: JSON.parse(res.text).tag,
                    loaded: true
                });
            });
       }
    },

    render: function(){
        return (
            <section className="tag">
                <h1>New Post</h1>
                <TagForm 
                    tag={this.state.tag} 
                    onChange={this.handleChange}
                    method="put"
                    action="/tags" />
            </section>
        );
    },

    handleChange: function(event) {
        var attr = event.target.name;
        var value = event.target.value;
        
        var newData = {};
        newData[attr] = value;

        var previousState = this.state.tag;
        var newState = _.assign(previousState, newData);

        this.setState({
            tag: newState
        });

    }

    
});
