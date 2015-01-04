var config = require('../config/app');
var knex = require('knex')(config.db);

module.exports = knex;
