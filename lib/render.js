var views = require('co-views');
var _ = require('lodash');

var baseData = {
    year: new Date()
};

var render = views(__dirname + '/../views', {
	map: { html: 'swig' },
    cache: 'memory'
});

module.exports = function(template, data) {
    var _data = _.assign({}, baseData, data);
    return render(template, _data);
};
