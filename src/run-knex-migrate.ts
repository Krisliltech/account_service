import 'reflect-metadata';
import migrationRunner from './database/migrate-runner';

migrationRunner()
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(0);
  });
