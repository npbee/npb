var request = require('superagent');
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

    it('should retrive all projects', function(done) {
        request.get('localhost:9000/projects')
            .query({
                query: 'isClient'
            })
            .end(function(res) {
                var response = JSON.parse(res.text);
                res.should.exist;
                response.should.have.length(1);
                response[0].should.have.property('name', 'My Project');
                done();
            });
    });

    it('should retrieve a specific project', function(done) {
        request.get('localhost:9000/projects/' + _id)
        .query({
            query: 'isClient'
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            res.should.exist;
            response.should.have.property('name', 'My Project');
            done();
        });
    });

    it('should update a project', function(done) {
        request.put('localhost:9000/projects')
        .send({
            'id': _id,
            'name': 'My Edited Project'
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            res.should.exist;
            response.should.have.property('project_id', _id);
            done();
        });
    });

    it('should create a project', function(done) {
        request.post('localhost:9000/projects')
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
        .end(function(res) {
            var response = JSON.parse(res.text);
            res.should.exist;
            response.should.have.property('project_id');
            _secondId = response.project_id;
            done();
        });
    });

    it('should delete a project', function(done) {
        request.del('localhost:9000/projects')
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
        db('projects')
        .del()
        .then(function() {
            done();
        });
    });

});
