import { ServerData } from '../types';

import { ServerNavDropdown } from './server-nav-dropdown';

type ServerBannerProps = {
  server: ServerData;
};

export function ServerHeader({ server }: ServerBannerProps) {
  return (
    <div>
      <h3>{server.name}</h3>
      <ServerNavDropdown />
    </div>
  );
}