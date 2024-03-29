import { Participant } from 'livekit-client';

import api from '@services/api';

import {
  type GetLivekitTokenFields,
  LivekitWebhookEvent,
  LivekitWebhookEventPayload,
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
            [LivekitWebhookEvent.ParticipantJoined]: ({
              room,
              participant,
            }: LivekitWebhookEventPayload) => {
              if (!room || !participant) return;

              if (room.name === roomId) updateCachedData(draft => {
                // @ts-ignore
                draft.push(participant);

                return draft;
              });
            },
            [LivekitWebhookEvent.ParticipantLeft]: ({
              room,
              participant,
            }: LivekitWebhookEventPayload) => {
              if (!room || !participant) return;

              if (room.name === roomId) updateCachedData(draft => {
                // @ts-ignore
                draft = draft.filter(p => p.identity !== participant.identity);

                return draft;
              });
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