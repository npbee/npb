var app = require('../../server');
var request = require('co-supertest').agent(app.listen());
var should = require('should');
var db = require('../../lib/db');
var _ = require('lodash');

describe('Projects API', function() {
    var _id;
    var _tag;
    var _secondId;
    var _secondTag;

    before(function(done) {
        db('projects').insert({
            name: 'My Project',
            role: 'Developer',
            url: 'http://this.com',
            date_completed: '2014-12-01',
            body: 'The body stuff',
            logo: '/logo.svg',
            thumbnail: '/thumbnail.svg',
            small_screen: '/small.png',
            medium_screen: '/medium.png',
            large_screen: '/large.png',
            slug: 'my-project',
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
                reference_type: 'project',
                tag_id: tagId[0],
                created_at: new Date(),
                updated_at: new Date()
            });
        }).then(function() {
            done();
        });
    });

    it('should retrive all projects', function *() {
        var res = yield request.get('/projects')
            .query({
                query: 'isClient'
            })
            .end();

        var response = JSON.parse(res.text).projects;
        response.should.have.length(1);
        response[0].should.have.property('name', 'My Project');
    });

    it('should retrieve a specific project', function *() {
        var res = yield request.get('/projects/' + _id)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text).project;
        response.should.have.property('name', 'My Project');

        _tag = response.tags[0];
        response.tags[0].should.have.property('name', 'testing');
    });

    it('should update a project', function *() {
        var extended = [].concat(_tag, { name: "Second tag" });

        var res = yield request.put('/projects')
        .send({
            'id': _id,
            'name': 'My Edited Project',
            'tags': extended
        })
        .end();

        var response = JSON.parse(res.text);
        response.should.have.property('project_id', _id);
    });

    it('should not duplicate the tags', function *() {
        var res = yield request.get('/projects/' + _id)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text);
        _secondTag = response.project.tags[1];
        response.project.tags.should.have.length(2);
    });

    it('should allow for removal of a tag', function *() {
        var removedTag = _.extend(_tag, { _delete: true });
        var req = yield request.put('/projects')
        .send({
            'id': _id,
            'tags': [removedTag, _secondTag]
        })
        .end();

        var res = yield request.get('/projects/' + _id)
        .query({
            query: 'isClient'
        }).end();

        var response = JSON.parse(res.text);
        response.project.tags.should.have.length(1);
        response.project.tags[0].name.should.equal("Second tag");
    });


    it('should create a project', function *() {
        var res = yield request.post('/projects')
        .send({
            name: 'My Second Project',
            role: 'Developer',
            url: 'http://this.com',
            date_completed: '2014-12-01',
            body: 'The body stuff',
            logo: '/logo.svg',
            thumbnail: '/thumbnail.svg',
            small_screen: '/small.png',
            medium_screen: '/medium.png',
            large_screen: '/large.png',
            slug: 'my-project',
            published: false,
            tags: [{name: 'javascript'}, {name: 'ruby'}]
        })
        .end();

        var response = JSON.parse(res.text);
        response.should.have.property('project_id');
        _secondId = response.project_id;
    });

    it('should create the tags', function *() {
        var res = yield request.get('/projects/' + _secondId)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text).project;
        response.should.have.property('tags');
        response.tags.should.matchEach(/[ruby|javascript]/);
    });


    it('should delete a project', function *() {
        var res = yield request.del('/projects')
        .send({
            'id': _secondId
        })
        .end();
        
        var response = JSON.parse(res.text);
        response.should.have.property('affected_rows', 1);
    });

    after(function(done) {
        db('projects')
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
