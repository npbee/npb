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
                var fontSize = item.count ? 1 * (1 + (1/item.count)) : 1;
                var divStyle = {
                    fontSize: fontSize + 'em'
                };
                return <a
                    style={divStyle}
                    key={item.id}
                    href={'/' + this.props.kind + '/' + item.name}>{item.name}</a>
            }, this)}
        </div>
    }

});
