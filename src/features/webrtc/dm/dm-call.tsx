import { useParticipants } from '@livekit/components-react';
import { useHover } from '@uidotdev/usehooks';
import { ResizableBox } from 'react-resizable';

import { ResizableHandle } from '@components/ui/handles';

import {
  CallWrapper,
  GroupParticipantLoop,
  PrivateParticipantLoop,
} from '../stream';

import styles from './dm-call.module.scss';

type DmHeaderProps = {
  header?: React.ReactNode;
  isGroup: boolean;
};

export function DmCall({ header, isGroup }: DmHeaderProps) {
  const participants = useParticipants();

  const [hoverRef, isHovered] = useHover();

  return (
    <ResizableBox
      height={200}
      axis="y"
      resizeHandles={['s']}
      handleSize={[2000, 5]}
      minConstraints={[Infinity, 200]}
      maxConstraints={[Infinity, 453]}
      handle={(handleAxis, ref) => <ResizableHandle
        innerRef={ref}
        handleAxis={handleAxis}
        className={styles.handle}
      />}
    >
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
    </ResizableBox>
  );
}