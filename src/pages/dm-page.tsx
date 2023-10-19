import { useParams } from 'react-router-dom';
4
import { useGetUserData } from '@features/auth/hooks';
import { useLivekitContext } from '@features/webrtc/hooks';

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
import { DmOngoingCall, DmCall } from '@features/webrtc/dm';

import { useGetDmQuery } from '@features/dms/api';

export function DMPage() {
  const { roomId } = useParams();

  const livekit = useLivekitContext();

  const { user } = useGetUserData();
  const { data: dm, isSuccess } = useGetDmQuery(roomId!);

  if (!isSuccess) return null;

  const { name, avatarUrl, participants } = getDmInfo(dm, user.data!.id);

  const { isGroup } = dm;

  setDocumentTitle([`${isGroup ? '' : '@'}${name}`]);

  const isInCurrentRoomCall = livekit?.isCurrentRoom(roomId!);

  return (
    <div>
      <ContentLayout
        header={<DmHeader dm={dm} />}
        infoTab={isInCurrentRoomCall
          ? undefined
          : <DmParticipantsInfo
          participants={participants}
          isGroup={isGroup}
          />
        }
      >
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
      </ContentLayout>
    </div>
  );
}