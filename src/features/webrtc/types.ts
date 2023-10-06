import type { Participant } from 'livekit-client';

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
  avatarUrl: string | undefined;
};

export type LivekitContextData = {
  data: CallData;
  roomData: RoomData | undefined;
  connectToRoom: (roomId: string, serverId?: string) => Promise<undefined>;
  notifyDisconnection: () => void;
  isOnCall: boolean;
  isCurrentRoom: (rId: string) => boolean;
};

export enum ParticipantsEvent {
  Get = 'participants:get',
}

export type GetParticipantsEventPayload = {
  roomId: string;
  participants: Participant[];
};