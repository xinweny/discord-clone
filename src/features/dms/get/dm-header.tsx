import type { DMData } from '../types';

import { DmHeaderContext } from '../context';

import { getDmInfo } from '../utils';

import { useGetUserData } from '@features/auth/hooks';

import { DmHeaderInfo } from './dm-header-info';
import { DmHeaderButtons } from './dm-header-buttons';

import { DmCall, DmOngoingCall } from '@features/webrtc/dm';

import { useLivekitContext } from '@features/webrtc/hooks';

import styles from './dm-header.module.scss';

type DmHeaderProps = {
  dm: DMData;
};

export function DmHeader({ dm }: DmHeaderProps) {
  const livekit = useLivekitContext();

  const { user } = useGetUserData();

  const contextData = {
    tooltipProps: {
      direction: 'bottom' as const,
      gap: 2,
    },
  };

  const header = (
    <div className={styles.header}>
      <DmHeaderInfo dm={dm} />
      <DmHeaderButtons dm={dm} />
    </div>
  );

  const { _id: roomId, isGroup } = dm;
  const { name } = getDmInfo(dm, user.data!.id);

  const isInCurrentRoomCall = livekit?.isCurrentRoom(roomId);

  return (
    <DmHeaderContext.Provider value={contextData}>
      {isInCurrentRoomCall
        ? <DmCall
          header={header}
          isGroup={isGroup}
        />
        : <DmOngoingCall
          header={header}
          roomId={dm._id}
          roomName={name}
        />
      }
    </DmHeaderContext.Provider>
  );
}