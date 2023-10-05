import type { DMData } from '../types';

import { useGetUserData } from '@features/auth/hooks';
import { getDmInfo } from '../utils';

import { ConnectToRoomButton } from '@features/webrtc/connect';

import { Avatar } from '@components/ui/media';

type DmHeaderProps = {
  dm: DMData;
};

export function DmHeader({ dm }: DmHeaderProps) {
  const { user } = useGetUserData();

  const { avatarUrl, name } = getDmInfo(dm, user.data!.id);

  return (
    <div>
      <Avatar src={avatarUrl} />
      <p>{name}</p>
      <div>
        <ConnectToRoomButton roomId={dm._id}>
          <img src="" alt="Start Audio Call" />
        </ConnectToRoomButton>
        <ConnectToRoomButton roomId={dm._id}>
          <img src="" alt="Start Video Call" />
        </ConnectToRoomButton>
      </div>
    </div>
  );
}