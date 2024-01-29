import { ConnectToRoomButton } from '../connect';

import VoiceCallIcon from '@assets/icons/voice-call.svg?react';
import VideoCallIcon from '@assets/icons/video-call.svg?react';

import styles from './join-ongoing-call-controls.module.scss';
import { Tooltip } from '@components/ui/popups';

type JoinOngoingCallControlsProps = {
  roomId: string;
  roomName: string;
};

export function JoinOngoingCallControls({
  roomId,
  roomName,
}: JoinOngoingCallControlsProps) {
  return (
    <div className={styles.controls}>
      <Tooltip text="Join Voice Call" direction="top" gap={4}>
        <ConnectToRoomButton
          roomId={roomId}
          roomName={roomName}
          withVideo
        >
          <VideoCallIcon />
        </ConnectToRoomButton>
      </Tooltip>
      <Tooltip text="Join Call With Video" direction="top" gap={4}>
        <ConnectToRoomButton
          roomId={roomId}
          roomName={roomName}
        >
          <VoiceCallIcon />
        </ConnectToRoomButton>
      </Tooltip>
    </div>
  );
}