import type { DMData } from '../types';

import { useGetUserData } from '@features/auth/hooks';
import { useDmInfo } from '../hooks';

import { JoinRoomButton } from '@features/webrtc/connect';

import { Avatar } from '@components/ui/media';

type DmHeaderProps = {
  dm: DMData;
};

export function DmHeader({ dm }: DmHeaderProps) {
  const { user } = useGetUserData();

  const { avatarUrl, name } = useDmInfo(dm, user.data!.id);

  return (
    <div>
      <Avatar src={avatarUrl} />
      <p>{name}</p>
      <div>
        <JoinRoomButton roomId={dm._id}>
          <img src="" alt="Start Audio Call" />
        </JoinRoomButton>
      </div>
    </div>
  );
}