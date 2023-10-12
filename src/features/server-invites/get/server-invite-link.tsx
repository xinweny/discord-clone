import { useState } from 'react';

import { useGetServerInviteQuery } from '../api';

type ServerInviteLinkProps = {
  serverId: string;
};

export function ServerInviteLink({ serverId }: ServerInviteLinkProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { data: serverInvite, isSuccess } = useGetServerInviteQuery(serverId);

  if (!isSuccess) return null;

  const { url } = serverInvite;
  
  return (
    <div>
      <p>{url}</p>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url);
          setIsCopied(true);
          setTimeout(() => { setIsCopied(false); }, 3000);
        }}
        disabled={isCopied}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}