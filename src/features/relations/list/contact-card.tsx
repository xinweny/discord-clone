import type { RelationData } from '../types';

import { useDisplay } from '@hooks';

import { Avatar } from '@components/ui/media';

type ContactCardProps = {
  contact: RelationData;
};

export function ContactCard({ contact }: ContactCardProps) {
  const { hover, visible } = useDisplay();

  const {
    avatarUrl,
    displayName,
    username,
    customStatus,
  } = contact.user;

  return (
    <div {...hover}>
      <div>
        <Avatar src={avatarUrl} />
        <div>
          <div>
            <p>{displayName}</p>
            {visible && <p>{username}</p>}
          </div>
          <p>{customStatus || ''}</p>
        </div>
      </div>
    </div>
  );
}