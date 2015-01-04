var app = require('../../server');
var request = require('co-supertest').agent(app.listen());
var should = require('should');
var db = require('../../lib/db');

describe('Projects API', function() {
    var _id;
    var _secondId;

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
            done();
        });
    });

    it('should retrive all projects', function *() {
        var res = yield request.get('/projects')
            .query({
                query: 'isClient'
            })
            .end();

        var response = JSON.parse(res.text);
        response.should.have.length(1);
        response[0].should.have.property('name', 'My Project');
    });

    it('should retrieve a specific project', function *() {
        var res = yield request.get('/projects/' + _id)
        .query({
            query: 'isClient'
        })
        .end();

        var response = JSON.parse(res.text);
        response.should.have.property('name', 'My Project');
    });

    it('should update a project', function *() {
        var res = yield request.put('/projects')
        .send({
            'id': _id,
            'name': 'My Edited Project'
        })
        .end();

        var response = JSON.parse(res.text);
        response.should.have.property('project_id', _id);
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
        })
        .end();

        var response = JSON.parse(res.text);
        response.should.have.property('project_id');
        _secondId = response.project_id;
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
            done();
        });
    });

});
