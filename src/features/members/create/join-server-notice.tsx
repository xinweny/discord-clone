import { useNavigate } from 'react-router-dom';

import type { ServerData } from '@features/servers/types';

import { JoinServerButton } from '.';

import ArrowIcon from '@assets/icons/arrow.svg?react';

import styles from './join-server-notice.module.scss';

type JoinServerNoticeProps = {
  server: ServerData;
};

export function JoinServerNotice({ server }: JoinServerNoticeProps) {
  const navigate = useNavigate();

  const { _id, name } = server;

  return (
    <div className={styles.notice}>
      <button onClick={() => { navigate('/servers'); }}>
        <ArrowIcon />
        <span>Back</span>
      </button>
      <div>
        <span>You are currently in preview mode. Join this server to start chatting!</span>
        <JoinServerButton
          serverId={_id}
        >
          <span>{`Join ${name}`}</span>
        </JoinServerButton>
      </div>
    </div>
  );
}