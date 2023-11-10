import type { DMData } from '../types';
4
import { useGetUserData } from '@features/auth/hooks';

import { getDmInfo } from '@features/dms/utils';

import { RoomWelcome, RoomTypes } from '@components/ui/displays';

import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';
import { DmOngoingCall, DmCall } from '@features/webrtc/dm';

type DmContainerProps = {
  dm: DMData;
  isInCurrentRoomCall: boolean;
};

export function DmContainer({ dm, isInCurrentRoomCall }: DmContainerProps) {
  const { user } = useGetUserData();

  const { name, avatarUrl, participants } = getDmInfo(dm, user.data!.id);
  const { isGroup } = dm;

  return (
    <div>
      {isInCurrentRoomCall
        ? <DmCall />
        : <DmOngoingCall roomId={dm._id} roomName={name} />
      }
      <MessagesContainer
        welcomeComponent={<RoomWelcome
          type={isGroup ? RoomTypes.GROUP : RoomTypes.DM}
          name={name}
          avatarSrc={avatarUrl}
          username={isGroup ? undefined : participants[0].username}
        />}
      />
      <SendMessageForm
        placeholder={`Message ${isGroup ? '' : '@'}${name}`}
      />
    </div>
  );
}