import { useParticipants } from '@livekit/components-react';
import { useHover } from '@uidotdev/usehooks';

import {
  CallWrapper,
  GroupParticipantLoop,
  PrivateParticipantLoop,
} from '../stream';

import { CallResizerWrapper } from './call-resizer-wrapper';

type DmHeaderProps = {
  header?: React.ReactNode;
  isGroup: boolean;
};

export function DmCall({ header, isGroup }: DmHeaderProps) {
  const participants = useParticipants();

  const [hoverRef, isHovered] = useHover();

  return (
    <CallResizerWrapper>
      <CallWrapper
        header={header}
        divRef={hoverRef as unknown as React.RefObject<HTMLDivElement>}
        isFocused={isHovered}
      >
        {isGroup
          ? <GroupParticipantLoop participants={participants} />
          : <PrivateParticipantLoop participants={participants} showDetails={isHovered} />
        }
      </CallWrapper>
    </CallResizerWrapper>
  );
}