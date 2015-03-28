var app = require('../../server');
var request = require('co-supertest').agent(app.listen());
var should = require('should');
var db = require('../../lib/db');
var _ = require('lodash');
var user = require('../support/user');
var post = require('../support/post');
var project = require('../support/project');

describe('Tags API:: ', function() {
    var _postId;
    var _projectId;
    var _postTagId;
    var _projectTagId;
    var _secondId;
    var _secondTag;
    var _user;

    before(function(done) {
        post.create()
        .then(function(post) {
            _postId = post.postId;
            _postTagId = post.tagId;
        })
        .then(function() {
            return project.create();
        })
        .then(function(project) {
            _projectId = project.projectId;
            _projectTagId = project.tagId;
        })
        .then(function() {
            return user.create();
        })
        .then(done);
    });

    describe('When not authenticated', function() {
        it('should not list unpublished posts', function* () {
            var res = yield request.get('/tags/' + _postTagId)
                .query({ isClient: true }).end();
            
            var tag = JSON.parse(res.text).tag;
            tag.posts.should.have.length(0);
        });

        it('should not list unpublished projects', function* () {
            var res = yield request.get('/tags/' + _projectTagId)
                .query({ isClient: true }).end();

            var tag = JSON.parse(res.text).tag;

            tag.projects.should.have.length(0);
        });
    });

    after(function(done) {
        db('posts')
        .del()
        .then(function() {
            return db('projects').del();
        })
        .then(function() {
            return db('users').del();
        })
        .then(function() {
            return db('tags').del();
        }).then(function() {
            return db('tag_relationships').del();
        }).then(function() {
            done();
        });
    });

});

