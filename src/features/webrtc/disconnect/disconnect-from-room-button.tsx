import { DisconnectButton } from '@livekit/components-react';

type DisconnectFromRoomButtonProps = {
  children: React.ReactNode;
}

export function DisconnectFromRoomButton({
  children
}: DisconnectFromRoomButtonProps) {
  return (
    <DisconnectButton>{children}</DisconnectButton>
  );
}