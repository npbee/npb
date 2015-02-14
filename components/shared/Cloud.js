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
            {this.props.items.map(function(item, index) {
                var fontSize = item.count ? 16 * (1 + (1/item.count)) : 1;
                var divStyle = {
                    fontSize: fontSize + 'px'
                };
                return <span
                    key={index}
                    style={divStyle}>{item.name}</span>
            })}
        </div>
    }

});
