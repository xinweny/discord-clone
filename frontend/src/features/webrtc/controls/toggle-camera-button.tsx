import { TrackToggle, useParticipantContext } from '@livekit/components-react';
import { Track } from 'livekit-client';

import { Tooltip } from '@components/ui/popups';

import CameraIcon from '@assets/icons/camera.svg?react';
import CameraHiddenIcon from '@assets/icons/camera-hidden.svg?react';

type ToggleCameraButtonProps = {
  className?: string;
  activeClassName?: string;
};

export function ToggleCameraButton({ className, activeClassName }: ToggleCameraButtonProps) {
  const participant = useParticipantContext();

  if (!participant) return null;

  const { isCameraEnabled } = participant;

  return (
    <Tooltip
      text={`Turn ${isCameraEnabled ? 'Off' : 'On'} Camera`}
      direction="top"
      gap={4}
    >
      <TrackToggle
        source={Track.Source.Camera}
        showIcon={false}
        className={`${className} ${isCameraEnabled ? activeClassName : ''}`}
      >
        {isCameraEnabled
          ? <CameraIcon />
          : <CameraHiddenIcon />
        }
      </TrackToggle>
    </Tooltip>
  );
}