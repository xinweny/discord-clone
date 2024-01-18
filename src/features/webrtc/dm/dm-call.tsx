import { useParticipants } from '@livekit/components-react';

import {
  CallWrapper,
  GroupParticipantLoop,
  PrivateParticipantLoop,
} from '../stream';

type DmHeaderProps = {
  header?: React.ReactNode;
  isGroup: boolean;
};

export function DmCall({ header, isGroup }: DmHeaderProps) {
  const participants = useParticipants();

  return (
    <CallWrapper header={header} >
      {isGroup
        ? <GroupParticipantLoop participants={participants} />
        : <PrivateParticipantLoop participants={participants} />
      }
    </CallWrapper>
  );
}