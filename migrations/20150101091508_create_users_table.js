'use strict';

exports.up = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.createTable('users', function(table) {
                table.boolean('accepting_projects');
                table.boolean('admin');
                table.text('crypted_password');
                table.text('email');
                table.text('name');
                table.text('rememeber_me_token');
                table.date('remember_me_token_expires_at');
                table.text('salt');
                table.increments();
                table.timestamps();
            })
        ]);
  
};

exports.down = function(knex, Promise) {
    return Promise.all(
        [
            knex.schema.dropTable('users')
    ]);
};
