import pluralize from 'pluralize';
import { Link } from 'react-router-dom';

import { JoinServerButton } from '@features/members/create';
import { ServerAvatar } from '@features/servers/get';

import { useGetServerInviteQuery } from '../api';
import { useGetServerQuery } from '@features/servers/api';

import poop from '@assets/static/poop.svg';

import styles from './server-invite-card.module.scss';

type ServerInviteCardProps = {
  urlId: string;
  senderName?: string;
};

export function ServerInviteCard({ urlId, senderName }: ServerInviteCardProps) {
  const { data: serverInvite, isSuccess } = useGetServerInviteQuery({ urlId });

  const { data: server } = useGetServerQuery(serverInvite?.serverId || '', { skip: !isSuccess });

  return (
    <div className={styles.card}>
      <h3>{`YOU ${senderName ? 'RECEIVED' : 'SENT'} AN INVITE ${isSuccess ? 'TO JOIN A SERVER' : ', BUT...'}`}</h3>
      <div>
        <div className={styles.avatar}>
          {isSuccess && server
            ? <ServerAvatar server={server} />
            : <img src={poop} />
          }
        </div>
        <div className={styles.info}>
          {isSuccess && server
            ? (
              <Link to={`/channels/${server._id}`}>
                <h4>{server.name}</h4>
              </Link>
            )
            : <h4 className={styles.invalid}>Invalid Invite</h4>
          }
          <span>{isSuccess
            ? pluralize('Member', server?.memberCount || 0, true)
            : (senderName
              ? `Ask ${senderName} for a new invite!`
              : 'Try sending a new invite!')
          }</span>
        </div>
        {isSuccess && server && (
          <JoinServerButton serverId={server._id}>Join</JoinServerButton>
        )}
      </div>
    </div>
  );
}