import { io } from 'socket.io-client';

const BASE_URL = process.env.VITE_API_URL as string;

export const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});