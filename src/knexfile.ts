import { Knex } from 'knex';
import { env } from './app/config/env';
import { UtilService } from './app/utils/util-service';
import { MIGRATION_TABLE_NAME } from './app/utils/constants';

interface IKnexConfig {
  development: Knex.Config<any>;
  production: Knex.Config<any>;
}

const MIGRATION_DIRECTORY = UtilService.getFullPathFromRoot('src/database/migrations');
const SEED_DIRECTORY = UtilService.getFullPathFromRoot('src/database/seeds');

const knexConfiguration: IKnexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: env.POSTGRES_HOST,
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DBNAME,
      port: env.POSTGRES_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: MIGRATION_DIRECTORY,
      tableName: MIGRATION_TABLE_NAME,
      extension: 'ts'
    },
    seeds: {
      directory: SEED_DIRECTORY,
      extension: 'ts'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: env.POSTGRES_HOST,
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DBNAME,
      port: env.POSTGRES_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: MIGRATION_DIRECTORY,
      tableName: MIGRATION_TABLE_NAME,
      extension: 'js'
    },
    seeds: {
      directory: SEED_DIRECTORY,
      extension: 'js'
    }
  }
};

module.exports = { ...knexConfiguration };
module.exports.knexFileConfiguration = { ...knexConfiguration };

export const knexFileConfiguration = { ...knexConfiguration };