'use strict';

exports.up = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.createTable('posts', function(table) {
                table.increments();
                table.text('title');
                table.text('body');
                table.string('slug');
                table.integer('user_id');
                table.text('excerpt');
                table.boolean('published');
                table.timestamps();
            })
        ]);
};

exports.down = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.dropTable('posts')
    ]);
};
