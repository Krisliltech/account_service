import 'reflect-metadata';
import seedRunner from './database/seed-runner';

seedRunner()
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(0);
  });
