import { DisconnectButton } from '@livekit/components-react';

import { Tooltip } from '@components/ui/popups';

import PhoneIcon from '@assets/icons/phone.svg?react';
import disconnectAudio from '@assets/audio/disconnect.mp3';

type DisconnectFromRoomButtonProps = {
  className?: string;
};

export function DisconnectFromRoomButton({
  className,
}: DisconnectFromRoomButtonProps) {
  return (
    <Tooltip text="Disconnect" direction="top" gap={4}>
      <DisconnectButton
        className={className}
        onClick={() => {
          new Audio(disconnectAudio).play();
        }}
      >
        <PhoneIcon />
      </DisconnectButton>
    </Tooltip>
  );
}