var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var passport = require('../../lib/auth');
var normalize = require('../routeHelpers/normalizeAPIResponse');

exports.loginForm = function *() {
    var isClient = this.request.url.indexOf('isClient') !== -1;

    var data = yield normalize({
        path: '/login',
        req: this
    });

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


exports.logout = function *(){
    this.logout();
    this.redirect('/');
};
