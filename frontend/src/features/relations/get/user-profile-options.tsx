import { RelationStatus, type RelationData } from '../types';

import { DmMessageButton } from '@features/dms/create';

import { SendFriendRequestButton } from '../create';
import { AcceptFriendRequestButton } from '../edit';

import { UserProfileContextMenuWrapper } from './user-profile-context-menu-wrapper';

import { useGetRelationsQuery } from '../api';

import EllipsisIcon from '@assets/icons/ellipsis.svg?react';

import styles from './user-profile-options.module.scss';


type UserProfileOptionsProps = {
  senderId: string;
  recipientId: string;
  closeModal?: () => void;
};

export function UserProfileOptions({
  senderId,
  recipientId,
  closeModal,
}: UserProfileOptionsProps) {
  const { data: relations } = useGetRelationsQuery(senderId);

  const relation = relations?.find(relation => relation.userId === recipientId);

  const renderButton = (relation?: RelationData) => {
    const buttonStyles = styles.mainButton;

    if (!relation) return (
      <SendFriendRequestButton
        senderId={senderId}
        recipientId={recipientId}
        className={buttonStyles}
      >
        Send Friend Request
      </SendFriendRequestButton>
    );

    const { status } = relation;

    switch (status) {
      case RelationStatus.FRIENDS: return (
        <DmMessageButton
          userId={recipientId}
          className={buttonStyles}
          onClick={closeModal}
        >
          Send Message
        </DmMessageButton>
      );
      case RelationStatus.PENDING_TO: return (
        <SendFriendRequestButton
          senderId={senderId}
          recipientId={recipientId}
          className={buttonStyles}
        >
          Send Friend Request
        </SendFriendRequestButton>
      )
      case RelationStatus.PENDING_FROM: return (
        <AcceptFriendRequestButton
          relationId={relation._id}
          className={buttonStyles}
        >
          Accept Friend Request
        </AcceptFriendRequestButton>
      )
      default: return null;
    }
  }

  return (
    <div className={styles.container}>
      {renderButton(relation)}
      <UserProfileContextMenuWrapper
        relation={relation}
        senderId={senderId}
        recipientId={recipientId}
      >
        <EllipsisIcon />
      </UserProfileContextMenuWrapper>
    </div>
  );
}