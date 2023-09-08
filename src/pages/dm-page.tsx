import { useParams } from 'react-router-dom';

import { RoomTypes } from '@components/ui/displays';

import { useDmInfo } from '@features/dms/hooks';
import { useGetUserData } from '@hooks';

import { ContentLayout } from '@components/layouts';

import { RoomWelcome } from '@components/ui/displays';
import { DmHeader } from '@features/dms/list';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';

import { useGetDmQuery } from '@features/dms/api';

export function DMPage() {
  const { roomId } = useParams();

  const { user } = useGetUserData();
  const { data: dm, isSuccess } = useGetDmQuery(roomId!);

  const { name, avatarUrl, participants } = useDmInfo(dm, user.data!.id);

  if (!isSuccess) return null;

  const { isGroup } = dm;

  return (
    <div>
      <ContentLayout
        header={<DmHeader dm={dm} />}
        infoTab={<div>contacts info</div>}
      >
        <MessagesContainer
          welcomeComponent={<RoomWelcome
            type={isGroup ? RoomTypes.GROUP : RoomTypes.DM}
            name={name}
            avatarSrc={avatarUrl}
            username={isGroup ? undefined : participants[0].username}
          />}
        />
        <SendMessageForm placeholder={`Message ${isGroup ? '' : '@'}${name}`} />
      </ContentLayout>
    </div>
  );
}