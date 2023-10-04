import { useParams } from 'react-router-dom';

import { RoomTypes } from '@components/ui/displays';

import { useSocketRoomJoin } from '@hooks';
import { useDmInfo } from '@features/dms/hooks';
import { useGetUserData } from '@features/auth/hooks';

import { setDocumentTitle } from '@utils';

import { ContentLayout } from '@components/layouts';

import { RoomWelcome } from '@components/ui/displays';
import {
  DmHeader,
  DmParticipantsInfo,
} from '@features/dms/get';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';
import { LivekitRoom } from '@features/webrtc/stream';

import { useGetDmQuery } from '@features/dms/api';

export function DMPage() {
  const { roomId } = useParams();

  const { user } = useGetUserData();
  const { data: dm, isSuccess } = useGetDmQuery(roomId!);

  const { name, avatarUrl, participants } = useDmInfo(dm, user.data!.id);

  useSocketRoomJoin(roomId!);

  if (!isSuccess) return null;

  const { isGroup } = dm;

  setDocumentTitle([`${isGroup ? '' : '@'}${name}`]);

  return (
    <div>
      <ContentLayout
        header={<DmHeader dm={dm} />}
        infoTab={<DmParticipantsInfo
          participants={participants}
          isGroup={isGroup}
        />}
      >
        <LivekitRoom />
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