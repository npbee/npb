'use strict';
var _ = require('lodash');

var env = process.env.NODE_ENV || 'development';
var knexfile = require('../knexfile');

var base = {};

var specific = {
    development: {
        app: {
            keys: ['super-secret-keys']
        },
        db: knexfile.development,
    },
    testing: {
        app: {
            keys: ['testing-keys']
        },
        db: knexfile.testing,
    },
    production: {
        app: {
            key: ['prod-keys']
        },
        db: knexfile.production
    }
};

module.exports = _.merge(base, specific[env]);
