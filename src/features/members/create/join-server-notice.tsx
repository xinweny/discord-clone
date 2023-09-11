import { useNavigate } from 'react-router-dom';

import type { ServerData } from '@features/servers/types';

import { JoinServerButton } from '.';


type JoinServerNoticeProps = {
  server: ServerData;
};

export function JoinServerNotice({ server }: JoinServerNoticeProps) {
  const navigate = useNavigate();

  const { _id, name } = server;

  return (
    <div>
      <button onClick={() => { navigate('/servers'); }}>Back</button>
      <div>
        <p>You are currently in preview mode. Join this server to start chatting!</p>
        <JoinServerButton serverId={_id}>{`Join ${name}`}</JoinServerButton>
      </div>
    </div>
  );
}