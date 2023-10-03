import type { PromiseWithKnownReason } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

export type SocketEventDict = {
  [key: string]: (answer?: any) => void;
};

export type EmitEventArgs = {
  [key: string]: any;
};

export type CacheArgs = {
  cacheDataLoaded: PromiseWithKnownReason<{
    data: any;
    meta: object | undefined;
  }, Error & {
    message: 'Promise never resolved before cacheEntryRemoved.';
  }>;
  cacheEntryRemoved: Promise<void>;
};