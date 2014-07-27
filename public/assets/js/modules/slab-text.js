/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/

var debounce = require('../utils/debounce');

var slabText = {

  init: function() {
    var selector = document.querySelector('.headline');
    var max = 2000;

    if ( selector ) {
      this.slabtext(selector, max);
    }
  },

  slabtext: function(selector, max) {

    // Define the slab text function
    function slabify() {

      var parent = selector.parentNode,
                   parent_width,
                   headline_width,
                   original_font_size,
                   ratio,
                   new_font_size,
                   buffer;

      // Set the selector back to display inline so we can get a proper width
      selector.style.display = 'inline';
      //selector.style.whiteSpace = 'nowrap';

      // Get the width and padding of the parent,
      // then convert to integers
      parent_width = parent.clientWidth;
      buffer = Math.min( parent_width / 20 );

      // Get the width of the headline
      headline_width = selector.offsetWidth;

      // Get font sizes
      original_font_size = parseInt(window.getComputedStyle(selector, null).getPropertyValue('font-size') || selector.currentStyle.fontSize, 10);

      // Compute ratio
      // A little extra buffer on the sides for good measure
      ratio = ( parent_width - buffer ) / headline_width;

      // New font size
      new_font_size = Math.min(original_font_size * ratio).toPrecision(3);

      // Set the new font size based on the ratio
      selector.style.fontSize = new_font_size > max ? max + 'px' : new_font_size + 'px';

      // Set the selector back to display block so we can center it
      selector.style.display = 'block';

    }


    // Use debounce util to run the slabify function on resize
    debounce('resize', slabify, 300 );

    // We only need to run this function on page load, not on resize
    var firstWordLength = (function() {

      // Get the words in the headline
      var word_count = selector.innerHTML.split(' '),
        first_word = word_count[0];

    // If the first word is less than 4 characters
    // Set the white space to no wrap ( mostly a fix for "S. Carey" )
    // Because it always breaks it up into two lines
    if ( first_word.length <= 5 && word_count.length <= 2 ) {
      selector.style.whiteSpace = 'nowrap';
    }
    })();

    // Run on first load
    slabify();

  }

};

module.exports = slabText;
