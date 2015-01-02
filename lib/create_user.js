var bcrypt = require('./bcrypt_thunk.js');
var co = require('co');
var knex = require('./db');

const SALT_WORK_FACTOR = 10;

var args = process.argv;
var pw = args[2];

co(function* () {
    var salt = yield bcrypt.genSalt();
    var hash = yield bcrypt.hash(pw, salt);

    return yield knex('users').insert({
        id: 1,
        name: 'Nick',
        accepting_projects: false,
        admin: true,
        crypted_password: hash,
        email: 'nick@npbee.me',
        created_at: new Date(),
        updated_at: new Date()
    }, 'id');
}).then(function(id) {
    console.log('User created with user_id: ' + id[0]);
    process.exit();
}).catch(function(error) {
    console.error(error);
    process.exit(1);
});


