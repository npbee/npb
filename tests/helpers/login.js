var superagent = require('superagent');
var agent = superagent.agent();

var creds = {
    'username': 'Nick',
    'password': 'test'
};

exports.login = function(request, done) {
    request.post('/login')
    .send(creds)
    .end(function(err, res) {
        if (err) {
            throw err;
        }
        agent.saveCookies(res);
        done(agent);
    });
};
