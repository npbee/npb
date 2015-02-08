var app = require('../../server');
var request = require('co-supertest').agent(app.listen());
var should = require('should');
var db = require('../../lib/db');
var _ = require('lodash');

describe('Posts API', function() {
    var _id;
    var _tag;
    var _secondId;
    var _secondTag;

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
            return db('tags').insert({
                name: 'testing',
                created_at: new Date(),
                updated_at: new Date()
            }, 'id');
        }).then(function(tagId) {
            return db('tag_relationships').insert({
                reference_id: _id,
                reference_type: 'post',
                tag_id: tagId[0],
                created_at: new Date(),
                updated_at: new Date()
            });
        }).then(function() {
            done();
        });
    });

    it('should retrive all posts', function *() {
        var res = yield request.get('/posts')
            .query({
                query: 'isClient'
            })
            .end();

       var response = JSON.parse(res.text).posts;
       response.should.have.length(1);
       response[0].should.have.property('title', 'New Title');
    });

    it('should retrieve a specific post', function *() {
        var res = yield request.get('/posts/' + _id)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text).post;
        response.should.have.property('title', 'New Title');

        _tag = response.tags[0];
        response.tags[0].should.have.property('name', 'testing');
    });

    it('should update a post', function *() {
        var extended = [].concat(_tag, { name: "Second tag" });

        var res = yield request.put('/posts')
        .send({
            'id': _id,
            'title': 'My Edited Title',
            'tags': extended
        })
        .end();

        var response = JSON.parse(res.text);
        res.should.exist;
        response.should.have.property('post_id', _id);
    });

    it('should not duplicate the tags', function *() {
        var res = yield request.get('/posts/' + _id)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text);
        _secondTag = response.post.tags[1];
        response.post.tags[0].name.should.equal('testing');
    });

    it('should allow for removal of a tag', function *() {
        var removedTag = _.extend(_tag, { _delete: true });
        var req = yield request.put('/posts')
        .send({
            'id': _id,
            'tags': [removedTag, _secondTag]
        })
        .end();

        var res = yield request.get('/posts/' + _id)
        .query({
            query: 'isClient'
        }).end();

        var response = JSON.parse(res.text);
        response.post.tags.should.have.length(1);
        response.post.tags[0].name.should.equal("Second tag");
    });

    it('should create a post', function *() {
        var res = yield request.post('/posts')
            .send({
                'title': 'My Second Title',
                'body': 'My second body',
                'slug': 'my-second-title',
                'excerpt': 'The second excerpt',
                tags: 'javascript, ruby',
                published: false,
                created_at: new Date(),
                updated_at: new Date()
            })
            .end();

       var response = JSON.parse(res.text);
       response.should.have.property('post_id');
       _secondId = response.post_id;
    });

    it('should create the tags', function *() {
        var res = yield request.get('/posts/' + _secondId)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text).post;
        response.should.have.property('tags');
        response.tags[0].name.should.equal('javascript');
        response.tags[1].name.should.equal('ruby');
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
            return db('tags').del();
        }).then(function() {
            return db('tag_relationships').del();
        }).then(function() {
            done();
        });
    });

});
