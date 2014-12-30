var database = require('../config/database');

var knex = require('knex')({
    client: 'pg',
    connection: database[process.env.NODE_ENV || 'DEVELOPMENT']
});

module.exports = knex;
