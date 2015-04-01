'use strict';

exports.up = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.table('posts', function(table) {
                table.text('header_image');
            })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.table('posts', function(table) {
                table.dropColumn('header_image');
            })
    ]);
};
