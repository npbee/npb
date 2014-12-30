var request = require('superagent');
var should = require('should');
var db = require('../../lib/db');

describe('Posts API', function() {
    var _id;
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

    it('retrive all posts', function(done) {
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

    after(function(done) {
        db('posts')
        .where('id', _id)
        .del()
        .then(function() {
            done();
        });
    });

});
