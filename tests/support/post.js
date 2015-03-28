var app = require('../../server');
var should = require('should');
var db = require('../../lib/db');
var bcrypt = require('bcrypt');

var title = 'New Title';
var body = 'New body';
var slug = 'the-slug';
var excerpt = 'The Excerpt';
var published = false;
var tag = 'post-tag-test';

module.exports = {
    create: function () {
        var postId;
        var tagId;
        return new Promise(function(resolve, reject) {
            return db('posts').insert({
                title: title,
                body: body,
                slug: slug,
                excerpt: excerpt,
                published: published,
                created_at: new Date(),
                updated_at: new Date()
            }, 'id')
            .then(function(id) {
                postId = id[0];
                return db('tags').insert({
                    name: tag,
                    created_at: new Date(),
                    updated_at: new Date()
                }, 'id');
            })
            .then(function(_tagId) {
                tagId = _tagId[0];
                return db('tag_relationships').insert({
                    reference_id: postId,
                    reference_type: 'post',
                    tag_id: tagId,
                    created_at: new Date(),
                    updated_at: new Date()
                });
            })
            .then(function() {
                resolve({
                    postId: postId,
                    tagId: tagId
                });
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }
};
