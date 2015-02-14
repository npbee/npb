/**********
 * Cloud
 **********/
var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {
        }
    },

    componentDidMount: function() {
    },

    render: function() {
        return <div className="cloud">
            {this.props.items.map(function(item) {
                var divStyle = {
                    fontSize: 16 * (1 + (1/item.count))
                };
                return <span
                    style={divStyle}>{item.name}</span>
            })}
        </div>
    }

});
