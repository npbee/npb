var request = require('superagent');
var should = require('should');
var knex = require('../../lib/db');

describe('Authentication routes', function() {
    var user;

    before(function(done) {
        knex('users').where('name', 'Nick').
            then(function(_user) {
                user = _user[0];
                done();
        });
    });

    describe('Admin page', function() {
        it('should only be accessible if logged in', function(done) {
            request.get('localhost:9000/admin')
            .end(function(res) {
                console.log(res.status);

                done();
            });
        });
    });
});
