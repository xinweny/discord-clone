import pluralize from 'pluralize';

import type { DMData } from './types';

export const getDmInfo = (dm: DMData, userId: string) => {
  const {
    isGroup,
    imageUrl,
  } = dm;

  const participants = dm.participants.filter(participant => participant._id !== userId);

  const avatarUrl = isGroup
    ? imageUrl
    : participants[0].avatarUrl;

  const name = isGroup
    ? dm.name || participants.map(participant => participant.displayName).join(', ')
    : participants[0].displayName;

  const customStatus = isGroup
    ? `${pluralize('Member', dm.participants.length, true)}`
    : participants[0].customStatus || '';

  return {
    avatarUrl,
    participants,
    name,
    customStatus,
  };
};