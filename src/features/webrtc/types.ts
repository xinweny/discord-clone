export type GetLivekitTokenFields = {
  userId: string;
  roomId: string;
};

export type WebRTCContextData = {
  lkToken: string | undefined;
  connectToRoom: (roomId: string) => Promise<undefined>;
  notifyDisconnection: () => void;
  isOnCall: boolean;
};