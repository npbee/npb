// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'nick',
        password: '',
        database: 'npb.com_dev'
    },
    pool: {
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
  },

  testing: {
      client: 'pg',
      connection: {
          host: 'localhost',
          user: 'nick',
          password: '',
          database: 'npb.com_test'
      },
      migrations: {
          tableName: 'knex_migrations'
      }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
