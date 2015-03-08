'use strict';
var _ = require('lodash');

module.exports = {
    development: {
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
        },
        seeds: {
            directory: './config/seeds'
        }
    },
    testing: {
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
    production: {
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
        },
        seeds: {
            directory: './config/seeds'
        }
    }
};
