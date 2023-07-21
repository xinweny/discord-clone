import { useOutletContext, useParams, Navigate } from 'react-router-dom';

type ContextType = { activeChannelId: string | null };

export function ChannelRedirector() {
  const { serverId } = useParams();
  const { activeChannelId } = useOutletContext<ContextType>();

  if (!activeChannelId) return null;

  return <Navigate to={`/channels/${serverId}/${activeChannelId}`} />;
}