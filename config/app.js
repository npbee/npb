'use strict';
var _ = require('lodash');

var env = process.env.NODE_ENV || 'development';

var base = {};

var specific = {
    development: {
        app: {
            keys: ['super-secret-keys']
        }
    },
    testing: {
        app: {
            keys: ['testing-keys']
        }
    }
};

module.exports = _.merge(base, specific[env]);
