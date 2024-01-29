import { Link } from 'react-router-dom';

import { useLivekitContext } from '../hooks';

type RoomLinkProps = {
  className?: string;
};

export function RoomLink({ className }: RoomLinkProps) {
  const livekit = useLivekitContext();

  if (!livekit || !livekit.roomData) return null;

  const { roomData: { url, name, serverName } } = livekit;

  return (
    <Link to={url} className={className}>
      {`${name}${serverName ? ` / ${serverName}` : ''}`}
    </Link>
  );
}