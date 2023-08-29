export const messageBaseUrl = (options: {
  serverId?: string;
  roomId: string;
  messageId?: string;
}) => {
  const { serverId, roomId, messageId }  = options;

  return `${serverId
    ? `/servers/${serverId}/channels`
    : '/dms'
  }/${roomId}/messages${messageId
      ? `/${messageId}`
      : ''
  }`;
};