import type { ServerBasicData } from '../types';

import { Acronym, Avatar } from '@components/ui/media';

type ServerAvatarProps = {
  server: ServerBasicData;
  className?: string;
};

export function ServerAvatar({ server, className }: ServerAvatarProps) {
  const { name, avatarUrl } = server;

  return (
    <div className={className}>
      {avatarUrl
        ? <Avatar src={avatarUrl} />
        : <Acronym name={name} />
      }
    </div>
  );
}