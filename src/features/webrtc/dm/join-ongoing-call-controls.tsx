import { ConnectToRoomButton } from '../connect';

import VoiceCallIcon from '@assets/icons/voice-call.svg?react';
import VideoCallIcon from '@assets/icons/video-call.svg?react';

import styles from './join-ongoing-call-controls.module.scss';

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
      <ConnectToRoomButton
          roomId={roomId}
          roomName={roomName}
          withVideo
        >
          <VideoCallIcon />
        </ConnectToRoomButton>
        <ConnectToRoomButton
          roomId={roomId}
          roomName={roomName}
        >
          <VoiceCallIcon />
        </ConnectToRoomButton>
    </div>
  );
}