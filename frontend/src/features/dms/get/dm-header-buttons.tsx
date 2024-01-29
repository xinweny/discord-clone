import { useState, useEffect } from 'react';

import type { DMData } from '../types';

import { useGetUserData } from '@features/auth/hooks';
import { useLivekitContext } from '@features/webrtc/hooks';
import { useDmHeaderContext } from '../context';

import { useStateContext } from '@context';

import { getDmInfo } from '../utils';

import { Tooltip } from '@components/ui/popups';

import { ConnectToRoomButton } from '@features/webrtc/connect';

import { useGetParticipantsQuery } from '@features/webrtc/api';

import VoiceCallIcon from '@assets/icons/voice-call.svg?react';
import VideoCallIcon from '@assets/icons/video-call.svg?react';
import UserProfileIcon from '@assets/icons/user-profile.svg?react';

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
  const [showPanel, setShowPanel] = useStateContext()!;

  useEffect(() => {
    if (participants) setHasOngoingCall(participants.length > 0);
  }, [participants]);

  const { name } = getDmInfo(dm, user.data!.id);

  const isInOngoingCall = livekit?.isCurrentRoom(dm._id);

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
            <VoiceCallIcon />
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
            <VideoCallIcon />
          </ConnectToRoomButton>
        </Tooltip>
      </>
      }
      <Tooltip
        text={isInOngoingCall
          ? 'Show User Profile (Unavailable)'
          : showPanel ? 'Hide User Profile' : 'Show User Profile'
        }
        {...tooltipProps}
      >
        <button
          onClick={() => setShowPanel((prev: boolean) => !prev)}
          disabled={isInOngoingCall}
          className={showPanel ? styles.active : undefined}
        >
          <UserProfileIcon />
        </button>
      </Tooltip>
    </div>
  );
}