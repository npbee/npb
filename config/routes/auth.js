var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var passport = require('../../lib/auth');

exports.loginForm = function *() {
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var data = {
        path: '/login',
        history: true
    };

    var markup = React.renderToString(
        <App data={data} history="true" path="/login" />
    );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });
};

exports.login = passport.authenticate('local', {
    successRedirect: '/?error=false',
    failureRedirect: '/?error=true'
});

