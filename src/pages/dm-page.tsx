import { useParams } from 'react-router-dom';

import { RoomTypes } from '@components/ui/displays';

import { useSocketRoomJoin } from '@hooks';
import { useGetUserData } from '@features/auth/hooks';

import { setDocumentTitle } from '@utils';
import { getDmInfo } from '@features/dms/utils';

import { ContentLayout } from '@components/layouts';

import { RoomWelcome } from '@components/ui/displays';
import {
  DmHeader,
  DmParticipantsInfo,
} from '@features/dms/get';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';

import { useGetDmQuery } from '@features/dms/api';

export function DMPage() {
  const { roomId } = useParams();

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
        infoTab={<DmParticipantsInfo
          participants={participants}
          isGroup={isGroup}
        />}
      >
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