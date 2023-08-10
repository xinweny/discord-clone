import { useOutletContext, useParams, Navigate } from 'react-router-dom';

import { ChannelData } from '../api';

type ContextType = {
  activeChannel: ChannelData | null
};

export function ChannelRedirector() {
  const { serverId } = useParams();
  const { activeChannel } = useOutletContext<ContextType>();

  if (!activeChannel) return null;

  return <Navigate to={`/channels/${serverId}/${activeChannel._id}`} />;
}