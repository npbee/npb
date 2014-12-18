var React = require('react');

module.exports = React.createClass({

  render: function() {
    var title = this.props.data;
    var className = this.props.className;
    
    
    return (
      <a className={className} onClick={this._onClick}>{title}</a>
      );
  },

  _onClick: function() {
    console.log('clicked');
  }

});
