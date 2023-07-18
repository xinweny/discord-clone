export type UserDM = {
  id: string;
  name?: string;
  imageUrl: string;
  participantIds: string[];
  participants?: {
    id: string;
    displayName: string;
  }[];
};