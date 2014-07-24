/****
 * Checks if a page is an admin page
****/
define([], function() {
  var is_admin = function() {
    if ( window.npb && window.npb.admin ) {
      return true;
    } else {
      return false;
    }
  };

  return is_admin;
});
