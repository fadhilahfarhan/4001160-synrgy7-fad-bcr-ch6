import type { Knex } from 'knex';
import dotenv from 'dotenv'

dotenv.config();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
