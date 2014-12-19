var React = require('react');

module.exports = React.createClass({

  render: function() {
    var title = this.props.data;
    var className = this.props.className;
    
    
    return (
      <a href={'/' + title} className={className} onClick={this.props.navigate}>{title}</a>
      );
  }


});
