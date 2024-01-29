import { useState } from 'react';

import { useGetServerInviteQuery } from '../api';

import styles from './server-invite-link.module.scss';

type ServerInviteLinkProps = {
  serverId: string;
};

export function ServerInviteLink({ serverId }: ServerInviteLinkProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { data: serverInvite, isSuccess } = useGetServerInviteQuery({ serverId });

  if (!isSuccess) return null;

  const { url } = serverInvite;
  
  return (
    <div className={styles.container}>
      <span>{url}</span>
      <button
        type="button"
        className={isCopied ? styles.isCopied : undefined}
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