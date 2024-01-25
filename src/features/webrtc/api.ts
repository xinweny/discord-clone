import api from '@services/api';

import { Participant } from 'livekit-client';
import {
  type GetLivekitTokenFields,
  ParticipantsEvent,
  type GetParticipantsEventPayload,
} from './types';

import { setupSocketEventListeners } from '@services/websocket';

const webRtcApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getLivekitToken: build.query<string, GetLivekitTokenFields>({
        query: ({ roomId, serverId }) => ({
          url: `/rtc/${roomId}/token`,
          params: { serverId },
          method: 'get',
        }),
        providesTags: ['WebRTC'],
      }),
      getParticipants: build.query<Participant[], string>({
        query: (roomId) => ({
          url: `/rtc/${roomId}/participants`,
          method: 'get'
        }),
        providesTags: (...[, , roomId]) => [{ type: 'Participants', id: roomId }],
        onCacheEntryAdded: async (
          roomId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [ParticipantsEvent.Get]: ({ roomId: rId, participants }: GetParticipantsEventPayload) => {
              if (rId === roomId) updateCachedData(() => participants);
            },
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
      }),
    };
  }
});

export default webRtcApi;

export const {
  useLazyGetLivekitTokenQuery,
  useGetParticipantsQuery,
} = webRtcApi;