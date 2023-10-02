import {
  ContactsTabs,
  RelationData, 
  RelationStatus,
} from '../types';

import { useDisplay } from '@components/hooks';

import { Avatar } from '@components/ui/media';

import { UserStatusIconWithWatch } from '@features/users/status';

import { AcceptFriendRequestButton } from '../edit';
import { RemoveRelationButton } from '../delete';


export type ContactCardProps = {
  contact: RelationData;
  activeTab: ContactsTabs;
  updateStatus: (userId: string, isOnline: boolean) => void;
};

export function ContactCard({ contact, activeTab, updateStatus }: ContactCardProps) {
  const { hover, visible } = useDisplay();

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

    switch (tab) {
      case ContactsTabs.ONLINE: return formatProps(customStatus || '');
      case ContactsTabs.ALL: return formatProps(customStatus || '');
      case ContactsTabs.PENDING: return formatProps(
        `${status === RelationStatus.PENDING_FROM ? 'Incoming' : 'Outgoing'} Friend Request`,
        <>
          {status === RelationStatus.PENDING_FROM && <AcceptFriendRequestButton relationId={relationId} />}
        </>
      );
      case ContactsTabs.BLOCKED: return formatProps('Blocked');
    }
  };

  const props = renderProps(activeTab);

  return (
    <div {...hover}>
      <div>
        <Avatar
          src={avatarUrl}
          notification={
            (activeTab === ContactsTabs.ONLINE) ||
            (activeTab === ContactsTabs.ALL)
              ? <UserStatusIconWithWatch userId={userId} updateStatus={updateStatus} />
              : undefined
          }
        />
        <div>
          <div>
            <p>{displayName}</p>
            {visible && <p>{username}</p>}
          </div>
          {props && <p>{props.message}</p>}
        </div>
        {props?.buttons && <div>
          {props.buttons}
          <RemoveRelationButton relation={contact} />
        </div>}
      </div>
    </div>
  );
}