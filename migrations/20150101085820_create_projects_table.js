'use strict';

exports.up = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.createTable('projects', function(table) {
                table.boolean('accepting_projects');
                table.text('body');
                table.date('date_completed');
                table.text('large_screen');
                table.text('logo');
                table.text('medium_screen');
                table.text('name');
                table.boolean('published');
                table.text('role');
                table.string('slug');
                table.text('small_screen');
                table.text('thumbnail');
                table.text('url');
                table.integer('user_id');
                table.increments();
                table.timestamps();
            })
        ]);
};

exports.down = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.dropTable('projects')
    ]);
};
