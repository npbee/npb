var React = require('react');

module.exports = React.createClass({

  render: function() {
    var path = this.props.path;
    var className = this.props.className;
    var title = path.slice(1);
    
    
    return (
      <a href={path} className={className} onClick={this.props.navigate}>{title}</a>
      );
  }


});
