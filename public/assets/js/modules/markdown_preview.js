/****
 * Markdown preview
****/
define(['libs/markdown'], function(markdown) {

  function Editor(input, preview) {
    this.update = function() {
      preview.innerHTML = markdown.toHTML(input.value);
      this.matchHeights(input, preview);
    };
    this.matchHeights = function(input, preview) {
      var inputHeight = input.clientHeight;
      var previewHeight = preview.clientHeight;
      if (inputHeight < previewHeight) {
        input.style.height = previewHeight + 'px';
      }
    };
    input.editor = this;
    this.update();
  }


  var markdown_preview = function() {
    var text_input = document.getElementById('editor__raw__input');
    var text_preview = document.getElementById('editor__preview__text');
    new Editor(text_input, text_preview);
  };

  return markdown_preview;
});

