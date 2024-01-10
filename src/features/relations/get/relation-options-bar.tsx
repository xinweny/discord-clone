import pluralize from 'pluralize';

import { RelationStatus } from '../types';

import { Separator } from '@components/ui/displays';

import { ServerAvatar } from '@features/servers/get';

import { SendFriendRequestButton, ToggleBlockButton } from '../create';
import { RemoveRelationButton } from '../delete';

import { useGetRelationsQuery } from '../api';
import { useGetMutualServersQuery } from '@features/mutuals/api';

import styles from './relation-options-bar.module.scss';

type RelationOptionsBarProps = {
  senderId: string;
  recipientId: string;
};

export function RelationOptionsBar({
  senderId,
  recipientId,
}: RelationOptionsBarProps) {
  const { data: mutualServers } = useGetMutualServersQuery({
    userId1: senderId,
    userId2: recipientId,
  });
  const { data: relations } = useGetRelationsQuery(senderId);

  const relation = relations?.find(relation => relation.userId === recipientId);

  return (
    <div className={styles.container}>
      {(mutualServers && mutualServers.length > 0) && <>
        <div>
          <div className={styles.mutualServersList}>
            {mutualServers.map(server => <ServerAvatar server={server} />)}
          </div>
          <span>{pluralize('Mutual Server', mutualServers.length, true)}</span>
        </div>
        <Separator className={''} />
      </>}
      <div className={styles.buttonsList}>
        {(!relation || relation.status === RelationStatus.PENDING_TO) && (
          <SendFriendRequestButton senderId={senderId} recipientId={recipientId}>
            Send Friend Request
          </SendFriendRequestButton>
        )}
        {(relation && relation.status === RelationStatus.FRIENDS) && (
          <RemoveRelationButton relation={relation}>
            Remove Friend
          </RemoveRelationButton>
        )}
        <ToggleBlockButton senderId={senderId} recipientId={recipientId} />
      </div>
    </div>
  );
}