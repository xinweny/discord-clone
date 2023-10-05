import { useContext } from 'react';

import type { DMData } from '../types';

import { WebRTCContext } from '@features/webrtc/context';

import { useGetUserData } from '@features/auth/hooks';
import { getDmInfo } from '../utils';

import { ConnectToRoomButton } from '@features/webrtc/connect';

import { Avatar } from '@components/ui/media';

import { useGetParticipantsQuery } from '@features/webrtc/api';

type DmHeaderProps = {
  dm: DMData;
};

export function DmHeader({ dm }: DmHeaderProps) {
  const { user } = useGetUserData();

  const livekit = useContext(WebRTCContext);

  const { data: participants } = useGetParticipantsQuery(dm._id);

  const { avatarUrl, name } = getDmInfo(dm, user.data!.id);

  return (
    <div>
      <Avatar src={avatarUrl} />
      <p>{name}</p>
      <div>
        {livekit?.isCurrentRoom(dm._id)
          ? undefined
          : <ConnectToRoomButton
            roomId={dm._id}
            roomName={name}
          >
            {participants && participants.length > 0
              ? <img src="" alt="Join Call" />
              : <img src="" alt="Start Call" />
            }
          </ConnectToRoomButton>
        }
      </div>
    </div>
  );
}