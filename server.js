require('node-jsx').install();

var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var koaPg = require('koa-pg');
var parse = require('co-body');
var serve = require('koa-static');
var render = require('./lib/render');

var app = koa();


var routes = require('./config/routes');


// Middleware
app.use(logger());
app.use(koaPg('postgres://nick@localhost:5432/npb.com_dev'));

app.use(function *(next) {
  if ('POST' != this.method) return yield next;
  var body = yield parse(this, { limit: '1kb' });
  if (!body.name) this.throw(400, '.name required');
  this.body = { name: body.name.toUpperCase() };
});

// Routes
app.use(route.get('/', routes.index));
app.use(route.get('/posts', routes.posts));
app.use(route.get('/posts/new', add));
app.use(route.get('/posts/:id', show));
app.use(route.get('/posts/:id/edit', edit));
app.use(route.post('/posts', create));
// app.use(route.post('/posts/:id', put));
// Delete?
// app.use(route.post('/posts/:id', put));

app.use(serve('.'));

// Route handlers
function *list() {
    var posts = yield this.pg.db.client.query_('SELECT * from POSTS');
    this.body = yield render('list', { posts: posts.rows });
}

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
