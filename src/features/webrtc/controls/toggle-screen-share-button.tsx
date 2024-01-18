import { TrackToggle, useParticipantContext } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { Tooltip } from '@components/ui/popups';

import ScreenShareIcon from '@assets/icons/screen-share.svg?react';
import StopStreamingIcon from '@assets/icons/stop-streaming.svg?react';

type ToggleScreenShareButtonProps = {
  className?: string;
  activeClassName?: string;
  toggleIcon?: boolean;
};

export function ToggleScreenShareButton({
  className,
  activeClassName,
  toggleIcon = false,
}: ToggleScreenShareButtonProps) {
  const participant = useParticipantContext();

  if (!participant) return null;

  const { isScreenShareEnabled } = participant;

  return (
    <Tooltip
      text={isScreenShareEnabled ? 'Stop Streaming' : 'Share Your Screen'}
      direction="top"
      gap={4}
    >
      <TrackToggle
        source={Track.Source.ScreenShare}
        showIcon={false}
        className={`${className} ${isScreenShareEnabled ? activeClassName : ''}`}
      >
        {toggleIcon
          ? (isScreenShareEnabled ? <StopStreamingIcon /> : <ScreenShareIcon />)
          : <ScreenShareIcon />
        }
      </TrackToggle>
    </Tooltip>
  );
}