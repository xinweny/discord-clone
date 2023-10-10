import type { DMData } from '../types';

import { useGetUserData } from '@features/auth/hooks';
import { useLivekitContext } from '@features/webrtc/hooks';

import { getDmInfo } from '../utils';

import { ConnectToRoomButton } from '@features/webrtc/connect';

import { Avatar } from '@components/ui/media';

import { useGetParticipantsQuery } from '@features/webrtc/api';

type DmHeaderProps = {
  dm: DMData;
};

export function DmHeader({ dm }: DmHeaderProps) {
  const { user } = useGetUserData();

  const livekit = useLivekitContext();

  const { data: participants } = useGetParticipantsQuery(dm._id);

  const { avatarUrl, name } = getDmInfo(dm, user.data!.id);

  return (
    <div>
      <Avatar src={avatarUrl} />
      <p>{name}</p>
      <div>
        {livekit?.isCurrentRoom(dm._id) ||
        <>
          <ConnectToRoomButton
            roomId={dm._id}
            roomName={name}
          >
            {participants && participants.length > 0
              ? <img src="" alt="Join Call" />
              : <img src="" alt="Start Call" />
            }
          </ConnectToRoomButton>
          <ConnectToRoomButton
            roomId={dm._id}
            roomName={name}
            withVideo
          >
            {participants && participants.length > 0
              ? <img src="" alt="Join Call with Video" />
              : <img src="" alt="Start Call with Video" />
            }
          </ConnectToRoomButton>
        </>
        }
      </div>
    </div>
  );
}