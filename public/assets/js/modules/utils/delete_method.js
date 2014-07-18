define(['modules/utils/ajax'], function(ajax) {
  
  var delete_method = function() {
    var button = document.querySelector('[data-method="delete"]');
    var url;

    if (!button) return;
    
    button.addEventListener('click', function(e) {
      url = this.pathname; 
      e.preventDefault();
      if (confirm('Are you sure?')) {
        console.log(this.parentNode);
        this.parentNode.removeChild(this);
        ajax.post(url, {
          _method: 'delete'
        },
          function() {
            this.parentNode.removeChild(this);
          }
        );
      }
    });
  }

  return delete_method;
});
