var ajax = {};

var csrf = document.querySelector('meta[name="csrf-token"]');
if (!csrf) {
  throw new Error('The page needs the csrf token');
}

ajax.x = function() {
  return new XMLHttpRequest();
};

ajax.send = function(url, callback, method, data, sync) {
  var x = new XMLHttpRequest();
  x.open(method, url, sync);
  x.onreadystatechange = function() {
    if (x.readyState === 4) {
      callback(x.responseText);
    }
  };
  if (method === 'POST') {
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    x.setRequestHeader('X-CSRF-Token', csrf.getAttribute('content'));
  }
  x.send(data);
};

ajax.post = function(url, data, callback, sync) {
  var query = [];
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  ajax.send(url, callback, 'POST', query.join('&'), sync);
};

module.exports = ajax;
