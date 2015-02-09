var Promise = require('bluebird');
var knex = require('../../lib/db');
var _ = require('lodash');


function createTag(trx, tag) {
    return trx('tags').insert({
                name: tag.name,
                created_at: new Date(),
                updated_at: new Date()
    }, 'id');
}

/**
 * Given a knex transaction and a list of tags from the client, this function 
 * will resolve with either an existing tag, or a new tag, if the given tag
 * does not yet exist
 */
exports.collect = function(trx, tags) {
    return Promise.map(tags, function(tag) {
        // If the tag object has an ID, look it up and return it
        return new Promise(function(resolve, reject) {
            // If the tag has an ID, it already exists in the db
            if (tag.id) {
                resolve(tag);
            } else {
                return createTag(trx, tag).then(resolve);
            }
        });
    });
};


exports.createTagIfNot = function(trx, tags) {
    return Promise.map(tags, function(tag) {
        return new Promise(function(resolve, reject) {
            trx('tags').where('name', tag.name).select('id')
            .then(function(tags) {
                if (tags.length) {
                    resolve(tags[0])
                } else {
                    return createTag(trx, tag).then(resolve);
                }
            });
        });
    });
};


exports.createTagRelationship = function(trx, tagIds, refId, refType) {
    return Promise.map(tagIds, function(tagId) {
        return trx('tag_relationships').insert({
            reference_id: refId,
            reference_type: refType,
            tag_id: tagId[0],
            created_at: new Date(),
            updated_at: new Date()
        });
    });
};


/**
 * This function will take an array of tags.  For each tag in the array, if the
 * tag relationship to given post already exists, the promise will resolve.  If 
 * the relationship does not exist, it will be created.  If the tag is marked
 * for deletion, the tag relationship will be deleted
 */
exports.upsert = function(trx, tagIds, id, referenceType) {
    //The knex functions return an array, so we flatten everything
    //down.  
    var flattened = _.flatten(tagIds, true);

    // Filter out the tag relationships to delete
    var tagsToAdd = flattened.filter(function(tag) {
        return !tag._delete;
    });

    var tagsToDelete = flattened.filter(function(tag) {
        return tag._delete;
    });

    //If we've return a tag that already exists, it will be an
    //object, so we need to flatten again with just the id.
    var preppedTagsToAdd = tagsToAdd.map(function(tag) {
        if (tag.id) {
            return tag.id;
        } else {
            return tag;
        }
    });

    var preppedTagsToDelete = tagsToDelete.map(function(tag) {
        return tag.id;
    });

    return Promise.map(preppedTagsToAdd, function(tagId) {
        return new Promise(function(resolve, reject) {
            trx('tag_relationships')
            .where('tag_id', tagId)
            .andWhere('reference_id', id)
            .then(function(relationships) {
                if (relationships.length) {
                    resolve();
                } else {
                    trx('tag_relationships').insert({
                        reference_id: id,
                        reference_type: referenceType,
                        tag_id: tagId,
                        created_at: new Date(),
                        updated_at: new Date()
                    }).then(resolve);
                }
            });
        }).then(function() {
            return Promise.map(preppedTagsToDelete, function(tagId) {
                return trx('tag_relationships')
                .where('tag_id', tagId)
                .andWhere('reference_id', id)
                .del();
            });
        });
    });
};

