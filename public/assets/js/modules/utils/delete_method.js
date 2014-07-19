define(['modules/utils/ajax', 'modules/utils/upto'], function(ajax, upto) {
  
  var delete_method = function() {
    var button = document.querySelector('[data-method="delete"]');
    var url;

    if (!button) return;
    
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
  }

  return delete_method;
});
