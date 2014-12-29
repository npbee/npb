var database = require('../config/database');

exports.koaKnex = require('koa-knex')({
    client: 'pg',
    //connection: 'postgres://nick@localhost:5432/npb.com_dev'
    connection: database[process.env.NODE_ENV || 'DEVELOPMENT']
});

exports.knex = require('knex')({
    client: 'pg',
    connection:  database[process.env.NODE_ENV || 'DEVELOPMENT']
});
