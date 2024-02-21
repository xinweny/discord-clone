import dotenv from 'dotenv';

import { checkEmptyEnv } from '@utils/checkEmptyEnv.js';

dotenv.config({ path: '.env' });

const ENVIRONMENT_VARIABLES: string[] = [
  'NODE_ENV',
  'PORT',
  'CLIENT_URL',
  'REDIS_URL',
  'MONGODB_URI',
  'BCRYPT_SALT',
  'JWT_ACCESS_SECRET',
  'JWT_ACCESS_EXPIRE',
  'JWT_REFRESH_SECRET',
  'JWT_REFRESH_EXPIRE',
  'JWT_RESET_SECRET',
  'SMTP_SERVICE',
  'SMTP_EMAIL',
  'SMTP_PASSWORD',
  'CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'LK_API_KEY',
  'LK_API_SECRET',
  'LK_URL',
];

checkEmptyEnv(ENVIRONMENT_VARIABLES);

const env: { [key: string]: string } = ENVIRONMENT_VARIABLES.reduce(
  (acc, envVar) =>  ({ ...acc, [envVar]: process.env[envVar] }),
  {},
);

export default env;