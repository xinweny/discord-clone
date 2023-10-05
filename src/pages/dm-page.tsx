import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { WebRTCContext } from '@features/webrtc/context';

import { useSocketRoomJoin } from '@hooks';
import { useGetUserData } from '@features/auth/hooks';

import { setDocumentTitle } from '@utils';
import { getDmInfo } from '@features/dms/utils';

import { ContentLayout } from '@components/layouts';

import { RoomWelcome, RoomTypes } from '@components/ui/displays';
import {
  DmHeader,
  DmParticipantsInfo,
} from '@features/dms/get';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';
import { DmOngoingCall } from '@features/webrtc/get';

import { useGetDmQuery } from '@features/dms/api';


export function DMPage() {
  const { roomId } = useParams();

  const livekit = useContext(WebRTCContext);

  const { user } = useGetUserData();
  const { data: dm, isSuccess } = useGetDmQuery(roomId!);

  useSocketRoomJoin(roomId!);

  if (!isSuccess) return null;

  const { name, avatarUrl, participants } = getDmInfo(dm, user.data!.id);

  const { isGroup } = dm;

  setDocumentTitle([`${isGroup ? '' : '@'}${name}`]);

  return (
    <div>
      <ContentLayout
        header={<DmHeader dm={dm} />}
        infoTab={livekit?.isCurrentRoom(roomId!)
          ? undefined
          : <DmParticipantsInfo
          participants={participants}
          isGroup={isGroup}
          />
        }
      >
        <DmOngoingCall roomId={dm._id} roomName={name} />
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
      </ContentLayout>
    </div>
  );
}