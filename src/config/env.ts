const ENVIRONMENT_VARIABLES: string[] = [
  'NODE_ENV',
  'VITE_CLIENT_URL',
  'VITE_API_URL',
  'VITE_CLOUD_NAME',
  'VITE_CLOUDINARY_API_KEY',
];


function checkEmptyEnv(vars: string[]) {
  const emptyVars = [];

  for (const varName of vars) {
    if (process.env[varName] === undefined) emptyVars.push(varName);
  }

  if (emptyVars.length > 0) {
    throw new Error(`The following environment variables are missing:
    ${emptyVars.join('\r\n')}`);
  }
}

checkEmptyEnv(ENVIRONMENT_VARIABLES);

export const env: { [key: string]: string } = ENVIRONMENT_VARIABLES.reduce(
  (acc, envVar) =>  ({ ...acc, [envVar]: process.env[envVar] }),
  {},
);