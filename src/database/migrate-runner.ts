import { env } from '../app/config/env';
import { db } from '../app/config/db';
import { knexFileConfiguration } from '../knexfile';
//
const config = knexFileConfiguration[env.environment];

// https://github.com/knex/knex/blob/master/bin/cli.js

export default function migrateLatest(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (config.migrations) {
      db.migrate
        .latest(config.migrations)
        .then((result: [number, string[]]) => {
          const batchNo = result[0];
          const log = result[1];
          if (log?.length === 0) {
            console.log('Already up to date');
          }
          console.log(`Batch ${batchNo} run: ${log?.length} migrations`);
          console.log(`${log.join('\n')}`);
          resolve();
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    } else {
      console.error('Could not Migrate: Invalid config object');
      reject();
    }
  });
}
