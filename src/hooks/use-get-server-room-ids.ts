import { useParams } from 'react-router-dom';

export const useGetServerRoomIds = () => {
  const { serverId, roomId, channelId } = useParams();

  return {
    serverId,
    roomId: serverId ? channelId : roomId,
  };
}