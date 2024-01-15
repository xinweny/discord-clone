import type { ServerBasicData } from '../types';

import { Acronym, Gif } from '@components/ui/media';

type ServerAvatarProps = {
  server: Pick<ServerBasicData, 'name' | 'avatarUrl'>;
  className?: string;
};

export function ServerAvatar({ server, className }: ServerAvatarProps) {
  const { name, avatarUrl } = server;

  return (avatarUrl
    ? <Gif src={avatarUrl} className={className} />
    : <Acronym name={name} className={className} />
  );
}