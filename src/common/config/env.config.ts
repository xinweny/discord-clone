import { checkEmptyEnv } from '@common/utils';

const ENVIRONMENT_VARIABLES: string[] = [
  'NODE_ENV',
  'VITE_CLIENT_URL',
  'VITE_API_URL',
];

checkEmptyEnv(ENVIRONMENT_VARIABLES);

export const env: { [key: string]: string } = ENVIRONMENT_VARIABLES.reduce(
  (acc, envVar) =>  ({ ...acc, [envVar]: process.env[envVar] }),
  {},
);