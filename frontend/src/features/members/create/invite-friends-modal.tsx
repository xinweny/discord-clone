import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import type { ModalProps } from '@types';

import { useServerContext } from '@features/servers/context';

import { useQuery } from '@hooks';

import { ModalWrapper } from '@components/ui/modals';
import { SearchInput } from '@components/ui/forms';

import { ServerInviteLink } from '@features/server-invites/get';

import HashIcon from '@assets/icons/hash.svg?react';

import styles from './invite-friends-modal.module.scss';
import { SendInviteCardsContainer } from './send-invite-cards-container';

type InviteFriendsModalProps = ModalProps;

export function InviteFriendsModal({
  isOpen,
  onClose,
}: InviteFriendsModalProps) {
  const server = useServerContext();
  const serverId = server!._id;

  const { roomId } = useParams();

  const { query, setQuery } = useQuery();

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  if (!server) return null;

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      closeBtnRef={closeBtnRef}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Invite friends to <span>{`${server.name}`}</span></h2>
          <div className={styles.subHeader}>
            <HashIcon />
            <h3>{server.channels.find(channel => channel._id === roomId)?.name}</h3>
          </div>
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholder="Search for friends"
            showButton
          />
        </div>
        <SendInviteCardsContainer query={query} serverId={serverId} />
        <div className={styles.footer}>
          <h2>OR, SEND A SERVER INVITE LINK TO A FRIEND</h2>
          <ServerInviteLink serverId={serverId} />
        </div>
      </div>
    </ModalWrapper>
  );
}