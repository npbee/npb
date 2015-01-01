require('node-jsx').install();

var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var koaPg = require('koa-pg');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var render = require('./lib/render');
var knex = require('koa-knex');
var passport = require('./lib/auth');

var app = koa();
app.use(bodyParser());

var routes = require('./config/routes');
var database = require('./config/database');

app.use(passport.initialize());

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
        console.log('authenticated');
        yield next;
    } else {
        this.status = 401;
    }
};

app.use(route.get('/', routes.index));

// Blog post routes
app.use(route.get('/posts', routes.posts.index));
app.use(route.get('/posts/new', routes.posts.new));
app.use(route.get('/posts/:slug', routes.posts.show));
app.use(route.get('/posts/:id/edit', routes.posts.edit));
app.use(route.post('/posts', routes.posts.create));
app.use(route.put('/posts', routes.posts.put));
app.use(route.del('/posts', routes.posts.del));

// Project routes
app.use(route.get('/projects', routes.projects.index));
app.use(route.get('/projects/new', routes.projects.new));
app.use(route.get('/projects/:slug', routes.projects.show));
app.use(route.get('/projects/:id/edit', routes.projects.edit));
app.use(route.post('/projects', routes.projects.create));
app.use(route.put('/projects', routes.projects.put));
app.use(route.del('/projects', routes.projects.del));

// Admin routes
app.use(route.get('/login', routes.auth.loginForm));
app.use(route.post('/login', routes.auth.login));


// Static files
app.use(serve('.'));


// Listen
app.listen(9000);
console.log('listening on post 9000');
