var app = require('../../server');
//var request = require('co-supertest').agent(app.listen());
//var request = require('superagent');
var should = require('should');
var knex = require('../../lib/db');
var bcrypt = require('bcrypt');
var co = require('co');

var pw = 'password';
var uname ='nick';
var email = 'nick@test.com';

module.exports = {
    create: function() {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pw, salt);

        return new Promise(function(resolve, reject) {

            return knex('users').insert({
                id: 1,
                name: uname,
                accepting_projects: false,
                admin: true,
                crypted_password: hash,
                email: email,
                created_at: new Date(),
                updated_at: new Date()
            }, 'id')
            .then(function(id) {
                return knex('users').where('name', 'Nick')
            })
            .then(function(userArr) {
                resolve(userArr[0]);
            });

        });
    },

    destroy: function() {
        return knex('users').del();
    },

    login: function (request) {
        return new Promise(function(resolve, reject) {
            request.post('/login')
            .query({
                isClient: true
            })
            .send({
                username: uname,
                password: pw
            })
            .end(resolve);
        });
    }
};
