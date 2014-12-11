
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var koaPg = require('koa-pg');
var render = require('./lib/render');

var app = koa();


// Middleware
app.use(logger());
app.use(koaPg('postgres://nicholaspball@localhost:5432/npb'));


// Routes
app.use(route.get('/posts', list));
app.use(route.get('/posts/:id', show));
app.use(route.get('/posts/new', add));
// app.use(route.get('/posts/:id/edit', edit));
app.use(route.post('/posts', create));
// app.use(route.post('/posts/:id', put));
// Delete?
// app.use(route.post('/posts/:id', put));


// Route handlers
function *list() {
    var posts = yield this.pg.db.client.query_('SELECT * from POSTS');
    this.body = yield render('list', { posts: posts.rows });
}

function *add() {
    console.log('here?');
    this.body = yield render('new');
}

function *show(id) {
    var query = 'SELECT * FROM posts where ID = ' + id;
    var result = yield this.pg.db.client.query_(query);
    this.body = yield render('show', { post: result.rows[0] });
}

function *edit(id) {
    // var post = posts[id];
    // if (!post) this.throw(4040, 'invalid post id');
    this.body = 'Show a post';
}

function *create() {
    var post = yield parse(this);
    console.log(post);
    // var id = posts.push(post) - 1;
    // post.created_at = new Date;
    // post.id = id;
    // this.redirect('/');
}


// Listen
app.listen(3000);
console.log('listening on post 3000');