import { useState } from 'react';

import { useSendMessageMutation } from '@features/messages/api';
import { useGetServerInviteQuery } from '@features/server-invites/api';

type SendInviteButtonProps = {
  dmId: string;
  serverId: string;
};

export function SendInviteButton({
  dmId,
  serverId,
}: SendInviteButtonProps) {
  const [isSent, setIsSent] = useState<boolean>(false);

  const { data: serverInvite, isSuccess } = useGetServerInviteQuery(serverId);

  const [sendMessage, res] = useSendMessageMutation();

  if (!isSuccess) return null;

  const { url } = serverInvite;
  
  const handleClick = async () => {
    await sendMessage({
      roomId: dmId,
      body: url,
      attachments: [],
      emojis: [],
    }).unwrap();
    setIsSent(true);
  };

  return (
    <button
      type="button"
      disabled={isSent || res.isLoading}
      onClick={handleClick}
    >
      {isSent ? 'Sent' : 'Invite'}
    </button>
  );
}