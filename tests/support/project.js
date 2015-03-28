var app = require('../../server');
var should = require('should');
var db = require('../../lib/db');
var bcrypt = require('bcrypt');

var name = 'My Project';
var role =  'Developer';
var url =  'http = //this.com';
var date_completed =  '2014-12-01';
var body =  'The body stuff';
var logo =  '/logo.svg';
var thumbnail =  '/thumbnail.svg';
var small_screen =  '/small.png';
var medium_screen =  '/medium.png';
var large_screen =  '/large.png';
var slug =  'my-project';
var published = false;

var tag = 'project-tag-test';

module.exports = {
    create: function () {
        var projectId;
        var tagId;
        return new Promise(function(resolve, reject) {
            return db('projects').insert({
                name: name,
                role: role,
                url: url,
                date_completed: date_completed,
                body: body,
                logo: logo,
                thumbnail: thumbnail,
                small_screen: small_screen,
                medium_screen: medium_screen,
                large_screen: large_screen,
                slug: slug,
                published: published,
                created_at: new Date(),
                updated_at: new Date()
            }, 'id')
            .then(function(id) {
                projectId = id[0];
                return db('tags').insert({
                    name: tag,
                    created_at: new Date(),
                    updated_at: new Date()
                }, 'id');
            })
            .then(function(_tagId) {
                tagId = _tagId[0];
                return db('tag_relationships').insert({
                    reference_id: projectId,
                    reference_type: 'project',
                    tag_id: tagId,
                    created_at: new Date(),
                    updated_at: new Date()
                });
            })
            .then(function() {
                resolve({
                    projectId: projectId,
                    tagId: tagId
                });
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }
};
