'use strict';

exports.up = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.createTable('tag_relationships', function(table) {
                table.integer('reference_id');
                table.text('reference_type');
                table.integer('tag_id');
                table.increments();
                table.timestamps();
            })
        ]);
};

exports.down = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.dropTable('tag_relationshiops')
    ]);
};
