import { checkEmptyEnv } from '@utils';

const ENVIRONMENT_VARIABLES: string[] = [
  'NODE_ENV',
  'VITE_CLIENT_URL',
  'VITE_API_URL',
  'VITE_CLOUD_NAME',
  'VITE_CLOUDINARY_API_KEY',
];

checkEmptyEnv(ENVIRONMENT_VARIABLES);

export const env: { [key: string]: string } = ENVIRONMENT_VARIABLES.reduce(
  (acc, envVar) =>  ({ ...acc, [envVar]: process.env[envVar] }),
  {},
);