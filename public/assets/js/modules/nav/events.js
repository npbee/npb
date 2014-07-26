var hammer = require('../../libs/hammer');

var events = {

  init: function() {

    var toggle = document.getElementById('toggle-container'),
    navEl = document.getElementById('nav-container'),
    opts = ['click', 'dragright', 'dragleft'],
    len = opts.length;

    for (var i = 0; i < len; i++) {
      this.handleEvents(toggle, navEl, opts[i]);
    }
  },

  handleEvents: function(toggle, navElem, option) {

    switch (option) {

      case 'click':
        toggle.addEventListener('click', function(event) {
          if (navElem.classList.contains('nav--open')) {
            events.close(toggle,navElem);
          } else {
            events.open(toggle, navElem);
          }
          event.preventDefault();
        });
        break;

      case 'dragright':
        events.doHammer(toggle, 'drag_block_vertical' ,'dragright', open, toggle, navElem);
        break;

      case 'dragleft':
        var content = document.getElementById('content');
        var closeTriggers = [toggle, navElem, content],
            l = closeTriggers.length;

        for ( var t = 0; t< l; t ++ ) {
          events.doHammer(closeTriggers[t],'drag_block_vertical', 'dragleft', close, toggle, navElem);
        }
        break;

      case 'tap':
        events.doHammer(content, 'drag_block_vertical', 'tap', close, toggle, navElem);
        break;

      default:
        break;
    }

  },

  open: function (toggle, navElem, option) {
    toggle.classList.remove('nav--closed');
    toggle.classList.add('nav--open');
    navElem.classList.remove('nav--closed');
    navElem.classList.add('nav--open');
  },

  close: function (toggle, navElem) {
    toggle.classList.remove('nav--open');
    toggle.classList.add('nav--closed');
    navElem.classList.add('nav--closed');
    navElem.classList.remove('nav--open');
  },

  doHammer: function (item,settings, eventType, callback, toggle, navElem) {
    hammer(item, {
      //"drag_block_vertical" : true
    }).on(eventType, function(e) {
      e.preventDefault();
      callback(toggle, navElem);
    });
  }

};

module.exports = events;
