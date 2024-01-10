import pluralize from 'pluralize';
import { useToggle } from '@uidotdev/usehooks';

import { useGetUserData } from '@features/auth/hooks';

import { Separator } from '@components/ui/displays';

import { MutualServerCard } from './mutual-server-card';
import { MutualFriendCard } from './mutual-friend-card';

import { useGetMutualFriendsQuery, useGetMutualServersQuery } from '../api';

import ChevronIcon from '@assets/icons/chevron.svg?react';

import styles from './mutuals-list.module.scss';

type MutualsListsProps = {
  participantId: string;
};

export function MutualsLists({ participantId }: MutualsListsProps) {
  const [showServers, toggleServers] = useToggle(false);
  const [showFriends, toggleFriends] = useToggle(false);

  const { user } = useGetUserData();
  const userId = user.data!.id;

  const params = {
    userId1: userId,
    userId2: participantId,
  };

  const { data: mutualServers } = useGetMutualServersQuery(params);
  const { data: mutualFriends } = useGetMutualFriendsQuery(params);

  return (
    <div className={styles.container}>
      {mutualServers && mutualServers.length > 0 && (
        <div className={styles.section}>
          <button
            onClick={() => toggleServers(!showServers)}
            className={showServers ? styles.show : undefined}
          >
            <span>{pluralize('Mutual Server', mutualServers.length, true)}</span>
            <ChevronIcon />
          </button>
          {showServers && <ul>
            {mutualServers.map(server => <MutualServerCard
              key={server._id}
              server={server}
            />)}
          </ul>}
        </div>
      )}
      {mutualFriends && mutualFriends.length > 0 && (
        <>
          <Separator className={styles.separator} />
          <div className={styles.section}>
            <button
              onClick={() => toggleFriends(!showFriends)}
              className={showFriends ? styles.show : undefined}
            >
              <span>{pluralize('Mutual Friend', mutualFriends.length, true)}</span>
              <ChevronIcon />
            </button>
            {showFriends && <ul>
              {mutualFriends.map(friend => <MutualFriendCard
                key={friend._id}
                friend={friend}
              />)}
            </ul>}
          </div>
        </>
      )}
    </div>
  );
}