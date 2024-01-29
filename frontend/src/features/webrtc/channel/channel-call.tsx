import { useParams } from 'react-router-dom';
import { useParticipants } from '@livekit/components-react';
import { useHover } from '@uidotdev/usehooks';

import { CallWrapper, GroupParticipantLoop } from '../stream';

import styles from './channel-call.module.scss';

type ChannelCallProps = {
  header: React.ReactNode;
};

export function ChannelCall({ header }: ChannelCallProps) {
  const { serverId } = useParams();

  const participants = useParticipants();

  const [hoverRef, isHovered] = useHover();

  return (
    <CallWrapper
      header={header}
      divRef={hoverRef as unknown as React.RefObject<HTMLDivElement>}
      isFocused={isHovered}
      className={styles.container}
    >
      <GroupParticipantLoop
        serverId={serverId}
        participants={participants}
      />
    </CallWrapper>
  );
}