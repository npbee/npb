var app = require('../../server');
var request = require('co-supertest').agent(app.listen());
var should = require('should');
var db = require('../../lib/db');

describe('Posts API', function() {
    var _id;
    var _secondId;

    before(function(done) {
        db('posts').insert({
            title: 'New Title',
            body: 'New body',
            slug: 'the-slug',
            excerpt: 'excerpt',
            published: false,
            created_at: new Date(),
            updated_at: new Date()
        }, 'id')
        .then(function(id) {
            _id = id[0];
            done();
        });
    });

    it('should retrive all posts', function *() {
        var res = yield request.get('/posts')
            .query({
                query: 'isReact'
            })
            .end();

       var response = JSON.parse(res.text);
       response.should.have.length(1);
       response[0].should.have.property('title', 'New Title');
    });

    it('should retrieve a specific post', function *() {
        var res = yield request.get('/posts/' + _id)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text);
        response.should.have.property('title', 'New Title');
    });

    it('should update a post', function *() {
        var res = yield request.put('/posts')
        .send({
            'id': _id,
            'title': 'My Edited Title'
        })
        .end();

        var response = JSON.parse(res.text);
        res.should.exist;
        response.should.have.property('post_id', _id);
    });

    it('should create a post', function *() {
        var res = yield request.post('/posts')
            .send({
                'title': 'My Second Title',
                'body': 'My second body',
                'slug': 'my-second-title',
                'excerpt': 'The second excerpt',
                published: false,
                created_at: new Date(),
                updated_at: new Date()
            })
            .end();

       var response = JSON.parse(res.text);
       response.should.have.property('post_id');
       _secondId = response.post_id;
    });

    it('should delete a post', function *() {
        var res = yield request.del('/posts')
            .send({
                'id': _secondId
            })
            .end();

        var response = JSON.parse(res.text);
        response.should.have.property('affected_rows', 1);
    });

    after(function(done) {
        db('posts')
        .del()
        .then(function() {
            done();
        });
    });

});
