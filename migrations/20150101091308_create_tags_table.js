'use strict';

exports.up = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.createTable('tags', function(table) {
                table.text('name');
                table.increments();
                table.timestamps();
            })
        ]);
};

exports.down = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.dropTable('tags')
    ]);
};
