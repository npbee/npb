var flash = function() {
  var close = document.querySelector('.flash__close') || null;
  if (close === null) {
    return;
  }

  close.addEventListener('click', function(e) {
    e.preventDefault();
    var parent = this.parentNode;
    parent.classList.add('fade-out');
  });
};

module.exports = flash;
