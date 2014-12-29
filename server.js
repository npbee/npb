require('node-jsx').install();

var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var koaPg = require('koa-pg');
var parse = require('co-body');
var serve = require('koa-static');
var render = require('./lib/render');
var knex = require('koa-knex');

var app = koa();

var routes = require('./config/routes');

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

app.use(logger());

// Database
app.use(knex({
    client: 'pg',
    //connection: 'postgres://nick@localhost:5432/npb.com_dev'
    connection: {
        host: 'localhost',
        user: 'nick',
        password: '',
        database: 'npb.com_dev'
    }
}));


// Routes
app.use(route.get('/', routes.index));

// Blog post routes
app.use(route.get('/posts', routes.posts.index));
app.use(route.get('/posts/new', routes.posts.new));
app.use(route.get('/posts/:slug', routes.posts.show));
app.use(route.get('/posts/:id/edit', routes.posts.edit));
app.use(route.post('/posts', routes.posts.create));
app.use(route.post('/posts/:id', routes.posts.put));
// app.use(route.post('/posts/:id', put));
// Delete?
// app.use(route.post('/posts/:id', put));

// Project routes
app.use(route.get('/projects', routes.projects.index));
app.use(route.get('/projects/:slug', routes.projects.show));

// Static files
app.use(serve('.'));

function *add() {
    this.body = yield render('new');
}

function *show(id) {
    var query = 'SELECT * FROM posts where ID = ' + id;
    var result = yield this.pg.db.client.query_(query);
    this.body = yield render('show', { post: result.rows[0] });
}

function *edit(id) {
    var query = 'SELECT * FROM posts where ID = ' + id;
    var results = yield this.pg.db.client.query_(query);
    var post = results.rows[0];
    if (!post) this.throw(4040, 'invalid post id');
    this.body = yield render('edit', { post: post });
}

function *create() {
    var post = yield parse(this);
    post.id = 10;
    post.created_at = new Date();
    post.updated_at = new Date();
    post.user_id = 1;
    post.published = false;

    var statement = 'INSERT INTO posts (id, title, body, created_at, updated_at, slug, user_id, excerpt, published)' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

    this.pg.db.client.query_(statement, [
            post.id,
            post.title,
            post.body,
            post.created_at,
            post.updated_at,
            post.slug,
            post.user_id,
            post.excerpt,
            post.published
        ]);

    // var id = posts.push(post) - 1;
    // post.created_at = new Date;
    // post.id = id;
    this.redirect('/posts');
}


// Listen
app.listen(9000);
console.log('listening on post 9000');
