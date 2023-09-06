import {
  ContactsTabs,
  RelationData, 
  RelationStatus,
} from '../types';

import { useDisplay } from '@hooks';

import { Avatar } from '@components/ui/media';

export type ContactCardProps = {
  contact: RelationData;
  activeTab: ContactsTabs
};

export function ContactCard({ contact, activeTab }: ContactCardProps) {
  const { hover, visible } = useDisplay();

  const {
    status,
    user: {
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
        `${status === RelationStatus.PENDING_FROM ? 'Incoming' : 'Outgoing'} Friend Request`
      );
      case ContactsTabs.BLOCKED: return formatProps('Blocked');
    }
  };

  const props = renderProps(activeTab);

  return (
    <div {...hover}>
      <div>
        <Avatar src={avatarUrl} />
        <div>
          <div>
            <p>{displayName}</p>
            {visible && <p>{username}</p>}
          </div>
          {props && <p>{props.message}</p>}
        </div>
        {props?.buttons && <div>
          {props.buttons}
        </div>}
      </div>
    </div>
  );
}