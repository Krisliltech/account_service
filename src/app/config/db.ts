import knex from 'knex';
import { env } from './env';
import { knexFileConfiguration } from '../../knexfile';
import { injectable } from 'inversify';

let isTested = false;

const config = knexFileConfiguration[env.environment];
const db01 = knex(config);

export const db = db01;
export const KnexInstance = knex;


@injectable()
export class PostgresConnection {
  getDb() {
    return db;
  }
}

if (!isTested) {
  isTested = true;
  db.raw('SELECT 1')
    .then((message) => {
      console.log('postgres connected');
      // console.log(message);
    })
    .catch((err) => {
      // Failure / timeout
      console.log(err);
      throw err;
    });
}
