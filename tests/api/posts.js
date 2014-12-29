var request = require('superagent');
var should = require('should');
var knex = require('../../lib/db');
//console.log(knex);

describe('Posts API', function() {
    var _id;

    it('should create a post', function(done) {
        request.post('localhost:9000/posts')
        .send({
            title: 'My new title',
            body: 'My new body',
            slug: 'the-slug',
            tags: 'tag1, tag2',
            excerpt: 'Super cool excerpt',
            published: false
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            _id = response.postId;
            response.should.have.property('success', true);
            done();
        });
    });

    it('retrive all posts', function(done) {
        request.get('localhost:9000/posts')
            .query({
                query: 'isReact'
            })
            .end(function(res) {
            console.log(res.text);
            res.should.exist;
            res.status.should.be(200);
            done();
        });
    });


    it('should delete a post', function(done) {
        request.del('localhost:9000/posts')
            .send({
                id: _id
            })
            .end(function(res) {
                done();
            });
    });
});
