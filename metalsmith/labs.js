const START_CUT = '<!-- CUT -->';
const END_CUT = '<!-- /CUT -->';
const PASTE = '<!-- PASTE -->';

module.exports = function(root) {
    return function (files, metalsmith, done) {
        var startRegex = new RegExp('[\\s\\S]*' + START_CUT, 'g');
        var endRegex = new RegExp(END_CUT + '[\\s\\S]*', 'g');

        var originalIndex = files['index.html'];
        var indexContent = originalIndex.contents.toString();

        indexContent = indexContent.replace(startRegex, '');
        indexContent = indexContent.replace(endRegex, '');
        indexContent = indexContent.trim();

        var originalMd = files['readme.md'];
        var mdContent = originalMd.contents.toString();

        mdContent = mdContent.replace(PASTE, indexContent);

        delete files['index.html'];
        delete files['readme.md'];

        files['index.md'] = {
            contents: new Buffer(mdContent),
            layout: root + '/layouts/lab.html'
        };

        done();
    };
};
