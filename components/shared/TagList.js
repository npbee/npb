var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            tags: this.props.tags
        };
    },

    componentWillReceiveProps: function(props) {
        this.setState({
            tags: props.tags
        });
    },

    render: function() {
        return <div className="tag-list">
            {this.state.tags.map(function(tag, index) {
                var cls = tag._delete ? 'tag tag--delete' : 'tag';
                return <a 
                    className={cls}
                    onClick={this.flagTagForDelete.bind(this, index)} key={index}>{tag.name}</a>;
            }, this)}
        </div>;
    },

    
    flagTagForDelete: function(i) {
        var tag = this.state.tags[i];

        // Tag has an id and not already flagged for deletion, then it needs to be deleted
        if (tag.id && !tag._delete) {
            _.extend(tag, { _delete: true });
        } else if (tag.id && tag._delete) {
            tag._delete = false;
        } else if (!tag.id) {
            this.state.tags.splice(i, 1);
        }

        this.setState({
            tags: this.state.tags
        });

        this.props.onTagChange(this.state);
    }

});
