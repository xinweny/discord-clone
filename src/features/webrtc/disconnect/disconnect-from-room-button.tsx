import { useDisconnectButton } from '@livekit/components-react';

export function DisconnectFromRoomButton() {
  const { buttonProps } = useDisconnectButton({
    className: 'disconnect-btn',
  });

  return (
    <button {...buttonProps}></button>
  );
}