var hammer = require('../libs/hammer');
var breakpoint = require('../utils/breakpoint');

function carousel() {
  var carousel_el = document.getElementById('carousel'),
      rotate_button = document.getElementById('carousel__control'),
      rotation = 0,
      didResize = false,
      i;

  if ( rotate_button ) {
    rotate_button.addEventListener('click', function(e) {
      e.preventDefault();
      rotate(120);
    }, false);
  }


  function rotate(deg) {
    rotation += deg;
    carousel_el.style.webkitTransform = 'rotateY(' + rotation + 'deg)';
    carousel_el.style.mozTransform = 'rotateY(' + rotation + 'deg)';
    carousel_el.style.msTransform = 'rotateY(' + rotation + 'deg)';
    carousel_el.style.oTransform = 'rotateY(' + rotation + 'deg)';
    carousel_el.style.transform = 'rotateY(' + rotation + 'deg)';
  }


  /****
   * Use match media to remove rotation if resizing
   ****/
  function removeRotation (mediaQueryList) {
    carousel_el.style.webkitTransform = 'rotateY(0deg)';
    carousel_el.style.mozTransform = 'rotateY(0deg)';
    carousel_el.style.msTransform = 'rotateY(0deg)';
    carousel_el.style.oTransform = 'rotateY(0deg)';
    carousel_el.style.transform = 'rotateY(0deg)';
  }

  breakpoint.desk.addListener(removeRotation);

}

module.exports = carousel;
