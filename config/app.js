'use strict';
var _ = require('lodash');

var env = process.env.NODE_ENV || 'development';

var base = {};

var specific = {
    development: {
        app: {
            keys: ['super-secret-keys']
        },
        db: {
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'nick',
                password: '',
                database: 'npb.com_dev'
            },
            pool: {
                max: 10
            },
            migrations: {
                tableName: 'knex_migrations'
            }
        }
    },
    testing: {
        app: {
            keys: ['testing-keys']
        },
        db: {
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'nick',
                password: '',
                database: 'npb.com_test'
            },
            migrations: {
                tableName: 'knex_migrations'
            }
        },

    }
};

module.exports = _.merge(base, specific[env]);
