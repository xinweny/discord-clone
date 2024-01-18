import { useParticipants } from '@livekit/components-react';

type VideoModeWrapperProps = {
  children: React.ReactNode;
  condition?: boolean;
};

export function VideoModeWrapper({
  children,
  condition = true,
}: VideoModeWrapperProps) {
  const participants = useParticipants();

  const hasVideoParticipant = !!participants.find(participant => participant.isCameraEnabled || participant.isScreenShareEnabled);

  if (hasVideoParticipant && !condition) return null;

  return children;
}