import { UserBasicData } from '@features/users/types';

export type DMData = {
  _id: string;
  name?: string;
  imageUrl?: string;
  participantIds: string[];
  isGroup: boolean;
  participants: UserBasicData[];
};

export type GetDMQuery = {
  dmId: string;
  dm?: DMData | null;
}

export type CreateDMFields = {
  participantIds: { id: string }[];
};

export type EditDMFields = {
  dmId: string;
  name?: string;
  avatar?: File;
};