import { useContext } from 'react';

import { WebRTCContext } from '../context';

import { Link } from 'react-router-dom';

export function RoomLink() {
  const livekit = useContext(WebRTCContext);

  if (!livekit || !livekit.roomData) return null;

  const { roomData: { url, name, serverName } } = livekit;

  return (
    <Link to={url}>
      {`${name}${serverName ? ` / ${serverName}` : ''}`}
    </Link>
  );
}