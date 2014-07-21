define([], function() {
  var upto = function(el, tagName) {
    tagName = tagName.toLowerCase();

    do {
      el = el.parentNode;
      if (el.tagName.toLowerCase() == tagName) {
        return el;
      }
    } while (el.parentNode)

  }

  return upto;
});
