import { RelationStatus } from '../types';

import { SendFriendRequestButton } from '../create';
import { DmMessageButton } from '@features/dms/create';

import { useGetRelationsQuery } from '../api';


type UserProfileOptionsProps = {
  senderId: string;
  recipientId: string;
};

export function UserProfileOptions({ senderId, recipientId }: UserProfileOptionsProps) {
  const { data: relations } = useGetRelationsQuery(senderId);

  const relation = relations?.find(relation => relation.userId === recipientId);

  return (
    <div>
      {!relation
        ? (
          <SendFriendRequestButton
            senderId={senderId}
            recipientId={recipientId}
          >
            Send Friend Request
          </SendFriendRequestButton>
        )
        : relation.status === RelationStatus.FRIENDS && (
          <DmMessageButton userId={recipientId}>Message</DmMessageButton>
        )
      }

    </div>
  );
}