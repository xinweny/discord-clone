import type { DMData } from '../types';
4
import { useGetUserData } from '@features/auth/hooks';

import { getDmInfo } from '@features/dms/utils';

import { RoomWelcome, RoomTypes } from '@components/ui/displays';

import { MessagesContainer } from '@features/messages/list';
import { DmOngoingCall, DmCall } from '@features/webrtc/dm';

import defaultUserAvatar from '@assets/static/default-user-avatar.png';

import styles from './dm-container.module.scss';

type DmContainerProps = {
  dm: DMData;
  isInCurrentRoomCall: boolean;
};

export function DmContainer({ dm, isInCurrentRoomCall }: DmContainerProps) {
  const { user } = useGetUserData();

  const { name, avatarUrl, participants } = getDmInfo(dm, user.data!.id);
  const { isGroup, participantIds } = dm;

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
          />}
          formPlaceholder={`Message ${isGroup ? '' : '@'}${name}`}
          authorized={participantIds.includes(user.data!.id)}
        />
    </div>
  );
}