var ajax = require('./ajax');
var upto = require('./upto');

var delete_method = function() {
  var buttons = document.querySelectorAll('[data-method="delete"]');
  var url;

  if (!buttons.length) {
    return;
  }

  /*jshint -W083 */
  for (var b = 0, len = buttons.length; b < len; b += 1) {
    var button = buttons[b];
    button.addEventListener('click', function(e) {
      console.log('clicked');
      var self = this;
      url = this.pathname; 
      e.preventDefault();
      if (confirm('Are you sure?')) {
        ajax.post(url, {
          _method: 'delete'
        },
        function() {
          var elToRemove = upto(self, self.getAttribute('data-remove'));
          elToRemove.classList.add('deleted');
        }
        );
      }
    });
  }
  /*jshint +W083 */
};

module.exports = delete_method;
