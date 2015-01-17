var React = require('react');
var NavItem = require('./NavItem.react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selected: 'home',
      items: ['projects', 'posts', 'connect'],
      isOpen: false,
      isClosed: true,
      isFirstLoad: true
    }
  },

  render: function() {
    var selected = this.props.selected || this.state.selected;
    var self = this;
    var isAuthenticated = this.props.isAuthenticated;
    var _className;
    
    if (this.state.isOpen) {
        _className = 'main-nav main-nav--open';
    } else if (this.state.isClosed && !this.state.isFirstLoad) {
        _className =  'main-nav main-nav--closed';
    } else if (this.state.isFirstLoad) {
        _className = 'main-nav';
    }

    return (
      <nav className={_className} >
          <a href="/" className="site-logo"><img className="icon" src="/static/images/logo.svg" /></a>
          {this.state.items.map(function(result) {
              var className = result === selected ? 'active' : '';
              return <NavItem 
                  key={result} 
                  data={result} 
                  className={className} 
                  navigate={self.handleClick} />;
          })}
          <a className="main-nav__toggle" onClick={this.toggleNav}><img className="icon" src="/static/images/icons/icomoon/list.svg" /></a>
          <div className="main-nav__social main-nav__break-right">
              <a className="main-nav__break-right"><img className="icon" src="/static/images/icons/icomoon/twitter.svg" /></a>
              <a className=""><img className="icon" src="/static/images/icons/icomoon/mail.svg" /></a>
              <a className=""><img className="icon" src="/static/images/icons/github/mark.svg" /></a>
          </div>
          {isAuthenticated ? <a href='/logout'>Logout</a> : ''}
      </nav>
      )
  },

  toggleNav: function(e) {
      this.setState({
          isOpen: !this.state.isOpen,
          isClosed: !this.state.isClosed,
          isFirstLoad: false
      });
  }
});
