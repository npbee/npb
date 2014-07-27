function domready(cb) {
  var ready = false;
  var timer;

  function checkReady() {

    if (document.readyState === 'complete') {
      ready = true;
    }

    if (ready) {
      clearTimeout(timer);
      cb();
    } else {
      timer = setTimeout(checkReady, 100);
    }
  }

  checkReady();
}


module.exports = domready;
