import { env } from '../app/config/env';
import { db } from '../app/config/db';
import { knexFileConfiguration } from '../knexfile';

const { environment } = env;
const config = knexFileConfiguration[environment];

// https://github.com/knex/knex/blob/master/bin/cli.js

export default function seedRun() {
  return new Promise<void>((resolve, reject) => {
    if (config.seeds) {
      db.seed
        .run(config.seeds)
        .then((result) => {
          //
          resolve();
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    } else {
      console.error('Could not Seed: Invalid config object');
      reject();
    }
  });
}
