import { useState, useEffect } from 'react';

import type { DMData } from '../types';

import { useGetUserData } from '@features/auth/hooks';
import { useLivekitContext } from '@features/webrtc/hooks';
import { useDmHeaderContext } from '../hooks';

import { getDmInfo } from '../utils';

import { Tooltip } from '@components/ui/popups';

import { ConnectToRoomButton } from '@features/webrtc/connect';

import { useGetParticipantsQuery } from '@features/webrtc/api';

import VoiceCallIcon from '@assets/icons/voice-call.svg?react';
import VideoCallIcon from '@assets/icons/video-call.svg?react';

import styles from './dm-header-buttons.module.scss';

type DmHeaderButtonsProps = {
  dm: DMData;
};

export function DmHeaderButtons({ dm }: DmHeaderButtonsProps) {
  const [hasOngoingCall, setHasOngoingCall] = useState<boolean>(false);

  const livekit = useLivekitContext();

  const { data: participants } = useGetParticipantsQuery(dm._id);

  const { user } = useGetUserData();

  const { tooltipProps } = useDmHeaderContext()!;

  useEffect(() => {
    if (participants) setHasOngoingCall(participants.length > 0);
  }, [participants]);

  const { name } = getDmInfo(dm, user.data!.id);

  return (
    <div className={styles.container}>
      {livekit?.isCurrentRoom(dm._id) ||
      <>
        <Tooltip
          text={hasOngoingCall ? 'Join Voice Call' : 'Start Voice Call'}
          {...tooltipProps}
        >
          <ConnectToRoomButton
            roomId={dm._id}
            roomName={name}
          >
            {hasOngoingCall
              ? <img src="" alt="Join Call" />
              : <VoiceCallIcon />
            }
          </ConnectToRoomButton>
        </Tooltip>
        <Tooltip
          text={hasOngoingCall ? 'Join Call with Video' : 'Start Video Call'}
          {...tooltipProps}
        >
          <ConnectToRoomButton
            roomId={dm._id}
            roomName={name}
            withVideo
          >
            {hasOngoingCall
              ? <img src="" alt="Join Call with Video" />
              : <VideoCallIcon />
            }
          </ConnectToRoomButton>
        </Tooltip>
      </>
      }
    </div>
  );
}