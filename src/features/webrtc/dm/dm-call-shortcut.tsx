import { useLivekitContext } from '@features/webrtc/hooks';
import { useLocation } from 'react-router-dom';

import { LinkImage } from '@components/ui/links';
import { Gif } from '@components/ui/media';

import { ServersNavbarItem } from '@features/servers/nav';

import { useGetDmQuery } from '@features/dms/api';

import defaultUserAvatar from '@assets/static/default-user-avatar.png';
import defaultGroupAvatar from '@assets/static/default-group-avatar.png';

export function DmCallShortcut() {
  const livekit = useLivekitContext();

  const { pathname } = useLocation();

  const {
    isOnCall,
    roomData,
    data,
  } = { ...livekit };

  const roomId = data?.roomId;
  const serverId = data?.serverId;

  const { data: dm } = useGetDmQuery(roomId || '', { skip: !data || !serverId || !roomId });

  if (!isOnCall || !roomData || !!serverId) return null;

  const { url, avatarUrl, name } = roomData;

  return (
    <ServersNavbarItem
      tooltipText={name!}
      isActive={!serverId && pathname === `/channels/@me/${roomId}`}
    >
      <LinkImage href={url!}>
        <Gif src={avatarUrl || (dm?.isGroup
          ? defaultGroupAvatar
          : defaultUserAvatar
        )} />
      </LinkImage>
    </ServersNavbarItem>
  );
}