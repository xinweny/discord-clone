export type GetLivekitTokenFields = {
  userId: string;
  roomId: string;
};

export type CallData = {
  token: string | undefined;
  roomId: string | undefined;
  serverId: string | undefined;
};

export type RoomData = {
  url: string;
  name: string;
  serverName: string | undefined;
};

export type WebRTCContextData = {
  data: CallData;
  roomData: RoomData | undefined;
  connectToRoom: (roomId: string) => Promise<undefined>;
  notifyDisconnection: () => void;
  isOnCall: boolean;
};