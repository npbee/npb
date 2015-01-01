var knexfile = require('../knexfile');
var config = knexfile[process.env.NODE_ENV || 'development'];
var knex = require('knex')(config);

module.exports = knex;
