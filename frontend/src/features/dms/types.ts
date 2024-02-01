import { UserBasicData } from '@features/users/types';
import { TooltipProps } from '@components/ui/popups';

export type DMData = {
  _id: string;
  name?: string;
  imageUrl?: string;
  participantIds: string[];
  isGroup: boolean;
  participants: UserBasicData[];
  updatedAt: string;
};

export type UserDMData = {
  dm: DMData;
  updatedAt: string;
};

export type CreateDMFields = {
  participantIds: string[];
};

export type EditDMFields = {
  dmId: string;
  name?: string;
  avatar?: File;
};

export type GetDMQuery = {
  dmId: string;
  userId: string;
};

export enum DMEvent {
  New = 'dm:new',
}

export type DMHeaderContextData = {
  tooltipProps: Omit<TooltipProps, 'text' | 'children'>,
};