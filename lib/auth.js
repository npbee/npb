'use strict';

var passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;
var co = require('co');
var knex = require('./db');

var user = {
    id: 1,
    username: 'test'
};

function AuthLocalUser(username, password, done) {

    if (username === 'test' && password === 'test') {
        return done(null, user);
    } else {
        return done(null, false);
    }
    return;
    co(function *() {
        try {
            return yield knex('users').where('name', username);
        } catch(ex) {
            return null;
        }
    })(done);
};

var serialize = function(user, done) {
    done(null, user.id);
};

var deserialize = function(id, done) {
    done(null, user);
};

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
passport.use(new LocalStrategy(AuthLocalUser));

module.exports = passport;
