import "reflect-metadata";
import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
const myEnv = dotenv.config();
expand(myEnv);

const envGlobCache: { [x: string]: string } = {};

/**
 * cache value, its faster!
 *
 */
function getEnv(envKey: string) {
  if (envGlobCache[envKey] !== undefined) {
    return envGlobCache[envKey];
  }
  const newEnv = process.env[envKey];
  if (newEnv !== undefined) {
    envGlobCache[envKey] = newEnv;
    return newEnv;
  }
  return undefined;
}

function getEnvString(envKey: string) {
  const val = getEnv(envKey);
  if (val) {
    return val;
  }
  return '';
}

//@ts-ignore
function getEnvBool(envKey: string) {
  const val = getEnv(envKey);
  if (val !== undefined && String(val) === 'true') {
    return true;
  }
  return false;
}

function getEnvNumber(envKey: string, defaultVal?: number) {
  const val = getEnv(envKey);
  if (val !== undefined && !isNaN(Number(val))) {
    return Number(val);
  }
  return defaultVal as number;
}

type IEnvironment = 'production' | 'development';

export const env = {
  port: getEnvNumber('PORT'),
  environment: getEnvString('NODE_ENV') as IEnvironment,
  POSTGRES_PORT: getEnvNumber('POSTGRES_PORT'),
  POSTGRES_PASSWORD: getEnvString('POSTGRES_PASSWORD'),
  POSTGRES_HOST: getEnvString('POSTGRES_HOST'),
  POSTGRES_DBNAME: getEnvString('POSTGRES_DBNAME'),
  POSTGRES_USER: getEnvString('POSTGRES_USER'),
} as const;
