import type { Participant, Room, Track } from 'livekit-client';

export type GetLivekitTokenFields = {
  roomId: string;
  serverId?: string;
};

export type CallData = {
  token: string | undefined;
  roomId: string | undefined;
  serverId: string | undefined;
  initVideo: boolean;
};

export type RoomData = {
  url: string;
  name: string;
  serverName: string | undefined;
  avatarUrl: string | undefined;
};

export type ConnectToRoomOptions = {
  withVideo: boolean;
};

export type LivekitContextData = {
  data: CallData;
  roomData: RoomData | undefined;
  connectToRoom: (roomId: string, serverId?: string, options?: ConnectToRoomOptions) => Promise<undefined>;
  notifyDisconnection: () => void;
  isOnCall: boolean;
  isCurrentRoom: (rId: string) => boolean;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

export enum ParticipantsEvent {
  Get = 'participants:get',
}

export type GetParticipantsEventPayload = {
  roomId: string;
  participants: Participant[];
};