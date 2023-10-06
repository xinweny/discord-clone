import { Link } from 'react-router-dom';

import { useLivekitContext } from '../hooks';

export function RoomLink() {
  const livekit = useLivekitContext();

  if (!livekit || !livekit.roomData) return null;

  const { roomData: { url, name, serverName } } = livekit;

  return (
    <Link to={url}>
      {`${name}${serverName ? ` / ${serverName}` : ''}`}
    </Link>
  );
}