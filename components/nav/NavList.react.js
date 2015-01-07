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
    var isAuthenticated = this.props.isAuthenticated;

    return (
      <nav className="main-nav">
          <a href="/" className="site-logo"><img src="/static/images/logo.svg" /></a>
          <div className="main-nav__menu">
          {this.state.items.map(function(result) {
              var className = result === selected ? 'active' : '';
              return <NavItem 
                  key={result} 
                  data={result} 
                  className={className} 
                  navigate={self.handleClick} />;
          })}
          </div>
          <div className="main-nav__social">
              <a>Twitter</a>
              <a>Email</a>
              {isAuthenticated ? <a href='/logout'>Logout</a> : ''}
          </div>
          <a className="main-nav__toggle"><img src="/static/images/icons/core/menu.svg" /></a>
      </nav>
      )
  },

  handleClick: function(e) {
  }
});
