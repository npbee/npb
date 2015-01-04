var app = require('../../server');
var request = require('co-supertest').agent(app.listen());
var should = require('should');
var knex = require('../../lib/db');
var bcrypt = require('bcrypt');
var login = require('../helpers/login');

describe('Authentication routes', function() {
    var user;

    before(function(done) {
        var pw = 'test';
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pw, salt);

        var userId = knex('users').insert({
            id: 1,
            name: 'Nick',
            accepting_projects: false,
            admin: true,
            crypted_password: hash,
            email: 'nick@test.com',
            created_at: new Date(),
            updated_at: new Date()
        }, 'id')
        .then(function(id) {
            return knex('users').where('name', 'Nick')
        })
        .then(function(_user) {
            user = _user[0];
            done();
        });

    });

    context('When not logged in', function() {

        describe('the admin page', function() {
            it('should only be accessible if logged in', function *() {
                var res = yield request.get('/admin').expect(302).end();
            });
        });
    });

    context('when logged in', function() {

        before(function *() {
            var res = yield request.post('/login')
            .send({
                username: 'Nick',
                password: 'test',
            })
            .end();
        });

        it('should display the contents of the page', function *() {
            var res = yield request.get('/admin').expect(200).end();
        });
    });

    after(function(done) {
        knex('users').del()
        .then(function() {
            done();
        });
    });
});
