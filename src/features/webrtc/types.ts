export type GetLivekitTokenFields = {
  userId: string;
  roomId: string;
};

export type CallData = {
  token: string | undefined;
  roomId: string | undefined;
  serverId: string | undefined;
};

export type WebRTCContextData = {
  data: CallData;
  connectToRoom: (roomId: string) => Promise<undefined>;
  notifyDisconnection: () => void;
  isOnCall: boolean;
};