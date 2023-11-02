import { ServerData } from '../types';

import { ServerDropdownMenu } from './server-dropdown-menu';

type ServerHeaderProps = {
  server: ServerData;
};

export function ServerHeader({ server }: ServerHeaderProps) {
  return (
    <div>
      <h3>{server.name}</h3>
      <ServerDropdownMenu />
    </div>
  );
}