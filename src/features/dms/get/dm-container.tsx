import type { DMData } from '../types';
import { RelationStatus } from '@features/relations/types';

import { getDmInfo } from '@features/dms/utils';

import { useGetUserData } from '@features/auth/hooks';
import { useGetRelationsQuery } from '@features/relations/api';

import { RoomWelcome, RoomTypes } from '@components/ui/displays';

import { MessagesContainer } from '@features/messages/list';
import { DmOngoingCall, DmCall } from '@features/webrtc/dm';
import { RelationOptionsBar } from '@features/relations/get';

import defaultUserAvatar from '@assets/static/default-user-avatar.png';

import styles from './dm-container.module.scss';

type DmContainerProps = {
  dm: DMData;
  isInCurrentRoomCall: boolean;
};

export function DmContainer({ dm, isInCurrentRoomCall }: DmContainerProps) {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const { name, avatarUrl, participants } = getDmInfo(dm, userId);
  const { isGroup, participantIds } = dm;

  const { data: relations } = useGetRelationsQuery(userId);

  return (
    <div className={styles.container}>
      {isInCurrentRoomCall
        ? <DmCall />
        : <DmOngoingCall roomId={dm._id} roomName={name} />
      }
        <MessagesContainer
          welcomeComponent={<RoomWelcome
            type={isGroup ? RoomTypes.GROUP : RoomTypes.DM}
            name={name}
            avatarSrc={avatarUrl || defaultUserAvatar}
            username={isGroup ? undefined : participants[0].username}
            component={!isGroup && <RelationOptionsBar
              senderId={userId}
              recipientId={participants[0]._id}
            />}
          />}
          formPlaceholder={`Message ${isGroup ? '' : '@'}${name}`}
          authorized={isGroup
            ? participantIds.includes(userId)
            : !relations?.find(relation => relation.userId === participants[0]._id && relation.status === RelationStatus.BLOCKED)
          }
          errorPlaceholder={isGroup ? undefined : 'You cannot send messages to a user you have blocked.'}
        />
    </div>
  );
}