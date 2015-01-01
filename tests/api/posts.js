var request = require('superagent');
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

    it('should retrive all posts', function(done) {
        request.get('localhost:9000/posts')
            .query({
                query: 'isReact'
            })
            .end(function(res) {
                var response = JSON.parse(res.text);
                res.should.exist;
                response.should.have.length(1);
                response[0].should.have.property('title', 'New Title');
                done();
            });
    });

    it('should retrieve a specific post', function(done) {
        request.get('localhost:9000/posts/' + _id)
        .query({
            query: 'isReact'
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            res.should.exist;
            response.should.have.property('title', 'New Title');
            done();
        });
    });

    it('should update a post', function(done) {
        request.put('localhost:9000/posts')
        .send({
            'id': _id,
            'title': 'My Edited Title'
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            res.should.exist;
            response.should.have.property('post_id', _id);
            done();
        });
    });

    it('should create a post', function(done) {
        request.post('localhost:9000/posts')
        .send({
            'title': 'My Second Title',
            'body': 'My second body',
            'slug': 'my-second-title',
            'excerpt': 'The second excerpt',
            published: false,
            created_at: new Date(),
            updated_at: new Date()
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            res.should.exist;
            response.should.have.property('post_id');
            _secondId = response.post_id;
            done();
        });
    });

    it('should delete a post', function(done) {
        console.log(_secondId);
        request.del('localhost:9000/posts')
        .send({
            'id': _secondId
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            res.should.exist;
            response.should.have.property('affected_rows', 1);
            done();
        });
    });

    after(function(done) {
        db('posts')
        .del()
        .then(function() {
            done();
        });
    });

});
