import { useParams } from 'react-router-dom';

export const useGetServerRoomIds = () => {
  const { serverId, roomId } = useParams();

  return {
    serverId,
    roomId,
  };
}