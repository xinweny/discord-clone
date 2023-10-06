import { useLivekitContext } from '@features/webrtc/hooks';

import { LinkImage } from '@components/ui/links';

import { CreateServerButton } from '@features/servers/create';
import { JoinedServersList } from '.';

type JoinedServerNavbarProps = {
  userId: string;
}

export function JoinedServersNavbar({ userId }: JoinedServerNavbarProps) {
  const livekit = useLivekitContext();

  const { isOnCall, roomData } = { ...livekit };
  const { url, avatarUrl, name } = { ...roomData };

  return (
    <div>
      <LinkImage href="/channels/@me" src="#" alt="Direct Messages" />
      {(isOnCall && roomData) && <LinkImage
        href={url!}
        src={avatarUrl || ''}
        alt={`Ongoing call with ${name}`}
      />}
      <JoinedServersList userId={userId} />
      <CreateServerButton />
      <LinkImage href="/servers" src="#" alt="Explore Discoverable Servers" />
    </div>
  );
}3