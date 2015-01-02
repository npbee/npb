var passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;
var co = require('co');
var knex = require('./db');
var bcrypt = require('./bcrypt_thunk.js');

var user = {
    id: 1,
    username: 'test'
};


function matchUser(username, password) {
    return new Promise(function(resolve, reject) {
        var _user;

        knex('users').where('name', username)
        .then(function(user) {
            _user = user[0];
            if (!_user) {
                reject('Could not find user.');
            }
            return bcrypt.compare(password, _user.crypted_password);
        })
        .then(function(match) {
            if (match) {
                resolve(_user);
            } else {
                reject('Passwords do not match.');
            }
        })
        .catch(function(err) {
            reject(err);
        });

    });
}


function AuthLocalUser(username, password, done) {

    co(function *() {
        return yield matchUser(username, password);
    }).then(function(user) {
        done(null, user);
    }, function(err) {
        done(null, false);
    });
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
