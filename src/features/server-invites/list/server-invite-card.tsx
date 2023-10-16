import pluralize from 'pluralize';

import { Avatar } from '@components/ui/media';

import { JoinServerButton } from '@features/members/create';

import { useGetServerInviteQuery } from '../api';
import { useGetServerQuery } from '@features/servers/api';

type ServerInviteCardProps = {
  urlId: string;
  senderName?: string;
};

export function ServerInviteCard({ urlId, senderName }: ServerInviteCardProps) {
  const { data: serverInvite, isSuccess } = useGetServerInviteQuery({ urlId });

  const { data: server } = useGetServerQuery(serverInvite?.serverId || '', { skip: !isSuccess });

  return (
    <div>
      <p>
        <strong>{`YOU ${senderName ? 'RECEIVED' : 'SENT'} AN INVITE ${isSuccess ? 'TO JOIN A SERVER' : ', BUT...'}`}</strong>
      </p>
      <div>
        <Avatar src={isSuccess ? (server?.avatarUrl || '#') : ''} />
        <div>
          <h4>{isSuccess ? (server?.name || '') : 'Invalid Invite'}</h4>
          <p>{isSuccess
            ? pluralize('Member', server?.memberCount || 0, true)
            : (senderName
              ? `Ask ${senderName} for a new invite!`
              : 'Try sending a new invite!')
          }</p>
        </div>
        {server && (
          <JoinServerButton serverId={server._id}>Join</JoinServerButton>
        )}
      </div>
    </div>
  );
}