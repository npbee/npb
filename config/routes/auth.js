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

exports.login = function*(next) {
    var ctx = this;
    yield passport.authenticate('local', function *(err, user) {
        if (err) throw err;
        var isClient = ctx.request.url.indexOf('isClient') !== -1;

        if (isClient) {
            if (err) {
                ctx.body = {
                    success: false,
                    errors: JSON.stringify(err) 
                };
            }

            if (!user) {
                ctx.body = {
                    success: false,
                    errors: [
                        { error: "Invalid Login" }
                    ]
                };
            } else {

                yield ctx.login(user);

                ctx.body = {
                    success: true
                };
            }
        } else {
            if (err) {
                ctx.redirect('/login');
            }
            if (!user) {
                ctx.redirect('/login');
            }
            ctx.login(user, {}, function(err) {
                ctx.redirect('/admin');
            });
        }
    });
};


exports.logout = function *(){
    this.logout();
    this.redirect('/');
};
