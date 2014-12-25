'use strict';
var root = require('path').normalize(__dirname + '/..');

module.exports = {
  paths: {
    'in': {
      app: root + './app.js'
    },
    out: {
      build_js: root + '/static',
      static: root + '/static',
    },
    toWatch: [root + '/src/**/*.js', root + '/config/*.js', root + '/server.js', root + '/lib/*.js']
  }
};
