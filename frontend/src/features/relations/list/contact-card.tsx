import { useHover } from '@uidotdev/usehooks';

import {
  ContactsTabs,
  RelationData, 
  RelationStatus,
} from '../types';

import { Avatar } from '@components/ui/media';
import { Tooltip } from '@components/ui/popups';

import { UserStatusIcon } from '@features/statuses/get';
import { DmMessageButton } from '@features/dms/create';

import { AcceptFriendRequestButton } from '../edit';
import { RemoveRelationButton } from '../delete';

import styles from './contact-card.module.scss';

import ChatBubbleIcon from '@assets/icons/chat-bubble.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';
import CheckmarkIcon from '@assets/icons/checkmark.svg?react';

export type ContactCardProps = {
  contact: RelationData;
  activeTab: ContactsTabs;
  isOnline?: boolean;
};

export function ContactCard({
  contact,
  activeTab,
  isOnline,
}: ContactCardProps) {
  const [hoverRef, isHovered] = useHover();

  const {
    _id: relationId,
    status,
    user: {
      _id: userId,
      avatarUrl,
      displayName,
      username,
      customStatus,
    }
  } = contact;

  const renderProps = (tab: ContactsTabs) => {
    const formatProps = (
      message = '',
      buttons = <></>
    ) => ({ message, buttons });

    const messageBtn = (
      <Tooltip text="Message" direction="top" gap={4}>
        <DmMessageButton userId={userId}>
          <ChatBubbleIcon />
        </DmMessageButton>
      </Tooltip>
    );

    const friendStatus = customStatus || (isOnline ? 'Online' : 'Offline');

    switch (tab) {
      case ContactsTabs.ONLINE: return formatProps(
        friendStatus,
        messageBtn
      );
      case ContactsTabs.ALL: return formatProps(
        friendStatus,
        messageBtn
      );
      case ContactsTabs.PENDING: return formatProps(
        `${status === RelationStatus.PENDING_FROM ? 'Incoming' : 'Outgoing'} Friend Request`,
        status === RelationStatus.PENDING_FROM
          ? <Tooltip text="Accept" direction="top" gap={4}>
            <AcceptFriendRequestButton relationId={relationId}>
              <CheckmarkIcon />
            </AcceptFriendRequestButton>
          </Tooltip>
          : undefined
      );
      case ContactsTabs.BLOCKED: return formatProps('Blocked');
    }
  };

  const label = (param: string) => {
    switch (param) {
      case RelationStatus.FRIENDS: return 'Remove Friend';
      case RelationStatus.PENDING_FROM: return 'Reject';
      case RelationStatus.PENDING_TO: return 'Cancel';
      case RelationStatus.BLOCKED: return 'Unblock';
      default: return '';
    }
  };

  const props = renderProps(activeTab);

  const isHidden = activeTab !== ContactsTabs.ONLINE ? false : !isOnline;

  return (
    <div
      ref={hoverRef}
      hidden={isHidden}
      className={styles.item}
      style={isHidden ? { display: 'none' } : undefined}
    >
      <div className={styles.userInfo}>
        <Avatar
          src={avatarUrl}
          notification={
            (activeTab === ContactsTabs.ONLINE) ||
            (activeTab === ContactsTabs.ALL)
              ? <UserStatusIcon userId={userId} />
              : undefined
          }
        />
        <div>
          <div className={styles.userNames}>
            <p>{displayName}</p>
            {isHovered && <p className={styles.username}>{username}</p>}
          </div>
          {props && <p>{props.message}</p>}
        </div>
      </div>
      {props?.buttons && <div className={styles.buttons}>
        {props.buttons}
        <Tooltip text={label(status)} direction="top" gap={4}>
          <RemoveRelationButton relation={contact}>
            <CrossIcon />
          </RemoveRelationButton>
        </Tooltip>
      </div>}
    </div>
  );
}