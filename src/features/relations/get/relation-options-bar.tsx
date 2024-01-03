import pluralize from 'pluralize';

import { RelationStatus } from '../types';

import { Separator } from '@components/ui/displays';
import { Acronym, Avatar } from '@components/ui/media';

import { SendFriendRequestButton, ToggleBlockButton } from '../create';

import { useGetMutualServersQuery, useGetRelationsQuery } from '../api';

import styles from './relation-options-bar.module.scss';
import { RemoveRelationButton } from '../delete';

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
            {mutualServers.map(server => server.avatarUrl
              ? <Avatar src={server.avatarUrl} />
              : <Acronym name={server.name} />  
            )}
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