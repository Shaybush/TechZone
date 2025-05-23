import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'prod' 
  ? '.env.prod'
  : '.env.local';

dotenv.config({
  path: path.resolve(process.cwd(), envFile)
});

export const PORT = process.env.PORT || 8080;
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const NODE_ENV = process.env.NODE_ENV;
export const REDIS_URI = `redis://${REDIS_HOST}:${REDIS_PORT}`;