require('node-jsx').install(); 
var logger = require('koa-logger');
var route = require('koa-route');
var router = require('koa-router');
var koa = require('koa');
var koaPg = require('koa-pg');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var render = require('./lib/render');
var knex = require('koa-knex');
var passport = require('./lib/auth');
var session = require('koa-generic-session');

var app = koa();

var routes = require('./config/routes');
var database = require('./config/database');
var config = require('./config/app');

app.keys = config.app.keys;

app.use(session({
    key: 'npb.sid'
}));
app.use(bodyParser());


app.use(passport.initialize());
app.use(passport.session());
app.use(router(app));

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

console.log(process.env.NODE_ENV);

app.use(logger());

// Routes
var secured = function *(next) {
    if (this.isAuthenticated()) {
        yield next;
    } else {
        this.redirect('/login');
    }
};

app.get('/', routes.index); 
// Blog post routes
app.get('/posts', routes.posts.index);
app.get('/posts/new', routes.posts.new);
app.get('/posts/:slug', routes.posts.show);
app.get('/posts/:id/edit', routes.posts.edit);
app.post('/posts', routes.posts.create);
app.put('/posts', routes.posts.put);
app.del('/posts', routes.posts.del);

// Project routes
app.get('/projects', routes.projects.index);
app.get('/projects/new', routes.projects.new);
app.get('/projects/:slug', routes.projects.show);
app.get('/projects/:id/edit', routes.projects.edit);
app.post('/projects', routes.projects.create);
app.put('/projects', routes.projects.put);
app.del('/projects', routes.projects.del);

// Admin routes
app.get('/admin', secured, routes.admin.index);
app.get('/login', routes.auth.loginForm);
app.post('/login', routes.auth.login);
app.get('/logout', routes.auth.logout);

// Static files
app.use(serve('.'));


// Listen
app.listen(9000);
console.log('listening on post 9000');
