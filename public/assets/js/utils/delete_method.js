var ajax = require('./ajax');
var upto = require('./upto');

var delete_method = function() {
  var button = document.querySelector('[data-method="delete"]');
  var url;

  if (!button) {
    return;
  }

  button.addEventListener('click', function(e) {
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
};

module.exports = delete_method;
