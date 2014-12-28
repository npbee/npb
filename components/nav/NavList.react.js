var React = require('react');
var NavItem = require('./NavItem.react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selected: 'home',
        items: ['projects', 'posts', 'connect']
    }
  },

  render: function() {
    var selected = this.props.selected || this.state.selected;
    var self = this;

    return (
      <nav>
      <a href="/">Logo</a>
      {this.state.items.map(function(result) {
        var className = result === selected ? 'active' : '';
        return <NavItem 
          key={result} 
          data={result} 
          className={className} 
          navigate={self.handleClick} />;
      })}
      </nav>
      )
  },

  handleClick: function(e) {
  }
});